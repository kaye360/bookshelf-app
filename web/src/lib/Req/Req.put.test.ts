import { beforeEach, describe, expect, test, vi } from "vitest";
import { Req } from "./Req";
import { mockResponse } from "./Req.mock";

const data = {'message' : 'success'}
global.fetch = vi.fn()

describe('Req.put', () => {

    beforeEach(() => {
        // @ts-expect-error
        global.fetch.mockReset()
    })

    test('should make put request (obj prop)', async () => {

        // @ts-expect-error
        fetch.mockResolvedValue( mockResponse({ data }) )

        const put = await Req.put({url : 'https://www.fake.com'})
        expect(put.code).toBe(200)
        expect(put.error).toBe(null)
        expect(put.data.message).toBe('success')
    })

    test('should throw error (invalid prop)', async () => {

        // @ts-expect-error
        fetch.mockResolvedValue( mockResponse({ data, status : 404, ok : false }) )

        // @ts-expect-error
        await expect( Req.put({url : null})
                .then( (response) => response ) )
                .rejects.toThrowError()
    })

    test('should return 404 response', async () => {

        // @ts-expect-error
        fetch.mockResolvedValue( mockResponse({ data, status : 404, ok : false }) )

        const put = await Req.put({url : 'https://www.fake.com'})
        expect(put.code).toBe(404)
        expect(put.error).toContain('MockError')
        expect(put.data).toBe(undefined)
    })
})