import React, { FC } from 'react';

import { IconProps, IconWrapper } from '@/components/icon';

// Fonts searched in https://iconmonstr.com/

const ArrowRightIcon: FC<IconProps> = ({ size, width, height }) => (
  <IconWrapper size={size} width={width} height={height}>
    <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" />
  </IconWrapper>
);

export default ArrowRightIcon;
