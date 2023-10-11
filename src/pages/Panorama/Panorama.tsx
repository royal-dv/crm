import styles from "./Panorama.module.scss";
import content from "../../settings/content";
import LinkCustom from "../../components/ui/LinkCustom/LinkCustom";
import { useParams } from "react-router";
import ProjectPanorama from "../Gallery/GalleryCardDetailed/ProjectPanorama";

interface IPanorama {}

interface IParams {
  id: string;
  pano: string;
}

const Panorama: React.FC<IPanorama> = ({}) => {
  const { id, pano } = useParams<IParams>();
  return (
    <div className={styles.panorama}>
      <div className={styles.panorama__data}>
        <ProjectPanorama
          panoramaUrl={`https://url/${id}/url/${pano}`}
          id={id}
          height="100%"
          sceneId={`${id} scene`}
        />
      </div>
      <LinkCustom className={styles.panorama__link} to={content.panorama.path} title={content.panorama.link} />
    </div>
  );
};

export default Panorama;
