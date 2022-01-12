import React, { FC } from 'react';

import ArrowLeft from './arrow-left';
import ArrowRight from './arrow-right';
import Check from './check';
import History from './history';
import Key from './key';
import Message from './message';
import Pencil from './pencil';
import SignIn from './sign-in';
import SignOut from './sign-out';
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
  ArrowLeft: FC<IconProps>;
  ArrowRight: FC<IconProps>;
  Check: FC<IconProps>;
  History: FC<IconProps>;
  Message: FC<IconProps>;
  Key: FC<IconProps>;
  Pencil: FC<IconProps>;
  SignIn: FC<IconProps>;
  SignOut: FC<IconProps>;
  Speedometer: FC<IconProps>;
  User: FC<IconProps>;
};

const Index: IconType = {
  ArrowLeft,
  ArrowRight,
  Check,
  History,
  Message,
  Key,
  Pencil,
  SignIn,
  SignOut,
  Speedometer,
  User,
};

export default Index;
