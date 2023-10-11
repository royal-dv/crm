import { Select } from "antd";
import styles from "./SelectCustom.module.scss";
import "./SelectCustom_override.scss";

interface IProps {
  name?: string;
  className?: string;
  options: IOptionsProps[];
  onChange?: (value: string) => void;
  onDeselect?: (value: string | number) => void;
  defaultValue?: string;
  value?: string;
  width?: string;
  placeholder?: string;
  mode?: "multiple" | "tags";
  disabled?: boolean;
}

export interface IOptionsProps {
  value: string | number;
  disabled?: boolean;
  label?: string;
}

const SelectCustom: React.FC<IProps> = ({
  placeholder,
  name,
  className,
  options,
  onChange,
  onDeselect,
  defaultValue,
  value,
  width = "auto",
  mode,
  disabled,
}) => (
  <Select
    mode={mode}
    placeholder={placeholder}
    defaultValue={defaultValue ? defaultValue : name}
    className={`${styles.select} ${className}`}
    options={options}
    onChange={onChange}
    value={value}
    style={{ width: width }}
    disabled={disabled || false}
    onDeselect={onDeselect}
  />
);

export default SelectCustom;
