// @vitest-environment jsdom
import { render, screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"
import NavLinkTitle from "./NavLinkTitle"

describe('NavLinkTitle', () => {

    render( <NavLinkTitle>Link Title</NavLinkTitle> )
    test('should render NavLinkTitle', () => {
        expect( screen.getByText('Link Title') ).toBeDefined()
    })

})