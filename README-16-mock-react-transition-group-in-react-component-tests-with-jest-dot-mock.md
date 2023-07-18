1. Referring to `src/__tests__/mock-component.js`, Kent's sentiment here is that
   we can mock stuff out if we have have to wait for something. In this case,
   he'd prefer to not make the test wait a second for the CSS transition to
   finish, so he just mocks the transition to return instantly
   ```js
   jest.mock('react-transition-group', () => {
     return {
       CSSTransition: (props) => (props.in ? props.children : null),
     }
   })
   ```
1. I think this thinking could be powerful when using hooks, but I feel like
   that will be covered later, but in the meantime I'll put my thoughts down

- If we're making a god hook, or a hook that needs to load various things, and
  has internal state like loading, error, data, etc., we can likely render the
  component in a loading state, ensure the skeleton is there, mock the hook to
  return an error instead and ensure that the Error Boundary shows up by calling
  rerender on the component maybe, and the same again for when the hook returns
  data, ensuring the component renders with the data we expect. I hope this is
  something that can be done

Refer to
https://testingjavascript.com/lessons/react-mock-react-transition-group-in-react-component-tests-with-jest-mock
for the video
