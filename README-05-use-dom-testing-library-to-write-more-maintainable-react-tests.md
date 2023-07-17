1. We can use queries to fetch inputs based on their label to assert that screen
   readers will work. I think he's choosing to ignore the a11y package, but I
   guess as many hands on deck to assert accessibility is a good thing. Look at
   `src/__tests__/dom-testing-library.js` for reference
   ```js
   test('renders a number input with a label "Favorite Number"', () => {
     const div = document.createElement('div')
     ReactDOM.render(<FavoriteNumber />, div)
     const {getByLabelText} = getQueriesForElement(div)
     const input = getByLabelText(/favorite number/i)
     expect(input).toHaveAttribute('type', 'number')
   })
   ```
1. You can refer to `src/favorite-number.js` to see the input and label
   ```js
   <div>
     <label htmlFor="favorite-number">Favorite Number</label>
     <input
       id="favorite-number"
       type="number"
       value={number}
       onChange={handleChange}
     />
     {isValid ? null : <div role="alert">The number is invalid</div>}
   </div>
   ```
1. If that `label` element had a typo in the htmlFor, then RTL will fail the
   test but give you a good human readable assert

- e.g.
  `TestingLibraryElementError: Unable to find a label with the text of: /favorte number/i`
- e.g.
  `TestingLibraryElementError: Found a label with the text of: /favorite number/i, however no form control was found associated to that label. Make sure you're using the "for" attribute or "aria-labelledby" attribute correctly.`

Refer to
https://testingjavascript.com/lessons/react-use-dom-testing-library-to-write-more-maintainable-react-tests-16721916
for the video
