import React from 'react';
import renderer from 'react-test-renderer';
import { useStaticQuery } from 'gatsby';
import siteMetadata from '../../../jest/__fixtures__/site-metadata';
import Layout from './Layout';

const mockedUseStaticQuery = useStaticQuery as jest.Mock;

describe('Layout', () => {
  const props = {
    description: 'test',
    title: 'test',
  };

  beforeEach(() => {
    mockedUseStaticQuery.mockReturnValue(siteMetadata);
  });

  it('renders correctly', () => {
    const children = 'test';
    const tree = renderer
      .create(<Layout {...props}>{children}</Layout>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
