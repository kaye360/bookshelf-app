// @vitest-environment jsdom

import { describe, expect, test, vi } from "vitest";
import useBookshelfSettings from "./useBookshelfSettings";
import { act, renderHook } from "@testing-library/react";
import { DEFAULT_FILTER, DEFAULT_SORT, DEFAULT_VIEW } from "../../../config";

let {useStoreMock} = await vi.hoisted( async () => await import('../../../store/useStoreMock') )

vi.mock('../../../store/store', () =>  useStoreMock )

const props = { isTouched : true, touchForm : () => {} }

describe('useBookshelfSettings', () => {

    test('should be DEFAULT settings', () => {
        const { result } = renderHook( () => useBookshelfSettings(props) )
        expect( result.current.view ).toBe( DEFAULT_VIEW )
        expect( result.current.filter ).toBe( DEFAULT_FILTER )
        expect( result.current.sort ).toBe( DEFAULT_SORT )
    })

    test('should be list (valid view change)', () => {
        const { result } = renderHook( () => useBookshelfSettings(props) )
        act( () => result.current.handleClick({view : 'list'}) )
        expect( result.current.view ) .toBe('list')
    })

    test('should be owned (valid filter change)', () => {
        const { result } = renderHook( () => useBookshelfSettings(props) )
        act( () => result.current.handleClick({filter : 'owned'}) )
        expect( result.current.filter ) .toBe('owned')
    })

    test('should be oldest (valid sort change)', () => {
        const { result } = renderHook( () => useBookshelfSettings(props) )
        act( () => result.current.handleClick({sort : 'oldest'}) )
        expect( result.current.sort ) .toBe('oldest')
    })

    test('should throw error (null handleClick props)', () => {
        const { result } = renderHook( () => useBookshelfSettings(props) )
        // @ts-expect-error
        expect( () => result.current.handleClick( null) ).toThrowError() 
    })

    test('should throw error (too many handleClick props)', () => {
        const { result } = renderHook( () => useBookshelfSettings(props) )
        expect( () => result.current.handleClick({
            filter : 'all',
            view   : 'card'
        }) ).toThrowError('Invalid setting input') 
    })
    
})