1. This lesson covers mocking external http requests! The good stuff! There is a
   mention on wrapping things in `act()`, but I've seen other jest tests in
   `Node` returning `Promise.resolve()` to instead return things immediately
   instead of the next `"tick"`, which is what Kent is saying is the reason
   behind needing to use `act()`. We'll see where this goes...
1. Ok that took a turn. He didn't cover `act()` at in the end. Instead, he
   suggested the usage of `wait` from RTL. He didn't explain the internals of
   this, but it's good to know that we don't always have to use `act()`.
   Referring to `src/__tests__/http-jest-mock.js`

   ```js
   import * as React from 'react'
   import {render, screen, waitFor} from '@testing-library/react'
   import userEvent from '@testing-library/user-event'
   import {loadGreeting as mockLoadGreeting} from '../api'
   import {GreetingLoader} from '../greeting-loader-01-mocking'

   jest.mock('../api')

   test('loads greetings on click', async () => {
     const testGreeting = 'TEST_GREETING'
     mockLoadGreeting.mockResolvedValueOnce({data: {greeting: testGreeting}})
     render(<GreetingLoader />)
     const nameInput = screen.getByLabelText(/name/i)
     const loadButton = screen.getByText(/load/i)
     userEvent.type(nameInput, 'Mary')
     userEvent.click(loadButton)
     expect(mockLoadGreeting).toHaveBeenCalledWith('Mary')
     expect(mockLoadGreeting).toHaveBeenCalledTimes(1)
     await waitFor(() =>
       expect(screen.getByLabelText(/greeting/i)).toHaveTextContent(
         testGreeting,
       ),
     )
   })
   ```

1. Note that the video is old, so it's interesting to note that the code here
   actually has `waitFor` even though the video referred to it as `wait`. I'm
   assuming it's `waitFor` now as it's easier to update your codebase than it is
   to update published videos
1. Note that there was also a file the uses mock service worker, so I guess
   we'll get to that soon, too.
1. Interesting to note though that the challenges in testing react arise from
   the fact we're synchronously testing asynchronous code, so `waitFor` will be
   perfect for that. As in once an api responds, mocked or not, eventually the
   components will be rerendered. In Cypress I've seen a lot of things waiting
   on changes that might take up to 30s. Ideally we wouldn't want this at all,
   and to mock our outgoing requests in such a way that it's done instantly

Refer to
https://testingjavascript.com/lessons/react-mock-http-requests-with-jest-mock-in-react-component-tests
for the video
