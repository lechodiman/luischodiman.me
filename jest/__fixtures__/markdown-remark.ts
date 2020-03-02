import { MarkdownRemark } from '../../src/types';
import { FluidObject } from 'gatsby-image';

const markdownRemark: { markdownRemark: MarkdownRemark } = {
  markdownRemark: {
    id: 'test-123',
    html: '<p>test</p>',
    fields: {
      slug: 'test',
      tagSlugs: ['/test_0', '/test_1'],
    },
    frontmatter: {
      date: '2016-09-01',
      description: 'test',
      title: 'test',
      tags: ['test_0', 'test_1'],
      socialImage: {
        sharp: {
          original: {
            src: 'test',
          },
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

export default markdownRemark;
