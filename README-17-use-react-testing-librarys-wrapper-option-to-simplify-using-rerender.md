1. Building upon
   `README-13-test-componentDidCatch-handler-error-boundaries-with-react-testing-library.md`,
   there is an additional parameter we can provide to RTL's `render` call. So in
   the case of `src/__tests__/error-boundary-03.js` =>
   `src/__tests__/error-boundary-04.js`, you can see that all the usages of
   `<ErrorBoundary>` have been replaced with the one reference to it in the
   `wrapper` property of the second argument provided to `render`

   ```js
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
   ```

   to

   ```js
   const {rerender} = render(<Bomb />, {wrapper: ErrorBoundary})

   rerender(<Bomb shouldThrow={true} />)
   ```

1. I think this comes in handy, and leans into something I've seen Kent
   introduce later, `renderWithProviders`. I guess more will be shown later, but
   it's a way to wrap the component you're testing in a giant mock that's only
   defined in one location so you don't have to worry about it

Refer to
https://testingjavascript.com/lessons/react-use-react-testing-library-s-wrapper-option-to-simplify-using-rerender
to see the video
