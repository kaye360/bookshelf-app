// @vitest-environment jsdom

import { renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import useBookshelfSort from "./useBookshelfSort";
import { UserSettings } from "../../../types/types";

let searchParam   : UserSettings['sort'] | null
let {useStoreMock} = await vi.hoisted( async () => await import('../../../store/useStoreMock') )

vi.mock('../../../store/store', () =>  useStoreMock )

vi.mock('react-router-dom', async () => ({
    ...vi.importActual('react-router-dom'),
    useLocation : () => '/',
    useSearchParams : () => [{get : () => searchParam}]
}))

describe('useBookshelfSort', () => {

    test('should be authors (valid searchParam)', () => {
        searchParam = 'authors'
        // @ts-expect-error
        useStoreMock.useStore().settings.sort = null
        const {result} = renderHook( () => useBookshelfSort() )
        expect( result.current ).toBe('authors')
    })

    test('should be newest (invalid searchParam, valid settingsParam)', () => {
        searchParam = null
        useStoreMock.useStore().settings.sort = 'newest'
        const {result} = renderHook( () => useBookshelfSort() )
        expect( result.current ).toBe('newest')
    })

    test('should be authors (valid searchParam, valid setttingsParam)', () => {
        searchParam = 'authors'
        useStoreMock.useStore().settings.sort = 'oldest'
        const {result} = renderHook( () => useBookshelfSort() )
        expect( result.current ).toBe('authors')
    })

    test('should default to title (invalid searchParam, invalid settingsParam)', () => {
        searchParam = null
        // @ts-expect-error
        useStoreMock.useStore().settings.sort = null
        const {result} = renderHook( () => useBookshelfSort() )
        expect( result.current ).toBe('title')
    })

})