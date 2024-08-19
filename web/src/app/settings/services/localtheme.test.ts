// @vitest-environment jsdom
import { afterEach, describe, expect, test } from "vitest";
import { getLocalTheme, updateLocalTheme } from "./localTheme";

describe('getLocalTheme', () => {

    afterEach( () => {
        localStorage.clear()
    })

    test('should be light theme, then dark', () => {
        expect( getLocalTheme() ).toBe('light')
        localStorage.setItem('theme', 'dark')
        expect( getLocalTheme() ).toBe('dark')
    })
})

describe('updateLocalTheme', () => {

    afterEach( () => {
        localStorage.clear()
    })

    test('should be light theme (invalid theme)', () => {
        // @ts-expect-error
        updateLocalTheme('invalid')
        expect( localStorage.getItem('theme') ).toBe('light')
    })

    test('should be light theme (invalid theme)', () => {
        updateLocalTheme('dark')
        expect( localStorage.getItem('theme') ).toBe('dark')
    })

})