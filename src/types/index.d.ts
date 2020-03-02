import React from 'react';
import { FluidObject } from 'gatsby-image';

type RenderCallback = {
  render: (data: any) => React.ReactNode;
};

type Entry = {
  getIn: (data: string[]) => string;
};

type WidgetFor = (data: string) => string;

type PageContext = {
  tag: string;
  category: string;
  currentPage: number;
  prevPagePath: string;
  nextPagePath: string;
  hasPrevPage: boolean;
  hasNextPage: boolean;
};

type Node = {
  fields: {
    slug: string;
    categorySlug?: string;
    tagSlugs?: string[];
    editLink?: string;
  };
  frontmatter: {
    date: string;
    description?: string;
    category?: string;
    tags?: string[];
    title: string;
    socialImage: {
      sharp: {
        original: {
          src: string;
        };
        fluid: FluidObject;
      };
    };
    socialImageCredit: string;
  };
  html: string;
  id?: string;
};

type Edge = {
  node: Node;
};

type Edges = Edge[];

type AllMarkdownRemark = {
  allMarkdownRemark: {
    group: {
      fieldValue: string;
      totalCount: number;
    }[];
    edges: Edges;
  };
};

type MarkdownRemark = Node;
