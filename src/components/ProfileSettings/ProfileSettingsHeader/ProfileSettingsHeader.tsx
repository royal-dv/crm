import ButtonCustom from "../../ui/ButtonCustom/ButtonCustom";
import { ReactComponent as CloseIcon } from "../../../assets/icons/cross.svg";
import styles from "./ProfileSettingsHeader.module.scss";
import content from "../../../settings/content";

interface IProps {
  profileToggler: (toggler: boolean) => void;
}

const ProfileSettingsHeader: React.FC<IProps> = ({ profileToggler }) => {
  return (
    <header className={styles.profile_settings__header}>
      <div className={styles.profile_settings__header_title}>{content.profile_settings.header.title}</div>
      <ButtonCustom isTransparent className={styles.profile_settings__header_close} onClick={() => profileToggler(false)}>
        <CloseIcon />
      </ButtonCustom>
    </header>
  );
};

export default ProfileSettingsHeader;
