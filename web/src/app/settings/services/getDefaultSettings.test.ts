// @vitest-environment jsdom
import { afterEach, describe, expect, test } from "vitest";
import { getDefaultSettings } from "./getDefaultSettings";
import { VALID_FILTERS, VALID_SORTS, VALID_THEMES, VALID_VIEWS } from "../../../config";

describe('getDefaultSettings', () => {

    afterEach( () => {
        localStorage.clear()
    })

    const { 
        currentlyReadingId,
        email,
        filter,
        location,
        name,
        sort,
        theme,
        view
    } =  getDefaultSettings()

    test('should be a valid setting for each key', () => {
        expect( currentlyReadingId ).toBe(null)
        expect( email ).toBe(null)
        expect( location ).toBe(null)
        expect( name ).toBe(null)
        expect( VALID_FILTERS.includes(filter) ).toBe( true )
        expect( VALID_SORTS.includes(sort) ).toBe(true)
        expect( VALID_THEMES.includes(theme) ).toBe(true)
        expect( VALID_VIEWS.includes(view) ).toBe(true)
    })

    test('should be dark theme, then light theme', () => {
        localStorage.setItem('theme', 'dark')
        expect( getDefaultSettings().theme ).toBe('dark')
        localStorage.setItem('theme', 'light')
        expect( getDefaultSettings().theme ).toBe('light')
    })

})