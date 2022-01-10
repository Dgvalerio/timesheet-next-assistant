import React, { FC } from 'react';

import ArrowRight from './arrow-right';
import History from './history';
import Key from './key';
import Message from './message';
import SignIn from './signin';
import Speedometer from './speedometer';
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
  ArrowRight: FC<IconProps>;
  History: FC<IconProps>;
  Message: FC<IconProps>;
  Key: FC<IconProps>;
  SignIn: FC<IconProps>;
  Speedometer: FC<IconProps>;
  User: FC<IconProps>;
};

const Index: IconType = {
  ArrowRight,
  History,
  Message,
  Key,
  SignIn,
  Speedometer,
  User,
};

export default Index;
