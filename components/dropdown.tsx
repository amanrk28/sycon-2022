import { FC } from 'react';
import { Select as AntSelect, SelectProps } from 'antd';

export const Dropdown: FC<SelectProps> = props => (
  <AntSelect showArrow placement="bottomLeft" {...props} />
);
