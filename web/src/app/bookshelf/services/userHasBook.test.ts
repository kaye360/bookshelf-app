import { describe, expect, test, vi } from "vitest";
import { userHasBook } from "./userHasBook";

let {useStoreMock} = await vi.hoisted( async () => await import('../../../store/useStoreMock') )

vi.mock('../../../store/store', () =>  useStoreMock )
const books = useStoreMock.useStore().books

describe('userHasBook', () => {

    test('should be true', () => {
        expect( userHasBook({key : 'OL5901985W', books }) ).toEqual(true)
    })

    test('should be false (key not found)', () => {
        expect( userHasBook({key : 'adfgjhkdjf', books }) ).toEqual(false)
    })

    test('should be false (no key)', () => {
        expect( userHasBook({books }) ).toEqual(false)
    })

    test('should throw error (no books)', () => {
        // @ts-expect-error
        expect( () => userHasBook({key : 'OL5901985W'}) ).toThrowError()
    })
})