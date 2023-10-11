import content from "../../../settings/content";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import styles from "./LoadMore.module.scss";

const LoadMore = () => {
  return (
    <div className={styles.gallery_loadmore}>
      <ButtonCustom>
        <span>{content.gallery.show_all}</span>
      </ButtonCustom>
    </div>
  );
};

export default LoadMore;
