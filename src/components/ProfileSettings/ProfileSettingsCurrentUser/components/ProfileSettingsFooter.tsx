import ButtonCustom from "../../../ui/ButtonCustom/ButtonCustom";
import styles from "../ProfileSettingsCurrentUser.module.scss";
import content from "../../../../settings/content";

interface IProps {
  logoutHandler: () => void;
  toggleScreens: (toggler: boolean) => void;
}
const ProfileSettingsFooter: React.FC<IProps> = ({ logoutHandler, toggleScreens }) => {
  return (
    <div className={styles.profile_settings__current_user_footer}>
      <ButtonCustom
        className={styles.profile_settings__current_user_container_button}
        children={<span>{content.profile_settings.buttons.logout}</span>}
        onClick={logoutHandler}
      />
      <ButtonCustom
        bgColor="orange"
        className={`${styles.profile_settings__current_user_container_button}`}
        children={<span>{content.profile_settings.buttons.change_user}</span>}
        onClick={() => toggleScreens(true)}
      />
    </div>
  );
};

export default ProfileSettingsFooter;
