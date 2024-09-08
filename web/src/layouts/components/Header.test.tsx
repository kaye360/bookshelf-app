// @vitest-environment jsdom
import { render, screen } from "@testing-library/react"
import { describe, expect, test, vi } from "vitest"
import Header from "./Header"
import { APP_NAME } from "../../config"

vi.mock('../../store/store', () => ({
    useStore : () => ({
        auth : { isAuth : true, user : { handle : 'testUser' } }
    })
}))

const router = await import('react-router-dom')
// @ts-expect-error
router.Link = vi.fn( ({to, children}) => <a href={to}>{children}</a>)

describe('Header', () => {
    
    test('should render header', () => {
        render( <Header /> )
        expect( screen.getByText('testUser') ).toBeDefined()
        expect( screen.getByText(APP_NAME) ).toBeDefined()
        expect( document.querySelector('header') ).toBeDefined()
    })
    
})