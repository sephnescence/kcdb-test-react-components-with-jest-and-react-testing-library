1. Dates suck, let's be real. I think the example given in this course was also
   kinda weak. Kent wanted to mock the date that the post got saved with by
   calling `new Date()` fell between prior to calling the POST request and
   before the POST request got returned. I would have expected just using a
   fixed date or setting the time the tests are running at in the test suite.
   Other assertions are made by spreading `fakePost` but I can understand that
   the createPost call wouldn't expect the date, even though it allows for the
   id to be provided. It's a bit inconsistent in my opinion
1. Referring to `src/__tests__/tdd-05-dates.js` and
   `src/post-editor-05-dates.js`

   ```js
   const preDate = new Date().getTime()

   expect(mockSavePost).toHaveBeenCalledWith({
     ...fakePost,
     date: expect.any(String),
     authorId: fakeUser.id,
   })

   const postDate = new Date().getTime()
   const date = new Date(mockSavePost.mock.calls[0][0].date).getTime()
   expect(date).toBeGreaterThanOrEqual(preDate)
   expect(date).toBeLessThanOrEqual(postDate)
   ```

   This seems like a stretch to me. There must be something better but I won't
   look at it just yet

Refer to
https://testingjavascript.com/lessons/react-test-drive-assertions-with-dates-in-react
for the video
