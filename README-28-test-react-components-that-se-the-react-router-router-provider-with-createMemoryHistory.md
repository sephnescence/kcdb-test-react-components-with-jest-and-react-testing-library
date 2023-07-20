1. Next up, Kent wants us to to use createMemoryHistory to test the Main
   component to ensure that it shows the correct page based on what page the
   user is on. So referring to `src/main.js` and
   `src/__tests__/react-router-01.js`... Except we won't, because there's no
   code references to `createMemoryHistory` at all. Kent is instead using
   `BrowserRouter` and somehow has access to `window.pushState`... I guess that
   just shows we can use both

Refer to
https://testingjavascript.com/lessons/react-test-react-components-that-use-the-react-router-router-provider-with-creatememoryhistory-69d5f9ed
for the video
