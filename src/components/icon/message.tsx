import React, { FC } from 'react';

import { IconProps, IconWrapper } from '@/components/icon';

// Fonts searched in https://iconmonstr.com/

const MessageIcon: FC<IconProps> = ({ size, width, height }) => (
  <IconWrapper size={size} width={width} height={height}>
    <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z" />
  </IconWrapper>
);

export default MessageIcon;
