import React from 'react';
import renderer from 'react-test-renderer';
import { useStaticQuery, StaticQuery } from 'gatsby';
import Sidebar from './Sidebar';
import siteMetadata from '../../../jest/__fixtures__/site-metadata';
import { RenderCallback } from '../../types';

const mockedUseStaticQuery = useStaticQuery as jest.Mock;
const mockedStaticQuery = StaticQuery as jest.Mock;

describe('Sidebar', () => {
  beforeEach(() => {
    mockedStaticQuery.mockImplementationOnce(({ render }: RenderCallback) =>
      render(siteMetadata)
    );
    mockedUseStaticQuery.mockReturnValue(siteMetadata);
  });

  const props = {
    isIndex: true,
  };

  it('renders correctly', () => {
    const tree = renderer.create(<Sidebar {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
