import ProfileSettingsUserCard from "../../ProfileSettingsUserCard/ProfileSettingsUserCard";
import Loader from "../../../ui/Loader/Loader";
import { IRecentUsers } from "../../../../services/User";
import { useState } from "react";
import { logout } from "../../../../services/Authorization";
import styles from "../ProfileSettingsUsersList.module.scss";
import content from "../../../../settings/content";

interface IProps {
  isLoading: boolean;
  isOpen: boolean;
  data: IRecentUsers[];
}

const ProfileSettingsUserListAvailable: React.FC<IProps> = ({ isLoading, data }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onCancel = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const logoutHandler = (user_email: string) => {
    logout().then(() => {
      localStorage.setItem("user_email", user_email);
      window.location.reload();
    });
  };

  return (
    <div className={styles.profile_settings_users__container}>
      <p className={styles.profile_settings_users__title}>{content.profile_settings.users_list.available_users}</p>
      {isLoading ? (
        <Loader />
      ) : (
        data.map((item, i) => {
          return (
            <ProfileSettingsUserCard
              key={i}
              isOpen={isOpen}
              onClick={onOpen}
              userEmail={item.user_email}
              userName={item.user_name}
              logoutHandler={logoutHandler}
              onCancel={onCancel}
            />
          );
        })
      )}
    </div>
  );
};

export default ProfileSettingsUserListAvailable;
