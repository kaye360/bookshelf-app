// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import useToggleState from "./useToggleState";

describe('useToggleState', () => {

    test('should toggle state from false to true', () => {
        const { result } = renderHook( () => useToggleState() )
        expect( result.current[0] ).toBe(false)
        
        act( () => result.current[2]() )
        expect( result.current[0] ).toBe(true)
    })

    test('should toggle state from true to false', () => {
        const { result } = renderHook( () => useToggleState(true) )
        expect( result.current[0] ).toBe(true)
        
        act( () => result.current[2]() )
        expect( result.current[0] ).toBe(false)
    })
    
})