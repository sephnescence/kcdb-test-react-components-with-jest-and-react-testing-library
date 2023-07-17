1. Borrowing the code in `src/__tests__/react-testing-library.js` for the base,
   let's play around with calling `debug` to help debug the dom state during
   tests using react testing library's debug function

   ```js
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
   ```

1. For reference, debug() will look like this
   ```html
   <body>
     <div>
       <div>
         <label for="favorite-number"> Favorite Number </label>
         <input id="favorite-number" type="number" value="0" />
       </div>
     </div>
   </body>
   ```
1. For reference, `debug(container)` looks like this
   ```html
   <div>
     <div>
       <label for="favorite-number"> Favorite Number </label>
       <input id="favorite-number" type="number" value="0" />
     </div>
   </div>
   ```
1. For reference, `debug(input)` looks like this
   ```html
   <input id="favorite-number" type="number" value="0" />
   ```
1. For reference, `screen.debug(container)` looks like this
   ```html
   <div>
     <div>
       <label for="favorite-number"> Favorite Number </label>
       <input id="favorite-number" type="number" value="0" />
     </div>
   </div>
   ```
1. For reference, `screen.debug(input)` looks like this
   ```html
   <input id="favorite-number" type="number" value="0" />
   ```

Refer to
https://testingjavascript.com/lessons/react-debug-the-dom-state-during-tests-using-react-testing-library-s-debug-function-9fc783e4
for the video
