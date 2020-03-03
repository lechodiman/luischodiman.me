import React from 'react';
import renderer from 'react-test-renderer';
import { useStaticQuery, StaticQuery } from 'gatsby';
import NotFoundTemplate from './not-found-template';
import siteMetadata from '../../jest/__fixtures__/site-metadata';
import { RenderCallback } from '../types';

const mockedUseStaticQuery = useStaticQuery as jest.Mock;
const mockedStaticQuery = StaticQuery as jest.Mock;

describe('NotFoundTemplate', () => {
  beforeEach(() => {
    mockedStaticQuery.mockImplementationOnce(({ render }: RenderCallback) =>
      render(siteMetadata)
    );
    mockedUseStaticQuery.mockReturnValue(siteMetadata);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<NotFoundTemplate />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
