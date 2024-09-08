// @vitest-environment jsdom
import { screen } from "@testing-library/dom"
import { render } from "@testing-library/react"
import { describe, expect, test, vi } from "vitest"
import Logo from "./Logo"

const router = await import('react-router-dom')
// @ts-expect-error
router.Link = vi.fn( ({to, children}) => <a href={to}>{children}</a>)

describe('Logo', () => {

    test('should render Logo', () => {
        render( <Logo /> )
        expect( screen.getByRole('link') ).toBeDefined()
    })

})