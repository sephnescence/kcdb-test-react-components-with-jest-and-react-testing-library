1. Alright! Straight on to `Mock Service Worker`! This is really neat, and with
   the power of GraphQL / Apollo or tRPC (Typescript Remote Procedure Call), we
   can mock out an api response, and the tests will fail if the types change, so
   we have protection so long as we are able to run codegen. If it's a third
   party, then at least you can still do a best guess kind of thing. And if
   you've got frontend engineers working on the frontend while you develop the
   backend, or vice versa, it's possible to make a contract ahead of time
   instead of having to wait for the endpoint to be made for real, which has
   been a huge bottleneck in the past
1. So to begin, we can refer to `src/__tests__/http-msw-mock.js`

   ```js
   import 'whatwg-fetch'
   import * as React from 'react'
   import {render, screen, waitFor} from '@testing-library/react'
   import userEvent from '@testing-library/user-event'
   import {rest} from 'msw'
   import {setupServer} from 'msw/node'
   import {GreetingLoader} from '../greeting-loader-01-mocking'

   const server = setupServer(
     rest.post('/greeting', (req, res, ctx) => {
       return res(ctx.json({data: {greeting: `Hello ${req.body.subject}`}}))
     }),
   )

   beforeAll(() => server.listen({onUnhandledRequest: 'error'}))
   afterAll(() => server.close())
   afterEach(() => server.resetHandlers())

   test('loads greetings on click', async () => {
     render(<GreetingLoader />)
     const nameInput = screen.getByLabelText(/name/i)
     const loadButton = screen.getByText(/load/i)
     userEvent.type(nameInput, 'Mary')
     userEvent.click(loadButton)
     await waitFor(() =>
       expect(screen.getByLabelText(/greeting/i)).toHaveTextContent(
         'Hello Mary',
       ),
     )
   })
   ```

1. Note that `beforeAll(() => server.listen({onUnhandledRequest: 'error'}))`
   will prevent all other requests from working if they're inadvertently called.
   So that should also capture outbound requests to flag services like config
   cat, or calls the component might make in the future that weren't expected

Refer to https://testingjavascript.com/lessons/react-mock-http-requests-with-msw
for the video
