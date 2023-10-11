import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ProfileSettingsPassword from "./components/ProfileSettingsPassword";
import ProfileSettingsFooter from "./components/ProfileSettingsFooter";
import ProfileSettingsName from "./components/ProfileSettingsName";
import { validatePassword } from "../../../helpers/validateInputs";
import styles from "./ProfileSettingsCurrentUser.module.scss";

interface IProfileSettingsCurrentUser {
  toggleScreens: (toggler: boolean) => void;
  updateCurrentUserInfoHandler: (name: string) => Promise<void>;
  updateCurrentUserPassword: (old_password: string, new_password: string) => Promise<any>;
  logoutHandler: () => void;
  username: string;
}

const ProfileSettingsCurrentUser: React.FC<IProfileSettingsCurrentUser> = ({
  username,
  toggleScreens,
  updateCurrentUserInfoHandler,
  updateCurrentUserPassword,
  logoutHandler,
}) => {
  const [name, setName] = useState(username);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [disabled, setDisabled] = useState(true);

  const history = useHistory();

  useEffect(() => {
    if (!repeatPassword.length) return;
    if (
      newPassword !== repeatPassword ||
      validatePassword(oldPassword) ||
      validatePassword(newPassword) ||
      validatePassword(repeatPassword)
    ) {
      setDisabled(true);
      return;
    }
    setDisabled(false);
  }, [oldPassword, newPassword, repeatPassword]);

  const handleOldPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  };

  const handleNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleRepeatPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(e.target.value);
  };

  const updatePassword = () => {
    updateCurrentUserPassword(oldPassword, newPassword).then(() => {
      setOldPassword("");
      setNewPassword("");
      setRepeatPassword("");
    });
  };

  return (
    <div className={styles.profile_settings__current_user}>
      <ProfileSettingsName name={name} setName={setName} updateCurrentUserInfoHandler={updateCurrentUserInfoHandler} />
      <ProfileSettingsPassword
        oldPassword={oldPassword}
        handleOldPassword={handleOldPassword}
        newPassword={newPassword}
        handleNewPassword={handleNewPassword}
        repeatPassword={repeatPassword}
        handleRepeatPassword={handleRepeatPassword}
        updatePassword={updatePassword}
        disabled={disabled}
      />
      <ProfileSettingsFooter logoutHandler={logoutHandler} toggleScreens={toggleScreens} />
    </div>
  );
};

export default ProfileSettingsCurrentUser;
