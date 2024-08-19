import { beforeEach, describe, expect, test, vi } from "vitest";
import { Req } from "./Req";
import { mockResponse } from "./Req.mock";

const data = {'message' : 'success'}
global.fetch = vi.fn()

describe('Req.post', () => {

    beforeEach(() => {
        // @ts-expect-error
        global.fetch.mockReset()
    })

    test('should make post request (obj prop)', async () => {

        // @ts-expect-error
        fetch.mockResolvedValue( mockResponse({ data }) )

        const post = await Req.post({url : 'https://www.fake.com'})
        expect(post.code).toBe(200)
        expect(post.error).toBe(null)
        expect(post.data.message).toBe('success')
    })

    test('should throw error (invalid prop)', async () => {

        // @ts-expect-error
        fetch.mockResolvedValue( mockResponse({ data, status : 404, ok : false }) )

        // @ts-expect-error
        await expect( Req.post({url : null})
                .then( (response) => response ) )
                .rejects.toThrowError()
    })

    test('should return 404 response', async () => {

        // @ts-expect-error
        fetch.mockResolvedValue( mockResponse({ data, status : 404, ok : false }) )

        const post = await Req.post({url : 'https://www.fake.com'})
        expect(post.code).toBe(404)
        expect(post.error).toContain('MockError')
        expect(post.data).toBe(undefined)
    })
})