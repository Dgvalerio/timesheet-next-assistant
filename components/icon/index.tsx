import React, { FC } from 'react';

import Key from './key';
import SignIn from './signin';
import User from './user';

// Fonts searched in https://iconmonstr.com/

export type IconProps = { size?: number; width?: number; height?: number };

export const IconWrapper: FC<IconProps> = ({
  children,
  size,
  height,
  width,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || width}
    height={size || height}
    viewBox="0 0 24 24"
  >
    {children}
  </svg>
);

IconWrapper.defaultProps = {
  size: 16,
  width: 16,
  height: 16,
};

type IconType = {
  Key: FC<IconProps>;
  SignIn: FC<IconProps>;
  User: FC<IconProps>;
};

const Index: IconType = { Key, SignIn, User };

export default Index;
