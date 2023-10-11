import React, { useEffect, useState } from 'react'
import styles from './Leads.module.scss'
import content from '../../../settings/content'
import { useQuery } from 'react-query'
import { IUserData, getSelectedUserInfo } from '../../../services/User'

type IProps = {
    author_id: string
}

const LeadAuthor: React.FC<IProps> = ({author_id}) => {

    const [author, setAuthor] = useState<IUserData>()

    const { data: user } = useQuery({
        queryFn: () => getSelectedUserInfo(author_id),
        queryKey: ["userSelected"],
    });

    useEffect(() => {
        if(!user) return
        setAuthor(user)
    }, [user])
    
    
  return (
    <span className={styles.leads__createdBy}>{content.control.leads.from} {author?.name}</span>
  )
}

export default LeadAuthor