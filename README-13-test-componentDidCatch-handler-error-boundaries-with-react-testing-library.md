1. Referring to `src/__tests__/error-boundary-01.js`, Kent can be seen defining
   new Functional Component in the test itself in order to test the
   functionality of other components. In this case, he's testing the error
   boundary by creating a Functional Component that takes a prop to specify
   whether it will blow up or not. Aptly named, Bomb lol. The resulting thrown
   Error should be caught by the Error Boundary
1. Since most Error Boundaries will be hooked up to notify some external
   service, Kent has chosen to mock the `reportError` method in `../api`

   ```js
   import {reportError as mockReportError} from '../api'
   ```

   Note that when importing it, he renames it to be prefixed with mock so that
   it's clearly labelled as a mock

   ```js
   jest.mock('../api')

   afterEach(() => {
     jest.clearAllMocks()
   })
   ```

   Kent mocks `../api`, which by itself does nothing. We're only interested in
   `reportError`, so we call
   `mockReportError.mockResolvedValueOnce({success: true})` which will override
   only one call to it. That can be seen below. Kent also suggests that you just
   call `jest.clearAllMocks()` in the `afterEach` method so that your mocks
   don't bleed into other tests

   ```js
   test('calls reportError and renders that there was a problem', () => {
     mockReportError.mockResolvedValueOnce({success: true})
     const {rerender} = render(
       <ErrorBoundary>
         <Bomb />
       </ErrorBoundary>,
     )

     rerender(
       <ErrorBoundary>
         <Bomb shouldThrow={true} />
       </ErrorBoundary>,
     )

     const error = expect.any(Error)
     const info = {componentStack: expect.stringContaining('Bomb')}
     expect(mockReportError).toHaveBeenCalledWith(error, info)
     expect(mockReportError).toHaveBeenCalledTimes(1)
   })
   ```

   So essentially what's happening here is that Bomb gets rendered the first
   time without the `shouldThrow` prop set to true. When rerendering it _with_
   the prop set to true, we will expect the Error Boundary to have been called

1. We get console logs and component stack traces in our terminal still. We can
   refer to `src/__tests__/error-boundary-01.js` to see how Kent alleviates this

```js
beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  console.error.mockRestore()
})
```

Then you can also call `expect(console.error).toHaveBeenCalledTimes(2)`

Refer to
https://testingjavascript.com/lessons/react-test-componentdidcatch-handler-error-boundaries-with-react-testing-library
for the video
