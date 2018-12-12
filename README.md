# snabbdom-testing-library

A tiny tool to test [snabbdom](https://github.com/snabbdom/snabbdom) virtual DOM nodes using [dom-testing-library](https://github.com/kentcdodds/dom-testing-library#using-without-jest).

## The Snippet

```javascript
import {h, patch} from './my-snabbdom-configuration';
import {makeRender, fireEvent, queryByText} from 'snabbdom-testing-library';
import sinon from 'sinon';

const btn1OnClick = sinon.fake();
const btn2OnClick = sinon.fake();

const vnode = h('div', [
  h('button', {
    on: {click: btn1OnClick}
  }, '1st'),
  h('button', {
    on: {click: btn2OnClick}
  }, '2nd'),
]);

const {getByText, container} = render(vnode);

const btn1 = getByText('1st');
const btn2 = queryByText(container, /2/);

expect(btn1OnClick.called).toBeFalsy();
expect(btn2OnClick.called).toBeFalsy();

fireEvent.click(btn1);

expect(btn1OnClick.calledOnce).toBeTruthy();
expect(btn2OnClick.called).toBeFalsy();

fireEvent.click(btn2);

expect(btn1OnClick.calledOnce).toBeTruthy();
expect(btn2OnClick.calledOnce).toBeTruthy();
```

## Running without jest

You may need [jsdom-global](https://github.com/rstacruz/jsdom-global).