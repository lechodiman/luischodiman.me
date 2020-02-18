import React from 'react';
import renderer from 'react-test-renderer';
import Page from './Page';

describe('Page', () => {
  const props = {
    title: 'test',
  };

  it('renders correctly', () => {
    const children = 'test';
    const tree = renderer.create(<Page {...props}>{children}</Page>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
