import React from 'react';
import renderer from 'react-test-renderer';
import { useStaticQuery, StaticQuery } from 'gatsby';
import Author from './Author';
import siteMetadata from '../../../../jest/__fixtures__/site-metadata';

const mockedUseStaticQuery = useStaticQuery as jest.Mock;

describe('Author', () => {
  beforeEach(() => {
    mockedUseStaticQuery.mockReturnValue(siteMetadata);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<Author />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
