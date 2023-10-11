import { useState } from "react";
import ButtonCustom from "../../../../../../components/ui/ButtonCustom/ButtonCustom";
import { IProject } from "../../../../../../services/Projects";
import content from "../../../../../../settings/content";
import styles from "./DetailCardProjectsData.module.scss";
import { Skeleton } from "antd";

interface IProps {
  data: IProject;
}

const DetailCardProjectsData: React.FC<IProps> = ({ data }) => {
  const [isPreview, setIsPreview] = useState<boolean>();
  const previewSrc = `https://presales.storage.yandexcloud.net/${data.id}/small.png`;

  const projectPreview = new Image();
  projectPreview.src = previewSrc;
  projectPreview.onload = function () {
    setIsPreview(true);
  };
  projectPreview.onerror = function () {
    setIsPreview(false);
  };

  const handleOpenProject = (isViewOnly: boolean) => {
    const link = document.createElement("a");
    link.href = `url:?url=${data.id}${isViewOnly ? "&viewOnly" : ""}`;
    link.target = "_blank";
    link.click();
  };
  return (
    <div className={styles.collapse__box}>
      <div className={styles.collapse__box_preview}>
        {!isPreview ? (
          <Skeleton.Image className={styles.collapse__box_preview_image} style={{ height: "120px", width: "120px" }} />
        ) : (
          <img src={previewSrc} alt={data.name} className={styles.collapse__box_preview_image} />
        )}
      </div>
      <div className={styles.collapse__box_data}>
        <div className={styles.collapse__box_data_title}>{data.name}</div>
        <div className={styles.collapse__box_data_button_block}>
          <div className={styles.collapse__box_data_button_block_row}>
            {/* Мок.данные по кнопкам */}
            <ButtonCustom className={styles.collapse__box_data_button_block_custom_button} onClick={() => handleOpenProject(false)}>
              <span>{content.deals.detail_deal_card.tabs.projects.button_block.edit}</span>
            </ButtonCustom>
            <ButtonCustom className={styles.collapse__box_data_button_block_custom_button} onClick={() => handleOpenProject(true)}>
              <span>{content.deals.detail_deal_card.tabs.projects.button_block.show}</span>
            </ButtonCustom>
            <ButtonCustom className={styles.collapse__box_data_button_block_custom_button} disabled={true}>
              <span>{content.deals.detail_deal_card.tabs.projects.button_block.estimate}</span>
            </ButtonCustom>
          </div>
          <div className={styles.collapse__box_data_button_block_row}>
            <ButtonCustom className={styles.collapse__box_data_button_block_custom_button} disabled={true}>
              <span>{content.deals.detail_deal_card.tabs.projects.button_block.panorama}</span>
            </ButtonCustom>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCardProjectsData;
