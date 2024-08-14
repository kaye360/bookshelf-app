import { describe, expect, test } from "vitest";
import { isValidFilter, isValidSort, isValidView } from "./isValidSetting";
import { VALID_FILTERS, VALID_SORTS, VALID_VIEWS } from "../../../config";

describe('isValidView', () => {
    
    test('should be false', () => {
        expect( isValidView('InvalidView') ).toBe(false)
    })

    test('should be true', () => {
        VALID_VIEWS.forEach(view => {
            expect( isValidView(view) ).toBe(true)
        })
    })

})

describe('isValidFilter', () => {

    test('should be false', () => {
        expect( isValidFilter('InvalidFilter') ).toBe(false)
    })

    test('should be true', () => {
        VALID_FILTERS.forEach(filter => {
            expect( isValidFilter(filter) ).toBe(true)
        })
    })
})

describe('isValidSort', () => {

    test('should be false', () => {
        expect( isValidSort('InvalidSort') ).toBe(false)
    })

    test('should be true', () => {
        VALID_SORTS.forEach(sort => {
            expect( isValidSort(sort) ).toBe(true)
        })
    })
})
