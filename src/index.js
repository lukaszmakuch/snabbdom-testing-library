export * from 'dom-testing-library';
import {within} from 'dom-testing-library';

export const makeRender = ({patch}) => vnode => {
  let container = document.createElement('div');
  let rootElement = document.createElement('div');
  container.appendChild(rootElement);
  patch(rootElement, vnode);
  return {
    container,
    ...within(container),
  };
};