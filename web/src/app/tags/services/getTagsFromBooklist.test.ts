import { describe, expect, test, vi } from "vitest";
import { getTagsFromBookList } from "./getTagsFromBookList";

let {useStoreMock} = await vi.hoisted( async () => await import('../../../store/useStoreMock') )

vi.mock('../../../store/store', () =>  useStoreMock )
const books = useStoreMock.useStore().books

describe('getTagsFromBooklist', () => {

    const bookList = getTagsFromBookList(books)

    test('should be an array', () => {
        expect( Array.isArray(bookList) ).toEqual( true )
    })

    test('should have each item with tag: string, count: number', () => {
        bookList.forEach( book => {
            expect( book ).toHaveProperty('tag')
            expect( book ).toHaveProperty('count')
            expect( book.count ).toBeTypeOf('number')
            expect( book.tag ).toBeTypeOf('string')
        })
    })
    
    test('should return empty array (invalid input)', () => {
        // @ts-expect-error
        const invalid = getTagsFromBookList(null)
        expect( invalid ).toEqual([])
    })
})