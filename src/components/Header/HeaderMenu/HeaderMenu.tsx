import styles from "./HeaderMenu.module.scss";
import { useQuery } from "react-query";
import { MutableRefObject, useState } from "react";
import ProfileSettings from "../../ProfileSettings/ProfileSettings";
import LinkCustom from "../../ui/LinkCustom/LinkCustom";
import User from "../../User/User";
import { getCurrentUserInfo } from "../../../services/User";
import content from "../../../settings/content";
import { useClickAway } from "@uidotdev/usehooks";
import { useHistory } from "react-router-dom";
import ValidateComponentByRole from "../../ValidateComponentByRole/ValidateComponentByRole";

const HeaderMenu: React.FC = () => {
  const history = useHistory();
  const currentPagePath = history.location.pathname;

  const { data: userInfo, refetch } = useQuery({
    queryFn: () => getCurrentUserInfo(),
    queryKey: ["user"],
  });

  const [isVisible, setIsVisible] = useState(false);

  /* Временно закомменчено, т.к. из-за этого не работает диалоговое окно в профиле пользователей */
  const ref: MutableRefObject<HTMLDivElement> = useClickAway(() => {
    // setIsVisible(false);
  });

  const profileToggler = (toggler: boolean) => {
    setIsVisible(toggler);
  };

  const updateUserInfo = () => {
    refetch();
  };

  return (
    <div className={styles.headerMenu}>
      <div className={styles.headerMenu__navigation}>
        {content.header.menu.map((item) => (
          <ValidateComponentByRole requiredRoles={item.requiredRole} key={item.id}>
            <LinkCustom className={styles.custom_button} title={item.title} to={item.path} isActive={currentPagePath === item.path} />
          </ValidateComponentByRole>
        ))}
      </div>
      <div className={styles.headerMenu__user} ref={ref}>
        <User username={userInfo?.name} profileToggler={profileToggler} />
        {isVisible && <ProfileSettings userInfo={userInfo} updateUserInfo={updateUserInfo} profileToggler={profileToggler} />}
      </div>
    </div>
  );
};

export default HeaderMenu;
