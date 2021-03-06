import React from 'react';
import renderer from 'react-test-renderer';
import { useStaticQuery, StaticQuery } from 'gatsby';
import Post from './Post';
import siteMetadata from '../../../jest/__fixtures__/site-metadata';
import { RenderCallback } from '../../types';

const mockedUseStaticQuery = useStaticQuery as jest.Mock;
const mockedStaticQuery = StaticQuery as jest.Mock;

describe('Post', () => {
  beforeEach(() => {
    mockedStaticQuery.mockImplementationOnce(({ render }: RenderCallback) =>
      render(siteMetadata)
    );
    mockedUseStaticQuery.mockReturnValue(siteMetadata);
  });

  const props = {
    post: {
      id: 'test-123',
      html: '<p>test</p>',
      fields: {
        slug: '/test',
        categorySlug: '/test-category',
        tagSlugs: ['/test_0', '/test_1'],
      },
      frontmatter: {
        date: '2016-09-01',
        tags: ['test_0', 'test_1'],
        title: 'test',
        socialImage: {
          sharp: {
            fluid: {
              aspectRatio: 0,
              src: 'test',
              srcSet: 'test',
              sizes: 'test',
            },
          },
        },
        socialImageCredit: 'test',
      },
    },
  };

  it('renders correctly', () => {
    const tree = renderer.create(<Post {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
