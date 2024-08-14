import { StoreMock } from './../../../store/store.mock';
import { describe, expect, test } from "vitest";
import { BookListResolver } from "./BookListResolver";

const books = StoreMock.books

// Defaults
const searchQuery = ''
const filterBy    = 'all'
const sortBy      = 'title'
const taggedAs    = null

describe('BookListResolver', () => {

    test('should get all books and have length of 10', () => {
        const resolver = new BookListResolver({ books, searchQuery, filterBy, sortBy, taggedAs })
        expect( resolver.resolve() ).toHaveLength(10)
    })

    test('should filter by searchQuery and have length of 4', () => {
        const resolver = new BookListResolver({ books, filterBy, sortBy, taggedAs, searchQuery : 'economy' })
        expect( resolver.resolve() ).toHaveLength(4)
    })

    test('should filter by read', () => {
        const resolver = new BookListResolver({ books, searchQuery, sortBy, taggedAs, filterBy : 'read' })
        resolver.resolve().forEach( book => expect( book.isRead ).toBe(true) )
    })
    
    test('should filter by unread', () => {
        const resolver = new BookListResolver({ books, searchQuery, sortBy, taggedAs, filterBy : 'unread' })
        resolver.resolve().forEach( book => expect( book.isRead ).toBe(false) )
    })

    test('should filter by tag', () => {
        const resolver = new BookListResolver({ books, searchQuery, sortBy, filterBy, taggedAs : 'testone'})
        resolver.resolve().forEach( book => expect( book.tags.includes('testone') ).toBe(true) )
    })

    test('should sort by Author', () => {
        const resolver = new BookListResolver({ books, searchQuery, filterBy, taggedAs, sortBy : 'authors' })
        const resolved = resolver.resolve()
        const last = resolved.length -1
        expect( resolved[0].authors ).toBe('Aaron')
        expect( resolved[last].authors ).toBe('Zoey')
    })

    test('should filter by searchQuery and ignore filterBy and have length of 4', () => {
        const resolver = new BookListResolver({ books, sortBy, taggedAs, filterBy : 'wishlist', searchQuery : 'economy' })
        expect( resolver.resolve() ).toHaveLength(4)
    })
})