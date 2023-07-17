1. Kent tasked us with making a quick test to showcase `fireEvent` and
   `getByRole` in the `src/__tests__/state.js` test

   - N.B. It appears that Kent now uses `userEvent`. e.g.
     `import userEvent from '@testing-library/user-event'`

   ```js
   import * as React from 'react'
   import {render, screen} from '@testing-library/react'
   import userEvent from '@testing-library/user-event'
   import {FavoriteNumber} from '../favorite-number'

   test('entering an invalid value shows an error message', () => {
     render(<FavoriteNumber />)
     const input = screen.getByLabelText(/favorite number/i)
     userEvent.type(input, '10')
     expect(screen.getByRole('alert')).toHaveTextContent(
       /the number is invalid/i,
     )
   })
   ```

1. For now, we don't know things like whether we can type a 1 and assert that
   the role doesn't exist, because an exception is thrown because the role was
   not able to be found (because the input value was legit). I was planning on
   doing this, and then entering a zero to test that the alert role now shows

Refer to
https://testingjavascript.com/lessons/react-test-react-component-event-handlers-with-fireevent-from-react-testing-library-37dda2ae
for the video
