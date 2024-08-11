import { describe, expect, test } from "vitest";
import { getAuthors } from "./getAuthors";

const authorsListShort = 'James Anderson, Emily Brown, Michael Davis'

const authorsListLong = 'James Anderson, Emily Brown, Michael Davis, Sarah Evans, David Harris, Jessica Johnson, Daniel Miller, Ashley Thompson, Matthew Wilson, Samantha Clark'

describe('getAuthors', () => {
    
    test('should be string of first five authors with trailing ...', () => {
        expect( getAuthors(authorsListLong) ).not.toContain('Jessica Johnson')
        expect( getAuthors(authorsListLong)?.slice(-3) ).toEqual('...')
    })

    test('should be full author string', () => {
        expect( getAuthors(authorsListShort) ).toEqual(authorsListShort)
    })
})