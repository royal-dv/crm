import { Input } from "antd";
import "./InputCustom_override.scss";
import styles from "./InputCustom.module.scss";
import { InputStatus } from "antd/es/_util/statusUtils";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

export interface IInput {
  key?: number | string;
  name?: string;
  status?: InputStatus;
  type?: "text" | "number" | "password" | "search";
  className?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
  disabled?: boolean;
  suffix?: React.ReactNode;
  allowClear?: boolean;
  maxLength?: number;
}

const InputCustom: React.FC<IInput> = ({
  key,
  name,
  className,
  type,
  status,
  placeholder,
  style,
  value,
  onChange,
  disabled,
  suffix,
  allowClear,
  maxLength,
}) => {
  if (type === "password") {
    return (
      <Input.Password
        key={key}
        name={name}
        className={className}
        type={type}
        status={status}
        style={style}
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    );
  }

  return (
    <Input
      key={key}
      name={name}
      className={`${styles.input} ${className}`}
      type={type}
      status={status}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={style}
      disabled={disabled}
      suffix={suffix}
      allowClear={allowClear}
      maxLength={maxLength}
    />
  );
};

export default InputCustom;
