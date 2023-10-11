import ButtonCustom from "../../../ui/ButtonCustom/ButtonCustom";
import InputCustom from "../../../ui/InputCustom/InputCustom";
import styles from "../ProfileSettingsCurrentUser.module.scss";
import content from "../../../../settings/content";

interface IProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  updateCurrentUserInfoHandler: (name: string) => Promise<void>;
}
const ProfileSettingsName: React.FC<IProps> = ({ name, setName, updateCurrentUserInfoHandler }) => {
  return (
    <div className={styles.profile_settings__current_user_container}>
      <p className={styles.profile_settings__current_user_container_title}>{content.profile_settings.block_titles.name}</p>
      <InputCustom
        status={name?.length >= 2 ? "" : "error"}
        placeholder={content.profile_settings.inputs.name}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <ButtonCustom
        className={styles.profile_settings__current_user_container_button}
        children={<span>{content.profile_settings.buttons.save}</span>}
        onClick={() => updateCurrentUserInfoHandler(name)}
        disabled={name?.length < 2}
      />
    </div>
  );
};

export default ProfileSettingsName;
