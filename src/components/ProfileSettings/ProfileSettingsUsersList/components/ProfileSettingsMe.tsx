import ProfileSettingsUserCard from "../../ProfileSettingsUserCard/ProfileSettingsUserCard";
import styles from "../ProfileSettingsUsersList.module.scss";
import content from "../../../../settings/content";

interface IProps {
  toggleScreens: (toggler: boolean) => void;
  userName: string;
  userEmail: string;
}

const ProfileSettingsUserListMe: React.FC<IProps> = ({ toggleScreens, userName, userEmail }) => {
  return (
    <div className={styles.profile_settings_users__container} onClick={() => toggleScreens(false)}>
      <p className={styles.profile_settings_users__title}>{content.profile_settings.users_list.me}</p>
      <ProfileSettingsUserCard userName={userName} userEmail={userEmail} />
    </div>
  );
};

export default ProfileSettingsUserListMe;
