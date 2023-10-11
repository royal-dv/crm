import React, { useState } from "react";
import OrganizationHeader from "../OrganizationHeader/OrganizationHeader";
import ButtonCustom from "../../../components/ui/ButtonCustom/ButtonCustom";
import { message } from "antd";
import { NoticeType } from "antd/es/message/interface";
import StuffCardDetail from "./StuffCardDetail/StuffCardDetail";
import styles from "./Stuff.module.scss";
import content from "../../../settings/content";
import StuffCardList from "./StuffCard/StuffCardList";
import { getAllStuff } from "../../../services/User";
import { useQuery } from "react-query";
import Loader from "../../../components/ui/Loader/Loader";
import { getShops } from "../../../services/Shops";
import { getDepartment } from "../../../services/Department";

export interface IProps {}

export const enum modalStuffTypes {
  CREATE = "create",
  EDIT = "edit",
  EMPTY = "",
}

const Stuff: React.FC<IProps> = ({}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpen, setIsOpen] = useState<string>(modalStuffTypes.EMPTY);

  const {
    data: stuff,
    refetch,
    isLoading,
  } = useQuery({
    queryFn: () => getAllStuff(),
    queryKey: ["stuff"],
  });

  const { data: shops } = useQuery({
    queryFn: () => getShops(),
    queryKey: ["shops"],
  });

  const { data: departments } = useQuery({
    queryFn: () => getDepartment(),
    queryKey: [`departments`],
  });

  const handleCloseModal = () => {
    setIsOpen(modalStuffTypes.EMPTY);
  };

  const handleExcel = () => {
    console.log("excel");
  };

  const createAndRefetch = () => {
    handleCloseModal();
    refetch();
    alert("success", content.alert_messages.stuffs.create.success_stuff);
  };

  const editAndRefetch = () => {
    handleCloseModal();
    refetch();
    alert("success", content.alert_messages.stuffs.edit.success_stuff);
  };

  const alert = (type: NoticeType, content: string) => {
    messageApi.open({
      type: type,
      content: content,
    });
  };

  return (
    <div className={styles.stuff}>
      {contextHolder}
      <OrganizationHeader title={content.organizations.stuff.title} placeholder={content.organizations.stuff.search_placeholder} />
      <div className={styles.stuff__wrapper}>
        <div className={styles.stuff__container}>
          <div className={styles.stuff__headers}>
            {content.organizations.stuff.headers.map((header) => {
              return (
                <div key={header.id} className={styles.stuff__header_item}>
                  {header.name}
                </div>
              );
            })}
          </div>
          <div className={styles.stuff__cards}>
            {stuff && !isLoading && shops && departments ? (
              <StuffCardList setIsOpen={setIsOpen} stuff={stuff} isLoading={isLoading} departments={departments} shops={shops} />
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>

      <div className={styles.stuff__footer}>
        <ButtonCustom
          maxWidth="170px"
          onClick={() => setIsOpen(modalStuffTypes.CREATE)}
          children={<span>{content.organizations.stuff.footer.add}</span>}
        />
        <ButtonCustom
          disabled={true}
          maxWidth="170px"
          onClick={handleExcel}
          children={<span>{content.organizations.stuff.footer.excel}</span>}
        />
      </div>
      {departments && shops && (
        <StuffCardDetail
          isEdit={isOpen}
          open={isOpen !== modalStuffTypes.EMPTY}
          onCancel={() => handleCloseModal()}
          editAndRefetch={editAndRefetch}
          createAndRefetch={createAndRefetch}
          departments={departments}
          shops={shops}
        />
      )}
    </div>
  );
};

export default Stuff;
