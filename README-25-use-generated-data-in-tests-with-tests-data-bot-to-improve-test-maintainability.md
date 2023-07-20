1. Kent suggests using `build`, `fake`, `sequence` from `test-data-bot` (an npm
   package) in order to show what's actually important to the test. i.e. if it's
   being faked, then it's not important to the test. That's a sentiment I can
   kind of get behind, but at the very least, this lesson serves as a good
   reference to how these work
1. Referring to `src/__tests__/tdd-05-generate-data.js` (before) and
   `src/__tests__/tdd-06-generate-data.js` (after) to see the difference  
   Before
   ```js
   const fakeUser = {id: 'user-1'}
   const fakePost = {
     title: 'Test Title',
     content: 'Test content',
     tags: ['tag1', 'tag2'],
   }
   ```
   After
   ```js
   const userBuilder = build('User').fields({
     id: sequence((s) => `user-${s}`),
   })
   const postBuilder = build('Post').fields({
     title: fake((f) => f.lorem.words()),
     content: fake((f) => f.lorem.paragraphs().replace(/\r/g, '')),
     tags: fake((f) => [f.lorem.word(), f.lorem.word(), f.lorem.word()]),
   })
   const fakeUser = userBuilder() // These builders accepts an object override parameter. e.g. you can provide an id to user anyways
   const fakePost = postBuilder({title: 'Test Title'}) // For example, override the title of a Post
   ```

Refer to
https://testingjavascript.com/lessons/react-use-generated-data-in-tests-with-tests-data-bot-to-improve-test-maintainability-ba3445b2
to see the video
