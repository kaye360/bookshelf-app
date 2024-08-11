import { describe, expect, test } from "vitest";
import { userHasBook } from "./userHasBook";
import { StoreMock } from "../../../store/store.mock";

describe('userHasBook', () => {

    test('should be true', () => {
        expect( userHasBook({key : 'OL5901985W', books : StoreMock.books }) ).toEqual(true)
    })

    test('should be false (key not found)', () => {
        expect( userHasBook({key : 'adfgjhkdjf', books : StoreMock.books }) ).toEqual(false)
    })

    test('should be false (no key)', () => {
        expect( userHasBook({books : StoreMock.books }) ).toEqual(false)
    })

    test('should throw error (no books)', () => {
        // @ts-expect-error
        expect( () => userHasBook({key : 'OL5901985W'}) ).toThrowError()
    })
})