import styles from "./Header.module.scss";
import HeaderMenu from "./HeaderMenu/HeaderMenu";
import HeaderTitle from "./HeaderTitle/HeaderTitle";
import content from "../../settings/content";

const Header: React.FC = () => {
  return (
    <>
      <div className={styles.header}>
        <HeaderTitle title={content.header.title} />
        <HeaderMenu />
      </div>
    </>
  );
};

export default Header;
