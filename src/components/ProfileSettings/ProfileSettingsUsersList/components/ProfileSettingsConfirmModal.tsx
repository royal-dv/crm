import { Modal } from "antd";
import styles from "../ProfileSettingsUsersList.module.scss";
import content from "../../../../settings/content";

interface IProps {
  open: boolean;
  onCancel: () => void;
  logoutHandler: (user_email?: string) => void;
  userEmail: string;
}

const ProfileSettingsConfirmModal: React.FC<IProps> = ({ open, onCancel, logoutHandler, userEmail }) => {
  const handleCancel = () => {
    onCancel();
  };

  const handleOk = () => {
    logoutHandler(userEmail);
  };
  return (
    <Modal
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={content.profile_settings.users_list.exit}
      cancelText={content.profile_settings.users_list.stay}
    >
      <div className={styles.profile_settings_users_confirm}>{content.profile_settings.users_list.text}</div>
    </Modal>
  );
};

export default ProfileSettingsConfirmModal;
