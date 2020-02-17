import React from 'react';
import renderer from 'react-test-renderer';
import { useStaticQuery, StaticQuery } from 'gatsby';
import Sidebar from './Sidebar';
import siteMetadata from '../../../jest/__fixtures__/site-metadata';
import { RenderCallback } from '../../types';

describe('Sidebar', () => {
  beforeEach(() => {
    (StaticQuery as jest.Mock).mockImplementationOnce(
      ({ render }: RenderCallback) => render(siteMetadata)
    );
    (useStaticQuery as jest.Mock).mockReturnValue(siteMetadata);
  });

  const props = {
    isIndex: true,
  };

  it('renders correctly', () => {
    const tree = renderer.create(<Sidebar {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
