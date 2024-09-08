// @vitest-environment jsdom
import { render, screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"
import Wrapper from "./Wrapper"

describe('Wrapper.test', () => {

    test('should ', () => {

        render( 
            <Wrapper> 
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique, placeat. 
            </Wrapper> 
        )

        expect( screen.getByText(/Lorem ipsum/) ).toBeDefined()
    })

})