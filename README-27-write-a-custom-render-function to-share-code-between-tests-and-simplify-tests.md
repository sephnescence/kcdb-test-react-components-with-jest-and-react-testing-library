1. Kent suggests refactoring where you can, for example with the Editor tests,
   you need only define the code to render the editor once. The only difference
   between the two tests is that in on you're mocking the resolved return, and
   in the other you're mocking the rejected return

   ```js
   function renderEditor() {
     const fakeUser = userBuilder()
     const utils = render(<Editor user={fakeUser} />)
     const fakePost = postBuilder()

     screen.getByLabelText(/title/i).value = fakePost.title
     screen.getByLabelText(/content/i).value = fakePost.content
     screen.getByLabelText(/tags/i).value = fakePost.tags.join(', ')
     const submitButton = screen.getByText(/submit/i)
     return {
       ...utils,
       submitButton,
       fakeUser,
       fakePost,
     }
   }
   ```

1. Then in the `mockResolvedValueOnce` you can do this - before/after/diff

   ```js
   // Before
   test('renders a form with title, content, tags, and a submit button', async () => {
     mockSavePost.mockResolvedValueOnce()
     const fakeUser = userBuilder()
     render(<Editor user={fakeUser} />)
     const fakePost = postBuilder()
     const preDate = new Date().getTime()

     screen.getByLabelText(/title/i).value = fakePost.title
     screen.getByLabelText(/content/i).value = fakePost.content
     screen.getByLabelText(/tags/i).value = fakePost.tags.join(', ')
     const submitButton = screen.getByText(/submit/i)

     userEvent.click(submitButton)

     expect(submitButton).toBeDisabled()

     expect(mockSavePost).toHaveBeenCalledWith({
       ...fakePost,
       date: expect.any(String),
       authorId: fakeUser.id,
     })
     expect(mockSavePost).toHaveBeenCalledTimes(1)

     const postDate = new Date().getTime()
     const date = new Date(mockSavePost.mock.calls[0][0].date).getTime()
     expect(date).toBeGreaterThanOrEqual(preDate)
     expect(date).toBeLessThanOrEqual(postDate)

     await waitFor(() =>
       expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {}),
     )
   })
   ```

   ```js
   // After
   test('renders a form with title, content, tags, and a submit button', async () => {
     mockSavePost.mockResolvedValueOnce()
     const {submitButton, fakePost, fakeUser} = renderEditor()
     const preDate = new Date().getTime()

     userEvent.click(submitButton)

     expect(submitButton).toBeDisabled()

     expect(mockSavePost).toHaveBeenCalledWith({
       ...fakePost,
       date: expect.any(String),
       authorId: fakeUser.id,
     })
     expect(mockSavePost).toHaveBeenCalledTimes(1)

     const postDate = new Date().getTime()
     const date = new Date(mockSavePost.mock.calls[0][0].date).getTime()
     expect(date).toBeGreaterThanOrEqual(preDate)
     expect(date).toBeLessThanOrEqual(postDate)

     await waitFor(() =>
       expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {}),
     )
   })
   ```

   ```js
   // Diff
   test('renders a form with title, content, tags, and a submit button', async () => {
     mockSavePost.mockResolvedValueOnce()
     // Remove - const fakeUser = userBuilder()
     // Remove - render(<Editor user={fakeUser} />)
     // Remove - const fakePost = postBuilder()
     // Add - const {submitButton, fakePost, fakeUser} = renderEditor()
     const preDate = new Date().getTime()

     // Remove - screen.getByLabelText(/title/i).value = fakePost.title
     // Remove - screen.getByLabelText(/content/i).value = fakePost.content
     // Remove - screen.getByLabelText(/tags/i).value = fakePost.tags.join(', ')
     // Remove - const submitButton = screen.getByText(/submit/i)

     // No change beyond here
     userEvent.click(submitButton)

     expect(submitButton).toBeDisabled()

     expect(mockSavePost).toHaveBeenCalledWith({
       ...fakePost,
       date: expect.any(String),
       authorId: fakeUser.id,
     })
     expect(mockSavePost).toHaveBeenCalledTimes(1)

     const postDate = new Date().getTime()
     const date = new Date(mockSavePost.mock.calls[0][0].date).getTime()
     expect(date).toBeGreaterThanOrEqual(preDate)
     expect(date).toBeLessThanOrEqual(postDate)

     await waitFor(() =>
       expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {}),
     )
   })
   ```

   It doesn't save much for one case, but it's pretty helpful to do what's
   essentially a `setup` method when you have dozens of tests

Refer to
https://testingjavascript.com/lessons/react-write-a-custom-render-function-to-share-code-between-tests-and-simplify-tests
for the video
