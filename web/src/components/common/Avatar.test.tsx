// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import Avatar from "./Avatar";



describe('Avatar', ()=> {

    afterEach(cleanup)

    test('should display uppercase letters', () => {
        render( <Avatar handle="User" />)
        expect( screen.getByText('U') ).toBeDefined()

        render( <Avatar handle="newuser" /> )
        expect( screen.getByText('N') ).toBeDefined()
        expect( screen.queryByText('n') ).toBeNull()
    })
    
})