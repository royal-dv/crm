import Layout from "../../components/Layout/Layout";
import Gallery from "../Gallery/Gallery";
import ControlPanel from "../../components/ControlPanel/ControlPanel";
import StatusesSettings from "../../components/StatusesSettings/StatusesSettings";
import ValidateComponentByRole from "../../components/ValidateComponentByRole/ValidateComponentByRole";
import styles from "./MainPage.module.scss";
import content from "../../settings/content";

type Props = {};

const MainPage = (props: Props) => {
  return (
    <div className={styles.MainPage__container}>
      <Layout>
        <div className={styles.Layout__wrapper}>
          <div className={styles.Layout__container}>
            <ControlPanel />
            <ValidateComponentByRole requiredRoles={content.statuses_settings.requiredRole}>
              <StatusesSettings />
            </ValidateComponentByRole>
          </div>
          <div className={styles.Layout__gallery}>
            <Gallery />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default MainPage;
