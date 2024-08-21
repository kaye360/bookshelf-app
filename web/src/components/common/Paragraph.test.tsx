// @vitest-environment jsdom
import { render, screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"
import Paragraph from "./Paragraph"

describe('Paragraph', () => {
    
    test('should render Paragraph with text content', () => {
        render( 
            <Paragraph>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
            </Paragraph>
        )
        const p = screen.getByRole('paragraph')
        expect( p.textContent ).toContain('Lorem ipsum')
        expect( p ).toBeInstanceOf(HTMLParagraphElement)
    })

})
