1. We can test accessibility with `jest-axe` if we like. Kent has it saved in
   `dependencies` for this course, but I'd expect to save it to dev for retail
   codebases
1. In a test where you want to assert accessibility, the test will look a little
   bit different as it's an `async` library. Referring to
   `src/__tests__/a11y.js`...

   ```js
   import * as React from 'react'
   import {render} from '@testing-library/react'
   import {axe} from 'jest-axe'

   function InaccessibleForm() {
     // Form inputs must have an accessible name
     // Ref: 4.1.1 of W3C HTML Accessibility API Mappings 1.0
     return (
       <form>
         <input id="username" />
       </form>
     )
   }

   function AccessibleForm() {
     return (
       <form>
         <label htmlFor="username">Username</label>
         <input id="username" placeholder="username" />
       </form>
     )
   }

   test('inaccessible forms fail axe', async () => {
     const {container} = render(<InaccessibleForm />)
     const axeResult = await axe(container)
     expect(() => expect(axeResult).toHaveNoViolations()).toThrow()
     // NOTE: I can't think of a situation where you'd want to test that some HTML
     // actually _does_ have accessibility issues... This is only here for
     // demonstration purposes.
   })

   test('accessible forms pass axe', async () => {
     const {container} = render(<AccessibleForm />)
     expect(await axe(container)).toHaveNoViolations()
   })
   ```

1. Note that the test is now async
1. Note that jest-axe also has an extend-expect. This must be a common pattern.
   Kent hid this away in `global.d.ts` and `jest-dom.js`, but it is being
   imported
1. Note that doing it in the above way kinda felt like it would be confusing
   without context, but if you read the code it essentially says
   `expect axe() toHaveNoViolations`

Refer to
https://testingjavascript.com/lessons/react-test-accessibility-of-rendered-react-components-with-jest-axe
for the video
