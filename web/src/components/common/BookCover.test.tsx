// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import BookCover from "./BookCover";
import { useStoreMock } from "../../store/useStoreMock";

const { useStore } = useStoreMock
const books = useStore().books

describe('BookCover', () => {

    render( 
        <>
            <BookCover 
                src={books[0].imageUrl}
                size="sm"
            /> 
            <BookCover 
                src={books[1].imageUrl}
                size="md"

            /> 
            <BookCover 
                src={books[2].imageUrl}
                size="lg"
            /> 
        </>
    )
    
    const img = screen.getAllByRole('img')

    test('should be sm BookCover', () => {

        expect( img[0] ).toBeDefined()
        expect( img[0].getAttribute('width') ).toBe("60")
        expect( img[0].getAttribute('height') ).toBe("96")
        expect( img[0] ).toHaveProperty('src')

    })

    test('should be md BookCover', () => {

        expect( img[1] ).toBeDefined()
        expect( img[1].getAttribute('width') ).toBe("100")
        expect( img[1].getAttribute('height') ).toBe("160")

    })

    test('should be lg BookCover', () => {

        expect( img[2] ).toBeDefined()
        expect( img[2].getAttribute('width') ).toBe("175")
        expect( img[2].getAttribute('height') ).toBe("280")

    })

    test('should be BookCover without src image', () => {

        render( <BookCover size="sm" title="book-4" /> )

        const bookCoverWithoutSrc = screen.getByText('book-4')
        expect( bookCoverWithoutSrc ).toBeDefined()
    })
    
})