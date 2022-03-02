import React, { FC } from 'react';

import ArrowFullLeft from '@/components/icon/arrow-full-left';
import ArrowLeft from '@/components/icon/arrow-left';
import ArrowRight from '@/components/icon/arrow-right';
import Check from '@/components/icon/check';
import History from '@/components/icon/history';
import Key from '@/components/icon/key';
import Message from '@/components/icon/message';
import Pencil from '@/components/icon/pencil';
import SignIn from '@/components/icon/sign-in';
import SignOut from '@/components/icon/sign-out';
import Speedometer from '@/components/icon/speedometer';
import User from '@/components/icon/user';

// Fonts searched in https://iconmonstr.com/

export interface IconProps {
  size?: number;
  width?: number;
  height?: number;
}

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
  size: 12,
  width: 12,
  height: 12,
};

interface IconType {
  ArrowFullLeft: FC<IconProps>;
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
}

const Index: IconType = {
  ArrowFullLeft,
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
