1. Continuing on from
   [README 20 - Test Drive the Development of a React Form with React Testing Library](README-20-tdd-test-drive-the-development-of-a-react-form-with-react-testing-library.md)
   as this file is pretty large
1. Essentially this time we're mocking the response from the post request to the
   server. I don't agree to the frontend having to pass through the id though.
   That's normally supported in testing environments so you can easily get data
   back out from the db, but I wouldn't expect the frontend to have the props,
   etc. set up to do it.
1. All the same, referring to `src/__tests__/tdd-03-api.js` for the updated test

   ```js
   import * as React from 'react'
   import {render, screen} from '@testing-library/react'
   import userEvent from '@testing-library/user-event'
   import {savePost as mockSavePost} from '../api'
   import {Editor} from '../post-editor-03-api'

   jest.mock('../api')

   afterEach(() => {
     jest.clearAllMocks()
   })

   test('renders a form with title, content, tags, and a submit button', () => {
     mockSavePost.mockResolvedValueOnce()
     const fakeUser = {id: 'user-1'}
     render(<Editor user={fakeUser} />)
     const fakePost = {
       title: 'Test Title',
       content: 'Test content',
       tags: ['tag1', 'tag2'],
     }
     screen.getByLabelText(/title/i).value = fakePost.title
     screen.getByLabelText(/content/i).value = fakePost.content
     screen.getByLabelText(/tags/i).value = fakePost.tags.join(', ')
     const submitButton = screen.getByText(/submit/i)

     userEvent.click(submitButton)

     expect(submitButton).toBeDisabled()

     expect(mockSavePost).toHaveBeenCalledWith({
       ...fakePost,
       authorId: fakeUser.id,
     })
     expect(mockSavePost).toHaveBeenCalledTimes(1)
   })
   ```

   And referring to `src/post-editor-03-api.js` for the updated code

   ```js
   import * as React from 'react'
   import {savePost} from './api'

   function Editor({user}) {
     const [isSaving, setIsSaving] = React.useState(false)
     function handleSubmit(e) {
       e.preventDefault()
       const {title, content, tags} = e.target.elements
       const newPost = {
         title: title.value,
         content: content.value,
         tags: tags.value.split(',').map((t) => t.trim()),
         authorId: user.id,
       }
       setIsSaving(true)
       savePost(newPost)
     }
     return (
       <form onSubmit={handleSubmit}>
         <label htmlFor="title-input">Title</label>
         <input id="title-input" name="title" />

         <label htmlFor="content-input">Content</label>
         <textarea id="content-input" name="content" />

         <label htmlFor="tags-input">Tags</label>
         <input id="tags-input" name="tags" />

         <button type="submit" disabled={isSaving}>
           Submit
         </button>
       </form>
     )
   }

   export {Editor}
   ```

1. Note that there are a few things here that I don't like
   - I've already mentioned that I don't like the id being in the frontend like
     that
   - Replicating the tags.split business logic. Surely the component will have
     some business logic function to take the string and explode it. Or just
     allow the server to handle a string
1. The next video
   (https://testingjavascript.com/lessons/react-test-drive-mocking-react-router-s-redirect-component-on-a-form-submission)
   goes over asserting redirects

   ```js
   import * as React from 'react'
   import {render, screen, waitFor} from '@testing-library/react'
   import userEvent from '@testing-library/user-event'
   import {Redirect as MockRedirect} from 'react-router'
   import {savePost as mockSavePost} from '../api'
   import {Editor} from '../post-editor-04-router-redirect'

   jest.mock('react-router', () => {
     return {
       Redirect: jest.fn(() => null),
     }
   })

   jest.mock('../api')

   afterEach(() => {
     jest.clearAllMocks()
   })

   test('renders a form with title, content, tags, and a submit button', async () => {
     mockSavePost.mockResolvedValueOnce()
     const fakeUser = {id: 'user-1'}
     render(<Editor user={fakeUser} />)
     const fakePost = {
       title: 'Test Title',
       content: 'Test content',
       tags: ['tag1', 'tag2'],
     }
     screen.getByLabelText(/title/i).value = fakePost.title
     screen.getByLabelText(/content/i).value = fakePost.content
     screen.getByLabelText(/tags/i).value = fakePost.tags.join(', ')
     const submitButton = screen.getByText(/submit/i)

     userEvent.click(submitButton)

     expect(submitButton).toBeDisabled()

     expect(mockSavePost).toHaveBeenCalledWith({
       ...fakePost,
       authorId: fakeUser.id,
     })
     expect(mockSavePost).toHaveBeenCalledTimes(1)

     await waitFor(() =>
       expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {}),
     )
   })
   ```

   And the updated code

   ```js
   import * as React from 'react'
   import {Redirect} from 'react-router'
   import {savePost} from './api'

   function Editor({user}) {
     const [isSaving, setIsSaving] = React.useState(false)
     const [redirect, setRedirect] = React.useState(false)
     function handleSubmit(e) {
       e.preventDefault()
       const {title, content, tags} = e.target.elements
       const newPost = {
         title: title.value,
         content: content.value,
         tags: tags.value.split(',').map((t) => t.trim()),
         authorId: user.id,
       }
       setIsSaving(true)
       savePost(newPost).then(() => setRedirect(true))
     }
     if (redirect) {
       return <Redirect to="/" />
     }
     return (
       <form onSubmit={handleSubmit}>
         <label htmlFor="title-input">Title</label>
         <input id="title-input" name="title" />

         <label htmlFor="content-input">Content</label>
         <textarea id="content-input" name="content" />

         <label htmlFor="tags-input">Tags</label>
         <input id="tags-input" name="tags" />

         <button type="submit" disabled={isSaving}>
           Submit
         </button>
       </form>
     )
   }

   export {Editor}
   ```

1. Ken points out that we only have
   `await waitFor(() => expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {}))`
   with no subsequent call to `toHaveBeenCalledTimes` as we can't guarantee that
   it only gets called x times, as it's called off the back of a rerender, and
   react can do that however many times it wishes. That's an implementation
   detail according to Kent, and he advises against doing it
1. Note that Kent also returns a Redirect component... Instead of pushing
   history. I think from a testing perspective that's because Window doesn't
   exist in tests. I think I'd forgotten to mention it earlier, but we had used
   a polyfill to get something from Window, but I can't remember where

Refer to
https://testingjavascript.com/lessons/react-test-drive-the-api-call-of-a-react-form-with-react-testing-library
for the video
