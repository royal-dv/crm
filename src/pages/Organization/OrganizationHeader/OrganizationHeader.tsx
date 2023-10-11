import SearchBar from "../../../components/SearchBar/SearchBar";
import content from "../../../settings/content";
import styles from "./OrganizationHeader.module.scss";

export interface IProps {
  title: string;
  placeholder?: string;
}

const OrganizationHeader: React.FC<IProps> = ({ title, placeholder }) => {
  return (
    <div className={styles.shopsHeader}>
      <p>{title}</p>
      <div className={styles.shopsHeader__header_search}>
        <SearchBar placeholder={placeholder} />
      </div>
    </div>
  );
};

export default OrganizationHeader;
