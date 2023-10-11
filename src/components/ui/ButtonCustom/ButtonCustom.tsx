import styles from "./ButtonCustom.module.scss";
import { Button } from "antd";
import { ButtonHTMLType, ButtonType } from "antd/es/button";
import { ReactElement } from "react";

interface IProps {
  title?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: ButtonType;
  disabled?: boolean;
  isTransparent?: boolean;
  bgColor?: "orange" | "blue" | "gray";
  maxWidth?: string;
  htmlType?: ButtonHTMLType;
  children?: ReactElement
}

const ButtonCustom: React.FC<IProps> = ({
  title,
  className,
  onClick,
  type = "primary",
  disabled,
  isTransparent,
  bgColor = "blue",
  maxWidth,
  htmlType,
  children
}) => {
  return (
    <Button
      htmlType={htmlType}
      type={type}
      disabled={disabled}
      onClick={onClick}
      ghost={isTransparent}
      className={`${styles.button} ${styles[`custom_${bgColor}`]} ${className}`}
      style={{ maxWidth: maxWidth }}
    >
      {children}
    </Button>
  );
};

export default ButtonCustom;
