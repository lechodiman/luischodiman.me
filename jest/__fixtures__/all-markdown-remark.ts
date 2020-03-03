import { AllMarkdownRemark } from '../../src/types';

const allMarkdownRemark: AllMarkdownRemark = {
  allMarkdownRemark: {
    group: [
      {
        fieldValue: 'test_0',
        totalCount: 1,
      },
      {
        fieldValue: 'test_1',
        totalCount: 2,
      },
    ],
    edges: [
      {
        node: {
          fields: {
            slug: '/test_0',
            categorySlug: '/test',
          },
          frontmatter: {
            date: '2016-09-01',
            description: 'test_0',
            category: 'test',
            title: 'test_0',
          },
          html: 'test',
        },
      },
      {
        node: {
          fields: {
            slug: '/test_1',
            categorySlug: '/test',
          },
          frontmatter: {
            date: '2016-09-01',
            description: 'test_1',
            category: 'test',
            title: 'test_1',
          },
          html: 'test',
        },
      },
    ],
  },
};

export default allMarkdownRemark;
