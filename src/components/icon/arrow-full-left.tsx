import React, { FC } from 'react';

import { IconProps, IconWrapper } from '@/components/icon';

// Fonts searched in https://iconmonstr.com/

const ArrowFullLeftIcon: FC<IconProps> = ({ size, width, height }) => (
  <IconWrapper size={size} width={width} height={height}>
    <path d="M0 12l9-8v6h15v4h-15v6z" />
  </IconWrapper>
);

export default ArrowFullLeftIcon;
