import { useState } from "react";
import { useMutation } from "react-query";
import { message } from "antd";
import ProfileSettingsCurrentUser from "./ProfileSettingsCurrentUser/ProfileSettingsCurrentUser";
import ProfileSettingsUsersList from "./ProfileSettingsUsersList/ProfileSettingsUsersList";
import { updateCurrentUserInfo, resetPassword, IUserData } from "../../services/User";
import { logout } from "../../services/Authorization";
import styles from "./ProfileSettings.module.scss";
import ProfileSettingsHeader from "./ProfileSettingsHeader/ProfileSettingsHeader";
import content from "../../settings/content";

interface IProps {
  userInfo: IUserData;
  profileToggler: (toggler: boolean) => void;
  updateUserInfo: () => void;
}

const ProfileSettings: React.FC<IProps> = ({ userInfo, profileToggler, updateUserInfo }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const { mutateAsync: onUpdateCurrentUserInfo } = useMutation({
    mutationFn: updateCurrentUserInfo,
    onSuccess: () => {
      updateUserInfo();
    },
  });

  const { mutateAsync: onResetPassword } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      updateUserInfo();
    },
  });

  const [changeUser, setChangeUser] = useState<boolean>(false);

  const toggleScreens = (toggler: boolean) => {
    setChangeUser(toggler);
  };

  const updateCurrentUserInfoHandler = async (name: string) => {
    onUpdateCurrentUserInfo({
      id: userInfo?.id,
      name: name,
    })
      .then((response) => {
        if (response.status === 200) {
          success();
        } else {
          error();
        }
      })
      .catch((err) => {
        error();
      });
  };

  const updateCurrentUserPassword = async (old_password: string, new_password: string) => {
    onResetPassword({ old_password, new_password }).then((response) => {
      if (response.status === 200) {
        success();
      } else {
        error();
      }
    });
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: content.alert_messages.profile.success_profile,
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: content.alert_messages.profile.error_profile,
    });
  };

  const logoutHandler = () => {
    logout().then(() => {
      window.location.reload();
    });
  };

  return (
    <div className={styles.profile_settings}>
      {contextHolder}
      <ProfileSettingsHeader profileToggler={profileToggler} />
      <main className={styles.profile_settings__container}>
        {changeUser ? (
          <ProfileSettingsUsersList userName={userInfo.name} userEmail={userInfo.email} toggleScreens={toggleScreens} />
        ) : (
          <ProfileSettingsCurrentUser
            username={userInfo.name}
            toggleScreens={toggleScreens}
            updateCurrentUserPassword={updateCurrentUserPassword}
            updateCurrentUserInfoHandler={updateCurrentUserInfoHandler}
            logoutHandler={logoutHandler}
          />
        )}
      </main>
    </div>
  );
};

export default ProfileSettings;
