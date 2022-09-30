import { Select as AntSelect, SelectProps } from 'antd';
import { DefaultOptionType } from 'antd/lib/cascader';

const Select = (props: SelectProps) => (
  <AntSelect showArrow placement="bottomLeft" {...props} />
);

interface DropdownProps extends SelectProps {
  list: DefaultOptionType[];
}

export const Dropdown = ({ list, ...props }: DropdownProps) => {
  return (
    <Select {...props}>
      {list.map(item => (
        <AntSelect.Option key={item.key} value={item.key}>
          {item.label}
        </AntSelect.Option>
      ))}
    </Select>
  );
};
