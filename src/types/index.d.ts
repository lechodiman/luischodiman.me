import React from 'react';

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
  };
  frontmatter: {
    date: string;
    description?: string;
    category?: string;
    tags?: string[];
    title: string;
    socialImage?: string;
  };
  html: string;
  id: string;
};

type Edge = {
  node: Node;
};

type Edges = Array<Edge>;

type AllMarkdownRemark = {
  allMarkdownRemark: {
    edges: Edges;
  };
  group: {
    fieldValue: string;
    totalCount: number;
  }[];
};

type MarkdownRemark = Node;
