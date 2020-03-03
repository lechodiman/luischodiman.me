import React from 'react';
import renderer from 'react-test-renderer';
import { useStaticQuery, StaticQuery } from 'gatsby';
import TagTemplate from './tag-template';
import siteMetadata from '../../jest/__fixtures__/site-metadata';
import allMarkdownRemark from '../../jest/__fixtures__/all-markdown-remark';
import pageContext from '../../jest/__fixtures__/page-context';
import { RenderCallback } from '../types';

const mockedUseStaticQuery = useStaticQuery as jest.Mock;
const mockedStaticQuery = StaticQuery as jest.Mock;

describe('TagTemplate', () => {
  beforeEach(() => {
    mockedStaticQuery.mockImplementationOnce(({ render }: RenderCallback) =>
      render(siteMetadata)
    );

    mockedUseStaticQuery.mockReturnValue(siteMetadata);
  });

  const props = {
    data: allMarkdownRemark,
    pageContext,
  };

  it('renders correctly', () => {
    const tree = renderer.create(<TagTemplate {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
