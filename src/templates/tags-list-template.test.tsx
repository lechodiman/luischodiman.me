import React from 'react';
import renderer from 'react-test-renderer';
import { useStaticQuery, StaticQuery } from 'gatsby';
import TagsListTemplate from './tags-list-template';
import siteMetadata from '../../jest/__fixtures__/site-metadata';
import allMarkdownRemark from '../../jest/__fixtures__/all-markdown-remark';
import { RenderCallback } from '../types';

const mockedUseStaticQuery = useStaticQuery as jest.Mock;
const mockedStaticQuery = StaticQuery as jest.Mock;

describe('TagsListTemplate', () => {
  const props = {
    ...siteMetadata,
    ...allMarkdownRemark,
  };

  beforeEach(() => {
    mockedStaticQuery.mockImplementationOnce(({ render }: RenderCallback) =>
      render(props)
    );
    mockedUseStaticQuery.mockReturnValue(props);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<TagsListTemplate />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
