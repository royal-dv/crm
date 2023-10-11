import ButtonCustom from "../../../../components/ui/ButtonCustom/ButtonCustom";
import styles from "./DealCard.module.scss";
import { ReactComponent as UserIcon } from "../../../../assets/icons/user.svg";
import { getInitials } from "../../../../helpers/formatString";
import { Avatar } from "antd";
import { ReactComponent as MessageIcon } from "../../../../assets/icons/message.svg";
import { ReactComponent as AlertIcon } from "../../../../assets/icons/alert.svg";

export interface IDealCardProps {
  id: string;
  created_at?: string;
  title: string;
  client_fullname: string;
  status?: string;
  email?: string;
  stage?: string;
  type?: string;
  square?: string;
  complex?: string;
  phone?: string;
  openDetail?: () => void;
  onClick: (id: string) => void;
  isEditing?: boolean;
}

const DealCard: React.FC<IDealCardProps> = ({ id, created_at, title, client_fullname, onClick, isEditing }) => {
  return (
    <div className={`${styles.dealCard} ${isEditing ? styles.selectedDeal : ""}`} onClick={() => onClick(id)} key={id}>
      <div className={styles.dealCard__date}>{created_at}</div>
      <div className={styles.dealCard__container}>
        <div className={styles.dealCard__title}>{title ? title : "Без названия"}</div>
        <div className={styles.dealCard__block}>
          <UserIcon />
          <div className={styles.dealCard__name}>{client_fullname}</div>
        </div>
      </div>
      <div className={styles.dealCard__buttons}>
        <div className={styles.dealCard__buttons_block}>
          <Avatar
            size={25}
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "12px",
              backgroundColor: "#FF8900",
              color: "#fff",
            }}
          >
            {getInitials(client_fullname)}
          </Avatar>
          <ButtonCustom className={styles.dealCard__button} isTransparent>
            <MessageIcon />
          </ButtonCustom>
        </div>
        <div className={styles.dealCard__buttons_block}>
          <ButtonCustom className={styles.dealCard__button} isTransparent>
            <AlertIcon />
          </ButtonCustom>
        </div>
      </div>
    </div>
  );
};

export default DealCard;
