import { Avatar } from "antd";
import styles from "./ProfileSettingsUserCard.module.scss";
import { getInitials } from "../../../helpers/formatString";
import ProfileSettingsConfirmModal from "../ProfileSettingsUsersList/components/ProfileSettingsConfirmModal";

interface IProfileSettingsUserCard {
  userName: string;
  userEmail: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  logoutHandler?: (user_email: string) => void;
  onCancel?: () => void;
  isOpen?: boolean;
}
const ProfileSettingsUserCard: React.FC<IProfileSettingsUserCard> = ({ userName, userEmail, onClick, onCancel, logoutHandler, isOpen }) => {
  const handleCancel = () => {
    onCancel && onCancel();
  };
  return (
    <>
      <div className={styles.profile_settings_user_card} onClick={onClick}>
        <Avatar
          size={36}
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "14px",
            backgroundColor: "#ff8900",
            color: "#fff",
            fontWeight: "400",
          }}
        >
          {getInitials(userName)}
        </Avatar>
        <div className={styles.profile_settings_user_card__data}>
          <p>{userName}</p>
          <p className={styles.profile_settings_user_card__data_email}>{userEmail}</p>
        </div>
      </div>
      {isOpen ? (
        <ProfileSettingsConfirmModal
          open={isOpen}
          onCancel={handleCancel}
          logoutHandler={() => logoutHandler && logoutHandler(userEmail)}
          userEmail={userEmail}
        />
      ) : (
        false
      )}
    </>
  );
};

export default ProfileSettingsUserCard;
