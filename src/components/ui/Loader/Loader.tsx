import { Spin } from "antd";
import styles from "./Loader.module.scss";
import { LoadingOutlined } from "@ant-design/icons";
import "./Loader_override.scss";
import content from "../../../settings/content";

interface IProps {
  title?: string | number;
}

const antIcon = <LoadingOutlined style={{ color: "#4073ac" }} />;

const Loader: React.FC<IProps> = ({ title }) => {
  return (
    <div className={styles.loader}>
      <Spin tip={title ? title : content.loader.title} indicator={antIcon}>
        <div className={styles.loader__content} />
      </Spin>
    </div>
  );
};

export default Loader;
