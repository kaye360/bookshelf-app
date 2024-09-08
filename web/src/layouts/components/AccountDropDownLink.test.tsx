// @vitest-environment jsdom
import { render, screen } from "@testing-library/react"
import { describe, expect, test, vi } from "vitest"
import AccountDropDownLink from "./AccountDropDownLink"
import userEvent from "@testing-library/user-event"

const router = await import('react-router-dom')
// @ts-expect-error
router.Link = vi.fn( ({to, children}) => <a href={to}>{children}</a>)

describe('AccountDropDownLink', () => {

    test('should display <a> tag with children', () => {
        const view = render( <AccountDropDownLink to="/">Link</AccountDropDownLink> )
        const link = screen.getByText('Link')
        expect( link ).toBeInstanceOf(HTMLAnchorElement)
        view.unmount()
    })

    test('should ', async () => {
        const onClickHandler = vi.fn()
        const view = render( <AccountDropDownLink onClick={onClickHandler} >Link</AccountDropDownLink> )
        const link = screen.getByText('Link')
        await userEvent.click(link)
        expect( link ).toBeInstanceOf(HTMLButtonElement)
        expect( onClickHandler ).toHaveBeenCalledOnce()
        view.unmount()
    })

})