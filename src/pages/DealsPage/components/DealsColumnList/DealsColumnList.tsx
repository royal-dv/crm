import DealColumnHeader from "../DealColumnHeader/DealColumnHeader";
import DealCard from "../DealCard/DealCard";
import NotFound from "../../../../components/NotFound/NotFound";
import ButtonCustom from "../../../../components/ui//ButtonCustom/ButtonCustom";
import styles from "./DealsColumnList.module.scss";
import { IDealsColumnProps } from "../DealColumnHeader/DealColumnHeader";
import { IDeal } from "../../../../services/Deals";
import React, { Fragment } from "react";
import moment from "moment";
import content from "../../../../settings/content";
require("moment/locale/ru"); // подключаем локализацию для русского языка

moment.locale("ru"); // устанавливаем локаль для момента

export interface IDealsColumnListProps {
  id?: number | string | undefined;
  title: string;
  data: IDeal[];
  columns?: IDealsColumnProps[];
  onClick: (id: string) => void;
  selectedDealId: string;
}

const DealsColumnlist: React.FC<IDealsColumnListProps> = ({ data, title, id, onClick, selectedDealId }) => {
  return (
    <div className={styles.dealsContainer}>
      <DealColumnHeader title={title} count={data ? data.length : "0"} />
      <div className={styles.dealsContainer__column} key={id}>
        {data?.length ? (
          <div className={styles.dealsContainer__card}>
            {data.map(({ id, title, client_fullname, status, created_at }) => {
              return (
                <Fragment key={id}>
                  <DealCard
                    id={id}
                    title={title}
                    created_at={moment(created_at).format("DD/MM/YYYY")}
                    client_fullname={client_fullname}
                    status={status}
                    onClick={onClick}
                    isEditing={selectedDealId === id}
                  />
                </Fragment>
              );
            })}
          </div>
        ) : (
          <NotFound title={content.deals.board.not_found} />
        )}
        {data?.length ? (
          <div className={styles.dealsContainer__show}>
            <ButtonCustom className={styles.custom_button} disabled maxWidth="none"><span>{content.deals.board.show_all}</span></ButtonCustom>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DealsColumnlist;
