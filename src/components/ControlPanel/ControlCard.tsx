import styles from "./ControlPanel.module.scss";

interface IProps {
  title: string;
  description: string;
  name: string;
  notificationCount: number;
  handleOpenCard: (name: string, title: string) => void;
}

const ControlCard = ({ title, description, name, notificationCount, handleOpenCard }: IProps) => {
  return (
    <button className={styles.controlCard__wrapper} onClick={() => handleOpenCard(name, title)}>
      <span className={styles.controlCard__title}>{title}</span>
      <span className={styles.controlCard__description}>{description}</span>
      {notificationCount > 0 && <span className={styles.controlCard__count}>+ {notificationCount}</span>}
    </button>
  );
};

export default ControlCard;
