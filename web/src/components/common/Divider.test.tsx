// @vitest-environment jsdom
import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Divider from "./Divider";

describe('Divider', () => {
    
    test('should display div', () => {

        const { container } =  render( <Divider />, {
            container : document.createElement('section')
        } )

        expect( container.querySelector('div') ).toBeDefined()
    })
})