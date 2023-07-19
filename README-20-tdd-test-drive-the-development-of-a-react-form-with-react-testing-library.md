1. TDD time! (Test Driven Development)
1. Referring to `src/__tests__/tdd-01-markup.js`, Kent made the following test
   to create the `src/post-editor-01-markup.js` file

   ```js
   import * as React from 'react'
   import {render, screen} from '@testing-library/react'
   import {Editor} from '../post-editor-01-markup'

   test('renders a form with title, content, tags, and a submit button', () => {
     render(<Editor />)
     screen.getByLabelText(/title/i)
     screen.getByLabelText(/content/i)
     screen.getByLabelText(/tags/i)
     screen.getByText(/submit/i)
   })
   ```

1. In order for this test to pass, using the red/green light method, Kent wrote
   the test first so that the test would eventually pass once all the assertions
   were successful. He ended up with the following content in
   `src/post-editor-01-markup.js`

   ```js
   import * as React from 'react'

   function Editor() {
     return (
       <form>
         <label htmlFor="title-input">Title</label>
         <input id="title-input" />

         <label htmlFor="content-input">Content</label>
         <textarea id="content-input" />

         <label htmlFor="tags-input">Tags</label>
         <input id="tags-input" />

         <button type="submit">Submit</button>
       </form>
     )
   }

   export {Editor}
   ```

1. This is pretty basic, but it does the job. I had thoughts about wondering how
   to assert that a now required field in graphql would fail assertions if the
   components didn't provide the required field. If we're using MSW to mock
   stuff then we can't test the mutation actually works. We might still want to
   mock the mutation to ensure toasts and subsequent navigation works as
   expected. Maybe this is where Playwright and Cypress come in?
1. Kent immediately moved on to testing the submit button being disabled when
   the form is submitted, so this is in line with what I was thinking above in
   that you would want to be testing the app's state during submission. This
   addition was super basic though, in that the handler for the submit button
   never posts anything, but it sets the isSaving state to true so that the
   submit button gets disabled.

   Refer to `src/post-editor-02-state.js` for the updated code

   ```js
   import * as React from 'react'

   function Editor() {
     const [isSaving, setIsSaving] = React.useState(false)
     function handleSubmit(e) {
       e.preventDefault()
       setIsSaving(true)
     }
     return (
       <form onSubmit={handleSubmit}>
         <label htmlFor="title-input">Title</label>
         <input id="title-input" />

         <label htmlFor="content-input">Content</label>
         <textarea id="content-input" />

         <label htmlFor="tags-input">Tags</label>
         <input id="tags-input" />

         <button type="submit" disabled={isSaving}>
           Submit
         </button>
       </form>
     )
   }

   export {Editor}
   ```

   Refer to `src/__tests__/tdd-02-state.js` for the updated test

   ```js
   import * as React from 'react'
   import {render, screen} from '@testing-library/react'
   import userEvent from '@testing-library/user-event'
   import {Editor} from '../post-editor-02-state'

   test('renders a form with title, content, tags, and a submit button', () => {
     render(<Editor />)
     screen.getByLabelText(/title/i)
     screen.getByLabelText(/content/i)
     screen.getByLabelText(/tags/i)
     const submitButton = screen.getByText(/submit/i)

     userEvent.click(submitButton)

     expect(submitButton).toBeDisabled()
   })
   ```

Refer to
https://testingjavascript.com/lessons/react-test-drive-the-development-of-a-react-form-with-react-testing-library
for the video
