import InputCustom from "../../../ui/InputCustom/InputCustom";
import ButtonCustom from "../../../ui/ButtonCustom/ButtonCustom";
import { validatePassword, validateRepeatPassword } from "../../../../helpers/validateInputs";
import styles from "../ProfileSettingsCurrentUser.module.scss";
import content from "../../../../settings/content";

interface IProps {
  oldPassword: string;
  handleOldPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  newPassword: string;
  handleNewPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  repeatPassword: string;
  handleRepeatPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updatePassword: () => void;
  disabled: boolean;
}
const ProfileSettingsPassword: React.FC<IProps> = ({
  oldPassword,
  newPassword,
  repeatPassword,
  handleOldPassword,
  handleNewPassword,
  handleRepeatPassword,
  updatePassword,
  disabled,
}) => {
  return (
    <div className={styles.profile_settings__current_user_container}>
      <div className={styles.profile_settings__current_user_container_title}>{content.profile_settings.block_titles.change_password}</div>
      <div className={styles.profile_settings__current_user_container_password_block}>
        <InputCustom
          status={validatePassword(oldPassword)}
          className={styles.profile_settings__block_input}
          type={"password"}
          value={oldPassword}
          onChange={handleOldPassword}
          placeholder={content.profile_settings.inputs.olg_password}
        />
        <InputCustom
          status={validatePassword(newPassword)}
          className={styles.profile_settings__block_input}
          type={"password"}
          value={newPassword}
          onChange={handleNewPassword}
          placeholder={content.profile_settings.inputs.new_password}
        />
        <InputCustom
          status={validateRepeatPassword(newPassword, repeatPassword)}
          value={repeatPassword}
          onChange={handleRepeatPassword}
          className={styles.profile_settings__block_input}
          type={"password"}
          placeholder={content.profile_settings.inputs.repeat_password}
        />
      </div>
      <ButtonCustom
        className={styles.profile_settings__current_user_container_button}
        children={<span>{content.profile_settings.buttons.save}</span>}
        onClick={updatePassword}
        disabled={disabled}
      />
    </div>
  );
};

export default ProfileSettingsPassword;
