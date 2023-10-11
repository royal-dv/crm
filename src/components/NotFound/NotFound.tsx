import styles from "./NotFound.module.scss";

interface INotFoundProps {
  title: string;
}

const NotFound: React.FC<INotFoundProps> = ({ title }) => {
  return (
    <div className={styles.not_found_container}>
      <span className={styles.not_found}>{title}</span>
    </div>
  );
};

export default NotFound;
