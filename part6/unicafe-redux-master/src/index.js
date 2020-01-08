import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import reducer from "./reducer";

// Implement the reducer and it's tests.
// In the tests, make sure that the reducer is an immutable function with the deep-freeze-library.
// Ensure that the provided first test passes, because Redux expects that the reducer returns a sensible original state
// when it is called so that the first parameter state, which represents the previous state, is undefined.
// Start by expanding the reducer so that both tests pass. Then add the rest of the tests, and finally the functionality which they are testing.
// A good model for the reducer is the redux-notes example above.

const store = createStore(reducer);

const App = () => {
  const good = () => {
    store.dispatch({
      type: "GOOD"
    });
  };
  const neutral = () => {
    store.dispatch({
      type: "OK"
    });
  };
  const bad = () => {
    store.dispatch({
      type: "BAD"
    });
  };
  const zero = () => {
    store.dispatch({
      type: "ZERO"
    });
  };

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={neutral}>neutral</button>
      <button onClick={bad}>bad</button>
      <button onClick={zero}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);
