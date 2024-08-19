import { describe, expect, test } from "vitest";
import { StringUtils } from "./string";


describe('StringUtils.capitalize', () => {

    test('should return capitalized word', () => {
        expect( StringUtils.capitalize('word') ).toBe('Word')
        expect( StringUtils.capitalize('WORD') ).toBe('WORD')
    })

    test('should return empty string', () => {
        expect( StringUtils.capitalize(undefined) ).toBe('')
        expect( StringUtils.capitalize(null) ).toBe('')
        expect( StringUtils.capitalize({}) ).toBe('')
        expect( StringUtils.capitalize([]) ).toBe('')
        expect( StringUtils.capitalize(5) ).toBe('')
        expect( StringUtils.capitalize(0) ).toBe('')
    })
})