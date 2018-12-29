export * from 'dom-testing-library';
import {within} from 'dom-testing-library';

export const makeRender = ({patch}) => () => {
  let container = document.createElement('div');
  let rootElement = document.createElement('div');
  container.appendChild(rootElement);
  return vnode => {
    patch(rootElement, vnode);
    rootElement = vnode;
    return {
      container,
      ...within(container),
    };
  };
}