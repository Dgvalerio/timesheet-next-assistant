import React, { FC } from 'react';

import { IconProps, IconWrapper } from './index';

// Fonts searched in https://iconmonstr.com/

const SignOutIcon: FC<IconProps> = ({ size, width, height }) => (
  <IconWrapper size={size} width={width} height={height}>
    <path d="M0 2v20h14v-2h-12v-16h12v-2h-14zm18 7.408l2.963 2.592-2.963 2.592v-1.592h-8v-2h8v-1.592zm-2-4.408v4h-8v6h8v4l8-7-8-7z" />
  </IconWrapper>
);

export default SignOutIcon;
