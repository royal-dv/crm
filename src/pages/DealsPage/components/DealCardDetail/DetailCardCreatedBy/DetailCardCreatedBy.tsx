import moment from "moment";
import React from "react";
import { useQuery } from "react-query";
import { getSelectedUserInfo } from "../../../../../services/User";

interface IProps {
    created_by: string
    created_at?: string
}

const DetailCardCreatedBy: React.FC<IProps> = ({ created_by, created_at}) => {

    const {data: selectedUser} = useQuery({
      queryFn: () => getSelectedUserInfo(created_by),
      queryKey: ["selectedUser"],
      enabled: !!created_by
    })

    return (
        <>
            <span>{moment(created_at).format("DD.MM.YYYY")}</span>
            <span>{!created_by ? "" : selectedUser?.name}</span>
        </>
    )
};

export default DetailCardCreatedBy;
