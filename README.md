# snabbdom-testing-library

A tiny tool to test [Snabbdom](https://github.com/snabbdom/snabbdom) virtual DOM nodes using [dom-testing-library](https://github.com/kentcdodds/dom-testing-library).

```
npm i snabbdom-testing-library --save-dev
```

## The Snippet

```javascript
// The Snabbdom helper function *h* that creates VDOM nodes
// and the *patch* function that applies VDOM nodes to a container. 
// The Snabbdom documentation shows how to configure these two functions.
import {h, patch} from './my-snabbdom-configuration';

// Only the *makeRender* is a *snabbdom-testing-library* specific function.
// It creates a *render* function that renders VDOM nodes.
// It's stateful and works exactly like a real Snabbdom client code, that is
// the first call applies the given VDOM node to a new DIV element,
// while the succeeding calls apply VDOM nodes to the previous VDOM nodes.
// The rest of the exported functions are functions from *dom-testing-library*.
import {makeRender, fireEvent, queryByText} from 'snabbdom-testing-library';
// In this example we are using Sinon test doubles to test event handlers.
import sinon from 'sinon';

// The test *render* function is created based on our own configuration
// of the *patch* function. That way we may use any modules we want.
const render = makeRender({patch});

// Test doubles of event handlers.
const btn1OnClick = sinon.fake();
const btn2OnClick = sinon.fake();

// A div with two buttons.
const vnode = h('div', [
  h('button', {
    on: {click: btn1OnClick}
  }, '1st'),
  h('button', {
    on: {click: btn2OnClick}
  }, '2nd'),
]);

// *container* is the DOM element where the given VDOM node is rendered.
// *getByText* is the *dom-testing-library* query function scoped to the *container*,
// so that we don't need to pass it the *container* every single time.
const {getByText, container} = render(vnode);

// This will get the first button within the *container*.
// Please notice this *getByText* function comes from the *render* function call.
const btn1 = getByText('1st');

// This will get the second button within the *container*.
// Plese notice this *queryByText* function 
// is imported from *snabbdom-testing-library* 
// and is not scoped to the *container*.
const btn2 = queryByText(container, /2/);

// None of the buttons has been clicked.
expect(btn1OnClick.called).toBeFalsy();
expect(btn2OnClick.called).toBeFalsy();

// A simulated click.
fireEvent.click(btn1);

// Just the first button has been clicked.
expect(btn1OnClick.calledOnce).toBeTruthy();
expect(btn2OnClick.called).toBeFalsy();

// Another simulated click.
fireEvent.click(btn2);

// Both of the buttons have already been clicked.
expect(btn1OnClick.calledOnce).toBeTruthy();
expect(btn2OnClick.calledOnce).toBeTruthy();
```

## More about testing

Because this library is nothing but a tiny wrapper around [dom-testing-library](https://github.com/kentcdodds/dom-testing-library), please refer to its documentation.

Valuable resources may also be found in the README of the [react-testing-library](https://github.com/kentcdodds/react-testing-library) library.

## Running without Jest

You may need [jsdom-global](https://github.com/rstacruz/jsdom-global).