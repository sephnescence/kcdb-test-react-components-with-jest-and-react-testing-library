import * as React from 'react'
import ReactDOM from 'react-dom'
import {FavoriteNumber} from '../favorite-number'

// test('Vanilla - renders a number input with a label "Favorite Number"', () => {
//   const div = document.createElement('div')
//   ReactDOM.render(<FavoriteNumber />, div)
//   expect(div.querySelector('input').type).toBe('number')
//   expect(div.querySelector('label').textContent).toBe('Favorite Number')
// })

/*
// Alternatively, you can do a bit of this manually by importing (at the top of the file, not here)

import(toHaveAttribute, toHaveTextContent) from '@testing-library/jest-dom'

// and before any tests
expect.extend({toHaveAttribute, toHaveTextContent}) // expect is a global created by jest

// inside relevant tests
expect(div.querySelector('input')).toHaveAttribute('type', 'number')
expect(div.querySelector('label')).toHaveTextContent('Favorite Number')
*/

/*
// Alternatively again, you can just import everything from js-dom (at the top of the file, not here)
import * as jestDom from '@testing-library/jest-dom'

// and before any test
expect.extend(jestDom)

// inside relevant tests
expect(div.querySelector('input')).toHaveAttribute('type', 'number')
expect(div.querySelector('label')).toHaveTextContent('Favorite Number')
*/

// Alternatively yet agin, you can import this instead and not have to call extend on expect
// import '@testing-library/jest-dom/extend-expect'

// Final show alternative, just update one of the following three files to automatically include extend-expect
//  I'm not 100% across the specifics yet, so I'll need to google it
// - jest.config.js
// - global.d.ts
// - setup-env.js

test('RTL - renders a number input with a label "Favorite Number"', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FavoriteNumber />, div)
  expect(div.querySelector('input')).toHaveAttribute('type', 'number')
  expect(div.querySelector('label')).toHaveTextContent('Favorite Number')
})
