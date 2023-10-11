import { Checkbox } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import styles from "./StatusesSettings.module.scss";
import "./StatusesSettings_override.scss";
import { defaultCheckedList, statusesSettings } from "../../settings/mockData";
import content from "../../settings/content";

const StatusesSettings = () => {
  const onChange = (list: CheckboxValueType[]) => {
    console.log(list);
  };

  return (
    <div className={styles.statusesSettings}>
      <div className={styles.statusesSettings__header}>
        <p className={styles.statusesSettings__header_title}>{content.statuses_settings.title}</p>
      </div>
      <div className={styles.statusesSettings__data}>
        <Checkbox.Group className="custom_styles" options={statusesSettings} defaultValue={defaultCheckedList} onChange={onChange} />
        <p className={styles.statusesSettings__hint}>{content.statuses_settings.hint}</p>
      </div>
    </div>
  );
};

export default StatusesSettings;
