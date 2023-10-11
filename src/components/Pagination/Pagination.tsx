import ReactPaginate, { ReactPaginateProps } from "react-paginate";
import content from "../../settings/content";
import styles from "./Pagination.module.scss";
import { ReactComponent as PaginateArrow } from "../../assets/icons/paginate_arrow.svg";

interface IPaginationProps extends ReactPaginateProps {}

const Pagination: React.FC<IPaginationProps> = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={onPageChange}
      breakLabel={content.pagination.break_label}
      previousLabel={<PaginateArrow />}
      nextLabel={<PaginateArrow />}
      containerClassName={styles.pagination}
      pageClassName={styles.pagination__pageItem}
      previousClassName={`${styles.pagination__pageItem}`}
      nextClassName={`${styles.pagination__pageItem} ${styles.pagination__nextItem}`}
      activeClassName={styles.pagination__pageItem_isActive}
      pageLinkClassName={styles.pagination__link}
      previousLinkClassName={styles.pagination__link}
      nextLinkClassName={styles.pagination__link}
      breakLinkClassName={styles.pagination__link}
      disabledClassName={styles.pagination__pageItem_disabled}
    />
  );
};

export default Pagination;
