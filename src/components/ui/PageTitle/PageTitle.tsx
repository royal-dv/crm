import styles from './PageTitle.module.scss';

interface IPageTitleProps {
    title: string
}

const PageTitle: React.FC<IPageTitleProps> = ({title}) => <h1 className={styles.page_title}>{title}</h1>

export default PageTitle;
