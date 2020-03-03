import React from 'react';
import renderer from 'react-test-renderer';
import { useStaticQuery, StaticQuery } from 'gatsby';
import PostTemplate from './post-template';
import siteMetadata from '../../jest/__fixtures__/site-metadata';
import markdownRemark from '../../jest/__fixtures__/markdown-remark';
import { RenderCallback } from '../types';

const mockedUseStaticQuery = useStaticQuery as jest.Mock;
const mockedStaticQuery = StaticQuery as jest.Mock;

describe('PostTemplate', () => {
  const props = {
    data: {
      ...markdownRemark,
    },
  };

  beforeEach(() => {
    mockedStaticQuery.mockImplementationOnce(({ render }: RenderCallback) =>
      render(siteMetadata)
    );
    mockedUseStaticQuery.mockReturnValue(siteMetadata);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<PostTemplate {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
