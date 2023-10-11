import { useState } from "react";
import { Avatar } from "antd";
import { getInitials } from "../../../../../../helpers/formatString";
import content from "../../../../../../settings/content";
import { IProject } from "../../../../../../services/Projects";
import styles from "./DetailCardProjectsLabel.module.scss";

interface IProps {
  data: IProject;
  userInfo: {
    name: string;
  };
}

const DetailCardProjectsLabel: React.FC<IProps> = ({ data, userInfo }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.collapse__header} onClick={handleClick}>
      <div className={styles.collapse__header_project}>
        {isOpen ? (
          <>
            <Avatar
              size={22}
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "14px",
                backgroundColor: "#FF8900",
                color: "#fff",
                fontWeight: "400",
              }}
            >
              {getInitials(userInfo?.name)}
            </Avatar>
            <div className={styles.collapse__header_project_user_name}>{userInfo?.name}</div>
          </>
        ) : (
          data.name
        )}
      </div>
      {/* Мок.данные по дате и ФИО */}
      <div className={styles.collapse__header_date}>25 июля, 14:15</div>
      <div className={styles.collapse__header_name}>
        {isOpen ? content.deals.detail_deal_card.tabs.projects.label_create : userInfo?.name}
      </div>
    </div>
  );
};

export default DetailCardProjectsLabel;
