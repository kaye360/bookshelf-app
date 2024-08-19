// @vitest-environment jsdom

import { describe, expect, test, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { UserSettings } from "../../../types/types";
import useBookshelfView from "./useBookshelfView";

let searchParam   : UserSettings['view'] | null
let {useStoreMock} = await vi.hoisted( async () => await import('../../../store/useStoreMock') )

vi.mock('../../../store/store', () =>  useStoreMock )

vi.mock('react-router-dom', async () => ({
    ...vi.importActual('react-router-dom'),
    useLocation : () => '/bookshelf',
    useSearchParams : () => [{get : () => searchParam}]
}))

describe('useBookshelfView', () => {

    test('should be unread (valid searchParam)', () => {
        searchParam = 'card'
        // @ts-expect-error
        useStoreMock.useStore().settings.view = null
        const {result} =  renderHook( () => useBookshelfView() )
        expect( result.current.view ).toBe('card')
    })

    test('should be all (invalid searchParam, valid settingsParam)', () => {
        searchParam = null
        useStoreMock.useStore().settings.view = 'list'
        const {result} = renderHook( () => useBookshelfView() )
        expect(result.current.view ).toBe('list')
    })
    
    test('should be all (valid searchParam, valid settingsParam)', () => {
        searchParam = 'card'
        useStoreMock.useStore().settings.view = 'list'
        const {result} = renderHook( () => useBookshelfView() )
        expect(result.current.view ).toBe('card')
    })

    test('should default to  all (invalid searchParam, invalid settingsParam)', () => {
        searchParam = null
        // @ts-expect-error
        useStoreMock.useStore().settings.view = null
        const {result} = renderHook( () => useBookshelfView() )
        expect(result.current.view ).toBe('grid')
    })

})