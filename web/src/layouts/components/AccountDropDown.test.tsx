// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import AccountDropDown from "./AccountDropDown";

describe('AccountDropDown', () => {

    test('should render as opened', () => {
        const view = render( <AccountDropDown showDropDown={true}>content</AccountDropDown> )
        const dropdown = screen.getByText('content')
        expect( dropdown ).toBeDefined()
        expect( dropdown.className ).toContain('max-h-[400px]')
        view.unmount()
    })

    test('should render as collapsed', () => {
        const view = render( <AccountDropDown showDropDown={false}>content</AccountDropDown> )
        const dropdown = screen.getByText('content')
        expect( dropdown ).toBeDefined()
        expect( dropdown.className ).toContain('max-h-0')
        view.unmount()
    })

})