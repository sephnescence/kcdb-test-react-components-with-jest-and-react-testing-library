1. We're going to make use of React Testing Library a bit more now. This will
   remove the need for the following code in every file
   ```js
   function render(ui) {
     // returns an object referred to as screen in example
     const container = document.createElement('div')
     ReactDOM.render(<FavouriteNumber />, container)
     const queries = getQueriesForElement(container)
     return {container, ...queries}
   }
   ```
1. Beginning with ``, you can see the following code

   ```js
   import * as React from 'react'
   import ReactDOM from 'react-dom'
   import {getQueriesForElement} from '@testing-library/dom'
   import {FavoriteNumber} from '../favorite-number'

   test('renders a number input with a label "Favorite Number"', () => {
     const div = document.createElement('div')
     ReactDOM.render(<FavoriteNumber />, div)
     const {getByLabelText} = getQueriesForElement(div)
     const input = getByLabelText(/favorite number/i)
     expect(input).toHaveAttribute('type', 'number')
   })
   ```

1. We can refer to `src/__tests__/react-testing-library.js` instead to see what
   it would look like with React Testing Library code instead

   ```js
   import * as React from 'react'
   import {render, screen} from '@testing-library/react'
   import {FavoriteNumber} from '../favorite-number'

   test('renders a number input with a label "Favorite Number"', () => {
     render(<FavoriteNumber />)
     const input = screen.getByLabelText(/favorite number/i)
     expect(input).toHaveAttribute('type', 'number')
   })
   ```

1. Essentially, `screen` takes care of a lot for you which is pretty nice

Refer to
https://testingjavascript.com/lessons/react-use-react-testing-library-to-render-and-test-react-components-2272968f
for the video
