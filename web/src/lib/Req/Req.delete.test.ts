import { beforeEach, describe, expect, test, vi } from "vitest";
import { Req } from "./Req";
import { mockResponse } from "./Req.mock";

const data = {'message' : 'success'}
global.fetch = vi.fn()

describe('Req.delete', () => {

    beforeEach(() => {
        // @ts-expect-error
        global.fetch.mockReset()
    })

    test('should make delete request (obj prop)', async () => {

        // @ts-expect-error
        fetch.mockResolvedValue( mockResponse({ data }) )

        const del = await Req.delete({url : 'https://www.fake.com'})
        expect(del.code).toBe(200)
        expect(del.error).toBe(null)
        expect(del.data.message).toBe('success')
    })

    test('should throw error (invalid prop)', async () => {

        // @ts-expect-error
        fetch.mockResolvedValue( mockResponse({ data, status : 404, ok : false }) )

        // @ts-expect-error
        await expect( Req.delete({url : null})
                .then( (response) => response ) )
                .rejects.toThrowError()
    })

    test('should return 404 response', async () => {

        // @ts-expect-error
        fetch.mockResolvedValue( mockResponse({ data, status : 404, ok : false }) )

        const del = await Req.delete({url : 'https://www.fake.com'})
        expect(del.code).toBe(404)
        expect(del.error).toContain('MockError')
        expect(del.data).toBe(undefined)
    })
})