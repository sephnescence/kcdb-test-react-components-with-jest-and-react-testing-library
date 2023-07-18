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

1. As it turns out, if we were to call `rerender` on the Error Boundary with the
   Bomb's throw prop set to false, the Error Boundary still thinks it's in an
   error state. That could probably be solved by exposing a forward ref, but
   Kent didn't go over that, and it makes enough sense to not make something
   like that just so your test can access the state. Instead, Kent heavily
   subscribes to having your tests do what you'd expect a user to do. In this
   case, the Error Boundary has a `try again?` button, so we should just click
   that. If you refer to `src/error-boundary.js`, you can see that clicking this
   button will clear the error state. We've done this before with `userEvent`
   from `@testing-library/user-event`

```js
userEvent.click(screen.getByText(/try again/i))
```

1. Further to that, we can test that the Error Boundary showed up before and has
   disappeared now. Referring to `src/__tests__/error-boundary-03.js`

```js
rerender(
  <ErrorBoundary>
    <Bomb shouldThrow={true} />
  </ErrorBoundary>,
)

const error = expect.any(Error)
const info = {componentStack: expect.stringContaining('Bomb')}
expect(mockReportError).toHaveBeenCalledWith(error, info)
expect(mockReportError).toHaveBeenCalledTimes(1)

expect(console.error).toHaveBeenCalledTimes(2)

expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
  `"There was a problem."`,
)

console.error.mockClear()
mockReportError.mockClear()

rerender(
  <ErrorBoundary>
    <Bomb />
  </ErrorBoundary>,
)

userEvent.click(screen.getByText(/try again/i))

expect(mockReportError).not.toHaveBeenCalled()
expect(console.error).not.toHaveBeenCalled()
expect(screen.queryByRole('alert')).not.toBeInTheDocument()
expect(screen.queryByText(/try again/i)).not.toBeInTheDocument()
```

Then you can also call `expect(console.error).toHaveBeenCalledTimes(2)`

Refer to
https://testingjavascript.com/lessons/react-test-componentdidcatch-handler-error-boundaries-with-react-testing-library
for the video
