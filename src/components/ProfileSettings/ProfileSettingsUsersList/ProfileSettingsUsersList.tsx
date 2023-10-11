import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ProfileSettingsAvailable from "./components/ProfileSettingsAvailable";
import ProfileSettingsMe from "./components/ProfileSettingsMe";
import { IRecentUsers, getRecentUsers } from "../../../services/User";
import styles from "./ProfileSettingsUsersList.module.scss";

interface IProfileSettingsUsersList {
  toggleScreens: (toggler: boolean) => void;
  userName: string;
  userEmail: string;
}

const ProfileSettingsUsersList: React.FC<IProfileSettingsUsersList> = ({ toggleScreens, userName, userEmail }) => {
  const { data: users, isLoading } = useQuery({
    queryFn: () => getRecentUsers(),
    queryKey: ["recent_users"],
  });

  const [recentUsers, setRecentUsers] = useState<IRecentUsers[]>([]);

  useEffect(() => {
    if (!users?.data) return;
    setRecentUsers(users?.data.sessions);
  }, [users]);

  const filteredRecentUsers = recentUsers?.filter((item) => {
    return item.user_email !== userEmail;
  });

  return (
    <div className={styles.profile_settings_users}>
      <>
        <ProfileSettingsMe toggleScreens={toggleScreens} userName={userName} userEmail={userEmail} />
        <ProfileSettingsAvailable isLoading={isLoading} data={filteredRecentUsers} isOpen={false} />
      </>
    </div>
  );
};

export default ProfileSettingsUsersList;
