import { StoreMock } from './../../../store/store.mock';
import { describe, expect, test } from "vitest";
import { BookListResolver } from "./BookListResolver";

const books = StoreMock.books

// Defaults
const searchQuery = ''
const filterBy    = 'all'
const sortBy      = 'title'

describe('BookListResolver', () => {

    test('should get all books and have length of 10', () => {
        const resolver = new BookListResolver({ books, searchQuery, filterBy, sortBy })
        expect( resolver.resolve() ).toHaveLength(10)
    })

    test('should filter by searchQuery and have length of 4', () => {
        const resolver = new BookListResolver({ books, filterBy, sortBy, searchQuery : 'economy' })
        expect( resolver.resolve() ).toHaveLength(4)
    })

    test('should filter by read', () => {
        const resolver = new BookListResolver({ books, searchQuery, sortBy, filterBy : 'read' })
        resolver.resolve().forEach( book => expect( book.isRead ).toBe(true) )
    })
    
    test('should filter by unread', () => {
        const resolver = new BookListResolver({ books, searchQuery, sortBy, filterBy : 'unread' })
        resolver.resolve().forEach( book => expect( book.isRead ).toBe(false) )
    })

    test('should sort by Author', () => {
        const resolver = new BookListResolver({ books, searchQuery, filterBy, sortBy : 'authors' })
        const resolved = resolver.resolve()
        const last = resolved.length -1
        expect( resolved[0].authors ).toBe('Aaron')
        expect( resolved[last].authors ).toBe('Zoey')
    })

    test('should filter by searchQuery and ignore filterBy and have length of 4', () => {
        const resolver = new BookListResolver({ books, sortBy, filterBy : 'wishlist', searchQuery : 'economy' })
        expect( resolver.resolve() ).toHaveLength(4)
    })
})