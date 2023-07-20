1. In addition to being able to mock the response once, which I didn't realise
   inherently means you intend the promise to resolve, you can mark your
   intention to make the promise reject instead with `mockRejectedValueOnce`.
   For example

   ```js
   mockSavePost.mockRejectedValueOnce({data: {error: 'test error'}})
   ```

   Then in `src/post-editor-07-error-state.js` you need to handle the rejection

   ```js
   function Editor({user}) {
       // Rest of the component is untouched, I've just cut it from the example

       const [error, setError] = React.useState(null)
       function handleSubmit(e) {
           // Rest of the handleSubmit method is untouched. Just adding in the reject parameter

           savePost(newPost).then(
               () => setRedirect(true),
               (response) => {
                   setIsSaving(false)
                   setError(response.data.error)
               },
           )
       }

       return (
           <button type="submit" disabled={isSaving}>
               Submit
           </button>
           {error ? <div role="alert">{error}</div> : null}
       )
   }
   ```

Refer to
https://testingjavascript.com/lessons/react-test-drive-error-state-with-react-testing-library
for the video
