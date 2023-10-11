import { IProject } from "../../../services/Projects";
import styles from "./GalleryCard.module.scss";
import "./GalleryCard_override.scss";
import { Skeleton } from "antd";
import { useState } from "react";

interface ICard {
  project: IProject;
  handleCardClick: (id: string) => void;
}

const GalleryCard: React.FC<ICard> = ({ project, handleCardClick }) => {
  const [isPreview, setIsPreview] = useState<boolean>();
  const previewSrc = `https://presales.storage.yandexcloud.net/${project.id}/small.png`;

  const projectPreview = new Image();
  projectPreview.src = previewSrc;
  projectPreview.onload = function () {
    setIsPreview(true);
  };
  projectPreview.onerror = function () {
    setIsPreview(false);
  };

  return (
    <div className={styles.gallery__card} onClick={() => handleCardClick(project.id)}>
      <div className={styles.gallery__block}>
        <p className={styles.gallery__card_title}>{project.name ? project.name : "Без названия"}</p>
        <div className={styles.gallery__img_block}>
          {!isPreview ? (
            <Skeleton.Image className="custom_styles" />
          ) : (
            <img src={previewSrc} alt={project.name} className={styles.gallery__img} />
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;
