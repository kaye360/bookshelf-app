// @vitest-environment jsdom

import { afterEach, beforeAll, beforeEach, describe, expect, it, test, vi } from "vitest";
import useBookshelfFilter from "./useBookshelfFilter";
import { renderHook } from "@testing-library/react";

let param : string|null;

vi.mock('react-router-dom', async () => ({
    ...vi.importActual('react-router-dom'),
    useLocation : () => '/bookshelf',
    useSearchParams : () => [{get : () => param}]
}))

vi.mock('zustand', async (importOriginal) => {
    const actual = await importOriginal() as object
    return { ...actual }
})

describe('useBookshelfFilter', () => {

    test('should be unread (unread input)', () => {
        param = 'unread'
        const {result} =  renderHook( () => useBookshelfFilter() )
        expect( result.current ).toBe('unread')
    })

    test('should be all (null input)', () => {
        param = null
        const {result} = renderHook( () => useBookshelfFilter() )
        expect(result.current ).toBe('all')
    })

    test('should be all (invalid input)', () => {
        param = 'invalidParam'
        const {result} = renderHook( () => useBookshelfFilter() )
        expect(result.current ).toBe('all')
    })
})