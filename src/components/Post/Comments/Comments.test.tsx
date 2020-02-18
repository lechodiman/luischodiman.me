import React from 'react';
import renderer from 'react-test-renderer';
import { useStaticQuery } from 'gatsby';
import Comments from './Comments';
import siteMetadata from '../../../../jest/__fixtures__/site-metadata';

const mockedUseStaticQuery = useStaticQuery as jest.Mock;

describe('Comments', () => {
  beforeEach(() => {
    mockedUseStaticQuery.mockReturnValue(siteMetadata);
  });

  const props = {
    postTitle: 'test',
    postSlug: '/test',
  };

  it('renders correctly', () => {
    const tree = renderer.create(<Comments {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
