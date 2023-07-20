1. Note that apparently at some point, Kent updated the course to point to
   `https://github.com/kentcdodds/react-testing-library-course/blob/tjs/src/__tests__/react-router-03.js`
   instead, which DOES have `createMemoryHistoryUsage`. For example...

```js
const memoryHistory = createMemoryHistory({initialEntries: ['/']}),
```

Historical entries from here on...

1. Next up, Kent wants us to to use createMemoryHistory to test the Main
   component to ensure that it shows the correct page based on what page the
   user is on. So referring to `src/main.js` and
   `src/__tests__/react-router-01.js`... Except we won't, because there's no
   code references to `createMemoryHistory` at all. Kent is instead using
   `BrowserRouter` and somehow has access to `window.pushState`... I guess that
   just shows we can use both
1. When you use a router, your last child component should be the "no match"
   link. So a 404 usually. To test this, just add a non working route to either
   `createMemoryHistory` or `window.pushState`. Referring to `src/main.js`

```js
function Main() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  )
}
```

1. Note that `Switch` comes from `react-router-dom`, which is where
   `BrowserRouter` comes from too. So I think originally Kent was looking to
   wrap Main inside of a fake router without mocking it per se? :shrug:

Refer to
https://testingjavascript.com/lessons/react-test-react-components-that-use-the-react-router-router-provider-with-creatememoryhistory-69d5f9ed
for the first video

Refer to
https://testingjavascript.com/lessons/react-initialize-the-history-object-with-a-bad-entry-to-test-the-react-router-no-match-route
for the second video

Refer to
https://testingjavascript.com/lessons/react-create-a-custom-render-function-to-simplify-tests-of-react-router-components-2572008e
for the third video
