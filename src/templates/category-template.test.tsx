import React from 'react';
import renderer from 'react-test-renderer';
import { useStaticQuery, StaticQuery } from 'gatsby';
import CategoryTemplate from './category-template';
import siteMetadata from '../../jest/__fixtures__/site-metadata';
import allMarkdownRemark from '../../jest/__fixtures__/all-markdown-remark';
import pageContext from '../../jest/__fixtures__/page-context';
import { RenderCallback } from '../types';

const mockedUseStaticQuery = useStaticQuery as jest.Mock;
const mockedStaticQuery = StaticQuery as jest.Mock;

describe('CategoryTemplate', () => {
  const props = {
    data: allMarkdownRemark,
    pageContext,
  };

  beforeEach(() => {
    mockedStaticQuery.mockImplementationOnce(({ render }: RenderCallback) =>
      render(siteMetadata)
    );
    mockedUseStaticQuery.mockReturnValue(siteMetadata);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<CategoryTemplate {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
