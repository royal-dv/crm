import styles from "./User.module.scss";
import { getInitials } from "../../helpers/formatString";
import { Avatar } from "antd";

interface IProps {
  username: string;
  profileToggler: (toggler: boolean) => void;
}

const User = ({ username, profileToggler }: IProps) => {
  return (
    <div className={styles.user} onClick={() => profileToggler(true)}>
      <Avatar style={{ backgroundColor: "#FF8900", color: "#fff" }}>{getInitials(username)}</Avatar>
      <span className={styles.user__name}>{username}</span>
    </div>
  );
};

export default User;
