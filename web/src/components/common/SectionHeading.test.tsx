// @vitest-environment jsdom
import { render, screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"
import SectionHeading from "./SectionHeading"

describe('SectionHeading', () => {
    
    test('should render SectionHeading with text content', () => {
        render( 
            <SectionHeading>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
            </SectionHeading>
        )
        const heading = screen.getByRole('heading')
        expect( heading.textContent ).toContain('Lorem ipsum')
        expect( heading ).toBeInstanceOf(HTMLHeadingElement)
    })

})
