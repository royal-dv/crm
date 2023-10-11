import { Tabs } from "antd";
import Layout from "../../components/Layout/Layout";
import content from "../../settings/content";
import ShopsCards from "./Shops/ShopsCards/ShopsCards";
import Stuff from "./Stuff/Stuff";
import { ReactComponent as ShopIcon } from "../../assets/icons/shop.svg";
import { ReactComponent as StuffIcon } from "../../assets/icons/stuff.svg";
import { ReactComponent as KeyIcon } from "../../assets/icons/key.svg";
import styles from "./Organization.module.scss";
import "./Organization_override.scss";
import Keys from "./Keys/Keys";

export interface IProps {}

const Organization: React.FC<IProps> = ({}) => {
  const tabs = [
    {
      label: (
        <div className={styles.organization__tab}>
          <ShopIcon />
          <span>{content.organizations.tabs.tabShops}</span>
        </div>
      ),
      key: "1",

      children: <ShopsCards />,
    },
    {
      label: (
        <div className={styles.organization__tab}>
          <StuffIcon />
          <span>{content.organizations.tabs.tabStaff}</span>
        </div>
      ),
      key: "2",
      children: <Stuff />,
    },
    {
      label: (
        <div className={styles.organization__tab}>
          <KeyIcon />
          <span>{content.organizations.tabs.tabKeys}</span>
        </div>
      ),
      key: "3",
      children: <Keys />,
    },
  ];
  return (
    <>
      <Layout vertical_scroll>
        <div className={"organization__tabs"}>
          <Tabs defaultActiveKey="1" items={tabs} indicatorSize={0} />
        </div>
      </Layout>
    </>
  );
};

export default Organization;
