import Header from "../Header/Header";
import styles from "./Layout.module.scss";

interface ILayoutProps {
  children?: React.ReactNode;
  horizontal_scroll?: boolean;
  vertical_scroll?: boolean;
}

const Layout: React.FC<ILayoutProps> = ({ children, horizontal_scroll, vertical_scroll }) => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div
          className={
            vertical_scroll
              ? `${styles.children_vertical_scroll} ${styles.children}`
              : !horizontal_scroll
              ? `${styles.children} ${styles.children_horizontal_scroll}`
              : styles.children
          }
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
