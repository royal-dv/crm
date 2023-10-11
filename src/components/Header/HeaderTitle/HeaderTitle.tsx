import ButtonCustom from "../../ui/ButtonCustom/ButtonCustom";
import { ReactComponent as CloseIcon } from "../../../assets/icons/cross.svg";

import styles from "./HeaderTitle.module.scss";

interface IProps {
  title: string;
}
const HeaderTitle: React.FC<IProps> = ({ title }) => {
  return (
    <div className={styles.headerTitle}>
      <span className={styles.headerTitle__name}>{title}</span>
      <ButtonCustom isTransparent className={styles.headerTitle__button}>
        <CloseIcon />
      </ButtonCustom>
    </div>
  );
};

export default HeaderTitle;
