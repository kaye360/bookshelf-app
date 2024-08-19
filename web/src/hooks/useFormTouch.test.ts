// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import useFormTouch from "./useFormTouch";

describe('useFormTouch', () => {

    test('should be false-true-false (default, touchForm(), resetTouch())', () => {
        const { result } = renderHook( () => useFormTouch( ))
        expect( result.current.isTouched ).toBe(false)

        act( () => result.current.touchForm() ) 
        expect( result.current.isTouched ).toBe(true)
        
        act( () => result.current.resetTouch() ) 
        expect( result.current.isTouched ).toBe(false)
    })
})
