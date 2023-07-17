import * as React from 'react'
import {render, screen} from '@testing-library/react'
import {FavoriteNumber} from '../favorite-number'

// test('Vanilla - renders a number input with a label "Favorite Number"', () => {
// const {container, debug} = render(<FavoriteNumber />)
// const input = container.querySelector('input')
// expect(input.type).toBe('number')
// debug() // Prints out the <body> tag too. Has no equivalent in RTL
// debug(container) // The equivalent of RTL screen.debug()
// debug(input) // Same as RTL screen.debug(input)
// })

test('RTL - renders a number input with a label "Favorite Number"', () => {
  render(<FavoriteNumber />)
  const input = screen.getByLabelText(/favorite number/i)
  expect(input).toHaveAttribute('type', 'number')
  // screen.debug() // The equivalent of jest vanilla debug(container)
  // screen.debug(input) // The equivalent of jest vanilla debug(input)
})
