import styles from './DealColumnHeader.module.scss'

export interface IDealsColumnProps {
  id?: string | number
  title?: string
  status?: string
  count?: string | number
}

const DealColumnHeader: React.FC<IDealsColumnProps> = ({ title, count }) => {
  return (
    <div className={styles.status_container}>
      <span className={styles.status}>{title}</span>
      <span className={styles.deals_count}>{count}</span>
    </div>
  )
}

export default DealColumnHeader
