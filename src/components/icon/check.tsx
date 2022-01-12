import React, { FC } from 'react';

import { IconProps, IconWrapper } from './index';

// Fonts searched in https://iconmonstr.com/

const CheckIcon: FC<IconProps> = ({ size, width, height }) => (
  <IconWrapper size={size} width={width} height={height}>
    <path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z" />
  </IconWrapper>
);

export default CheckIcon;
