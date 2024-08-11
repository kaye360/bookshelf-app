import { StoreMock } from './../../../store/store.mock';
import { describe, expect, test } from "vitest";
import { BookListResolver } from "./BookListResolver";

const books = StoreMock.books

// Defaults
const searchQuery = ''
const filterBy    = 'all'
const sortBy      = 'title'

describe('app/bookshelf/services/BookListResolver', () => {

    test('should get all books and have length of 10', () => {
        const resolver = new BookListResolver({ books, searchQuery, filterBy, sortBy })
        expect( resolver.resolve() ).toHaveLength(10)
    })

    test('should filter by searchQuery and have length of 4', () => {
        const resolver = new BookListResolver({ books, filterBy, sortBy, searchQuery : 'economy' })
        expect( resolver.resolve() ).toHaveLength(4)
    })

    test('should filter by isRead and have length of 7', () => {
        const resolver = new BookListResolver({ books, searchQuery, sortBy, filterBy : 'read' })
        expect( resolver.resolve() ).toHaveLength(7)
    })

    test('should sort by Author with first being', () => {
        const resolver = new BookListResolver({ books, searchQuery, filterBy, sortBy : 'author' })
        expect( resolver.resolve()[0].authors ).toBe('Aaron')
    })

    test('should filter by searchQuery and ignore filterBy and have length of 4', () => {
        const resolver = new BookListResolver({ books, sortBy, filterBy : 'wishlist', searchQuery : 'economy' })
        expect( resolver.resolve() ).toHaveLength(4)
    })
})