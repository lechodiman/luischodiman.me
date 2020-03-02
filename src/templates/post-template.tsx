import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Post from '../components/Post';
import { useSiteMetadata } from '../hooks';
import { MarkdownRemark } from '../types';
import Image from 'gatsby-image';

type Props = {
  data: {
    markdownRemark: MarkdownRemark;
  };
};

const PostTemplate: React.FC<Props> = ({ data }) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const { frontmatter } = data.markdownRemark;
  const {
    title: postTitle,
    description: postDescription,
    socialImage,
  } = frontmatter;
  const metaDescription =
    postDescription !== null ? postDescription : siteSubtitle;

  return (
    <Layout
      title={`${postTitle} - ${siteTitle}`}
      description={metaDescription}
      socialImage={socialImage.sharp.original.src}
    >
      <Image
        fluid={data.markdownRemark.frontmatter.socialImage.sharp.fluid}
        alt={postTitle}
      ></Image>
      <Post post={data.markdownRemark} />
    </Layout>
  );
};

export const query = graphql`
  query PostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
        tagSlugs
        editLink
      }
      frontmatter {
        date
        description
        tags
        title
        socialImage {
          sharp: childImageSharp {
            original {
              src
            }
            fluid(maxWidth: 720, maxHeight: 720) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        socialImageCredit
      }
    }
  }
`;

export default PostTemplate;
