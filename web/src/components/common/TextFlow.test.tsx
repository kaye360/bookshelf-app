// @vitest-environment jsdom
import { render, screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"
import TextFlow from "./TextFlow"

describe('TextFlow', () => {
    
    test('should render TextFlow with text content', () => {
        render( 
            <TextFlow>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                </p>
            </TextFlow>
        )
        const text = screen.getByRole('paragraph')
        expect( text.textContent ).toContain('Lorem ipsum')
        expect( text ).toBeInstanceOf(HTMLParagraphElement)
        expect( text.parentElement ).toBeInstanceOf(HTMLDivElement)
        expect( text.parentElement?.classList ).toContain('text-flow')
    })

})
