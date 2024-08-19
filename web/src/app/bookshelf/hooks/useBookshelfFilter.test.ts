// @vitest-environment jsdom

import { describe, expect, test, vi } from "vitest";
import useBookshelfFilter from "./useBookshelfFilter";
import { renderHook } from "@testing-library/react";
import { UserSettings } from "../../../types/types";

let searchParam   : UserSettings['filter'] | null
let {useStoreMock} = await vi.hoisted( async () => await import('../../../store/useStoreMock') )

vi.mock('../../../store/store', () =>  useStoreMock )

vi.mock('react-router-dom', async () => ({
    ...vi.importActual('react-router-dom'),
    useLocation : () => '/bookshelf',
    useSearchParams : () => [{get : () => searchParam}]
}))


describe('useBookshelfFilter', () => {

    test('should be unread (valid searchParam)', () => {
        searchParam = 'unread'
        // @ts-expect-error
        useStoreMock.useStore().settings.filter = null
        const {result} =  renderHook( () => useBookshelfFilter() )
        expect( result.current ).toBe('unread')
    })

    test('should be all (invalid searchParam, valid settingsParam)', () => {
        searchParam = null
        useStoreMock.useStore().settings.filter = 'owned'
        const {result} = renderHook( () => useBookshelfFilter() )
        expect(result.current ).toBe('owned')
    })

    test('should be unread (valid searchParam, valid settingsParam)', () => {
        searchParam = 'unread'
        useStoreMock.useStore().settings.filter = 'read'
        const {result} =  renderHook( () => useBookshelfFilter() )
        expect( result.current ).toBe('unread')
    })

    test('should default to  all (invalid searchParam, invalid settingsParam)', () => {
        searchParam = null
        // @ts-expect-error
        useStoreMock.useStore().settings.filter = null
        const {result} = renderHook( () => useBookshelfFilter() )
        expect(result.current ).toBe('all')
    })

})