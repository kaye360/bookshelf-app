import { beforeEach, describe, expect, test, vi } from "vitest";
import { Req } from "./Req";
import { mockResponse } from "./Req.mock";

const data = {'message' : 'success'}
global.fetch = vi.fn()

describe('Req.get', () => {

    beforeEach(() => {
        // @ts-expect-error
        global.fetch.mockReset()
    })

    test('should make get request (string prop)', async () => {

        // @ts-expect-error
        fetch.mockResolvedValue( mockResponse({ data }) )

        const get = await Req.get('https://www.fake.com')
        expect(get.code).toBe(200)
        expect(get.error).toBe(null)
        expect(get.data.message).toBe('success')
    })

    test('should make get request (obj prop)', async () => {

        // @ts-expect-error
        fetch.mockResolvedValue( mockResponse({ data }) )

        const get = await Req.get({url : 'https://www.fake.com'})
        expect(get.code).toBe(200)
        expect(get.error).toBe(null)
        expect(get.data.message).toBe('success')
    })

    test('should throw error (invalid prop)', async () => {

        // @ts-expect-error
        await expect( Req.get({url : null})
                .then( (response) => response ) )
                .rejects.toThrowError()
    })

    test('should return 404 response', async () => {

        // @ts-expect-error
        fetch.mockResolvedValue( mockResponse({ data, status : 404, ok : false }) )

        const get = await Req.get({url : 'https://www.fake.com'})
        expect(get.code).toBe(404)
        expect(get.error).toContain('MockError')
        expect(get.data).toBe(undefined)
    })
})
