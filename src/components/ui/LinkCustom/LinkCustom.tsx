import { Link } from "react-router-dom";
import styles from "./LinkCustom.module.scss";

interface IButtonProps {
  title?: string | number;
  to: string;
  className?: string;
  isActive?: boolean;
  isBlank?: boolean;
}

const LinkCustom: React.FC<IButtonProps> = ({ title, className, to, isActive = false, isBlank = false }) => {
  return (
    <Link
      className={`${styles.link} ${styles.custom_blue} ${className} ${isActive && styles.active}`}
      to={to}
      target={isBlank ? "_blank" : "_self"}
    >
      {title}
    </Link>
  );
};

export default LinkCustom;
