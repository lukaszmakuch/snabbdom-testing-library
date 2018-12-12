import {h, patch} from './../test-utils/vdom';
import {makeRender, fireEvent, queryByText} from './../src';
import sinon from 'sinon';

const render = makeRender({patch});

test('clicking buttons', () => {
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
});