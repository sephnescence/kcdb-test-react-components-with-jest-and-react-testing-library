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
     const {rerender} = render(<FavoriteNumber />)
     const input = screen.getByLabelText(/favorite number/i)
     fireEvent.change(input, {target: {value: '2'}}) // Emulate event.target.value
     expect(input).toHaveValue(2)
     expect(screen.queryByRole('alert')).toBe(null)
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

     // I think this is technically how you're meant to change things without typing
     // There is no forward ref though, so I cannot set the value directly
     rerender(<FavoriteNumber max={10} />) // This means that the alert role should no longer show
     expect(screen.queryByRole('alert')).toBe(null)
   })
   ```

1. By the fourth video, we were told how to assert that the error role doesn't
   exist. Note that `queryByX` will not fail as nicely as `getByX`. For example

   ```
   expect(received).toHaveTextContent()

   received value must be an HTMLElement or an SVGElement.
   Received has value: null
   ```

   Versus

   ```
   TestingLibraryElementError: Unable to find an accessible element with the role "alet"

   Here are the accessible roles:
   <a call to debug on your behalf>
   ```

   At least with experience, seeing that first message will prompt you to look
   for a `queryByX` call

1. Note that from playing around, it appears that there are advantages to
   calling fireEvent.change as opposed to userEvent.type, as `debug` will
   actually show the value that fireEvent.change put in, whereas, typing will
   not behave the same way
1. Note that props can be updated by calling `rerender` if you grabbed it from
   the output of `render`, but without a forward ref, the only way to set the
   value of the input is to type into it.

Refer to
https://testingjavascript.com/lessons/react-test-react-component-event-handlers-with-fireevent-from-react-testing-library-37dda2ae
for the first video

Refer to
https://testingjavascript.com/lessons/react-improve-test-confidence-with-the-user-event-module
for the second video

Refer to
https://testingjavascript.com/lessons/react-test-prop-updates-with-react-testing-library
for the third video

Refer to
https://testingjavascript.com/lessons/react-assert-that-something-is-not-rendered-with-react-testing-library
for the fourth video
