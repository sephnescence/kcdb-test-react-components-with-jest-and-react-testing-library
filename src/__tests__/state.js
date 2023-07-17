import * as React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {FavoriteNumber} from '../favorite-number'

test('entering an invalid value shows an error message', () => {
  render(<FavoriteNumber />)
  const input = screen.getByLabelText(/favorite number/i)
  fireEvent.change(input, {target: {value: '2'}}) // Emulate event.target.value
  expect(input).toHaveValue(2)
  fireEvent.change(input, {target: {value: '0'}}) // The value should now be 10
  expect(input).toHaveValue(0) // It gets reset to 0 on validation error
  expect(screen.getByRole('alert')).toHaveTextContent(/the number is invalid/i)

  // fireEvent.change(input, { target: { value: '2' } }) // Emulate event.target.value
  userEvent.type(input, '1') // Emulate user typing, but it won't actually set the value
  expect(input).toHaveValue(1) // Note that the input now has a value of 1, but if you call debug, it will still be 0

  userEvent.type(input, '0')
  expect(screen.getByRole('alert')).toHaveTextContent(/the number is invalid/i)
})
