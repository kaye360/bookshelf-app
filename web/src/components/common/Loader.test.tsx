// @vitest-environment jsdom
import { render } from "@testing-library/react"
import { describe, expect, test } from "vitest"
import Loader from "./Loader"

describe('Loader', () => {
    
    test('should render Loader with message', () => {
        const { container } = render( <Loader message="Loading..." />, {
            container : document.createElement('section')
        } )

        const loader = container.querySelector('div')

        expect( loader?.textContent ).toBe('Loading...')
        expect( loader ).toBeInstanceOf(HTMLDivElement)
    })

})
