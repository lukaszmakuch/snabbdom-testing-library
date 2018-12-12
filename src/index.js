export * from 'dom-testing-library';
import {within} from 'dom-testing-library';

export const makeRender = ({patch}) => vnode => {
  const container = document.createElement('div');
  patch(container, vnode);
  return {
    container,
    ...within(container),
  };
};