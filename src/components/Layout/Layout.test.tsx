import React from 'react';
import renderer from 'react-test-renderer';
import { useStaticQuery, StaticQuery } from 'gatsby';
import siteMetadata from '../../../jest/__fixtures__/site-metadata';
import Layout from './Layout';
import { RenderCallback } from '../../types';

describe('Layout', () => {
  const props = {
    ...siteMetadata,
    children: 'test',
    description: 'test',
    title: 'test',
  };

  beforeEach(() => {
    (StaticQuery as jest.Mock).mockImplementationOnce(
      ({ render }: RenderCallback) => render(props)
    );
    (useStaticQuery as jest.Mock).mockReturnValue(props);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<Layout {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
