import GalleryFilters from "./GalleryFilters/GalleryFilters";
import GalleryCards from "./GalleryCards/GalleryCards";
import PageTitle from "../../components/ui/PageTitle/PageTitle";
import content from "../../settings/content";
import styles from "./Gallery.module.scss";
import { useState } from "react";
interface ISourceSelect {
  value: string;
  select_name: string;
}
const Gallery = () => {
  const [searchQuery, setSearchQuery] = useState<ISourceSelect>();
  const [refetchProjects, setRefethchProjects] = useState(false);

  const HandleSearchQuery = (select_name: string, value: string) => {
    setSearchQuery({ select_name: select_name, value: value });
  };

  const handleUpdateProjects = () => {
    setRefethchProjects(!refetchProjects);
  };

  return (
    <section className={styles.gallery}>
      <div className={styles.gallery__header}>
        <PageTitle title={content.gallery.title} />
        <GalleryFilters setSearchQuery={HandleSearchQuery} updateProjects={handleUpdateProjects} />
      </div>
      <div className={styles.gallery__container}>
        <GalleryCards searchQuery={searchQuery} refetchProjects={refetchProjects} />
      </div>
    </section>
  );
};

export default Gallery;
