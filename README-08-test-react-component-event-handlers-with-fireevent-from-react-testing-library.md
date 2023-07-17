1. Kent tasked us with making a quick test to showcase `fireEvent` and
   `getByRole` in the `src/__tests__/state.js` or
   `src/__tests__/state-user-event.js` tests. It appears that over time, Kent
   moved from using `fireEvent`, even though it might still be handy as the
   state is managed. Throughout this test, debugging the input shows 0. If we
   were to actually fire the event, would it change?

   ```js
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
     expect(screen.getByRole('alert')).toHaveTextContent(
       /the number is invalid/i,
     )

     // fireEvent.change(input, { target: { value: '2' } }) // Emulate event.target.value
     userEvent.type(input, '1') // Emulate user typing, but it won't actually set the value
     expect(input).toHaveValue(1) // Note that the input now has a value of 1, but if you call debug, it will still be 0

     userEvent.type(input, '0')
     expect(screen.getByRole('alert')).toHaveTextContent(
       /the number is invalid/i,
     )
   })
   ```

1. For now, we don't know things like whether we can type a 1 and assert that
   the role doesn't exist, because an exception is thrown because the role was
   not able to be found (because the input value was legit). I was planning on
   doing this, and then entering a zero to test that the alert role now shows
1. Note that from playing around, it appears that there are advantages to
   calling fireEvent.change as opposed to userEvent.type, as `debug` will
   actually show the value that fireEvent.change put in, whereas, typing will
   not behave the same way

Refer to
https://testingjavascript.com/lessons/react-test-react-component-event-handlers-with-fireevent-from-react-testing-library-37dda2ae
for the first video

Refer to
https://testingjavascript.com/lessons/react-improve-test-confidence-with-the-user-event-module
for the second video
