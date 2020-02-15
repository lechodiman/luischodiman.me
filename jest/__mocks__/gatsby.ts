import React from 'react';
import gatsby from 'gatsby';

export default {
  ...gatsby,
  graphql: jest.fn(),
  Link: jest
    .fn()
    .mockImplementation(
      ({
        activeClassName,
        activeStyle,
        getProps,
        innerRef,
        ref,
        replace,
        to,
        ...rest
      }) =>
        React.createElement('a', {
          ...rest,
          href: to
        })
    ),
  StaticQuery: jest.fn(),
  useStaticQuery: jest.fn()
};
