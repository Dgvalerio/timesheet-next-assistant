import React, { FC } from 'react';

import { IconProps, IconWrapper } from './index';

// Fonts searched in https://iconmonstr.com/

const SignInIcon: FC<IconProps> = ({ size, width, height }) => (
  <IconWrapper size={size} width={width} height={height}>
    <path d="M13.033 2v-2l10 3v18l-10 3v-2h-9v-7h1v6h8v-18h-8v7h-1v-8h9zm1 20.656l8-2.4v-16.512l-8-2.4v21.312zm-3.947-10.656l-3.293-3.293.707-.707 4.5 4.5-4.5 4.5-.707-.707 3.293-3.293h-9.053v-1h9.053z" />
  </IconWrapper>
);

export default SignInIcon;
