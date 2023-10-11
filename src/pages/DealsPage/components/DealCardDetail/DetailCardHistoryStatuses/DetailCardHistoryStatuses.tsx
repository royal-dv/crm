import React, { useEffect, useRef, useState } from "react";
import { IDealHistoryStatusResponse, IDealStatusResponse } from "../../../../../services/Deals";
import styles from "./DetailCardHistoryStatuses.module.scss";
import moment from "moment";
import content from "../../../../../settings/content";

interface IProps {
  statusesHistory?: IDealHistoryStatusResponse[];
  statusesData?: IDealStatusResponse[];
}

interface IStatusItem {
  date: string;
  items: any;
}

const DetailCardHistoryStatuses: React.FC<IProps> = ({ statusesHistory, statusesData }) => {
  const statusesHistoryRef = useRef<HTMLDivElement>(null);
  const [statusesList, setStatusesList] = useState<IStatusItem[]>([]);

  useEffect(() => {
    const divElement = statusesHistoryRef.current;
    if (divElement) {
      divElement.scrollTop = divElement.scrollHeight;
    }
  });

  useEffect(() => {
    if (!statusesHistory) return;

    // Указал тип Any явно, так как при вервой итерации
    // получаем пустой объект {}
    const reducedData = statusesHistory.reduce((acc: any, curr) => {
      const { created_at, status } = curr;
      const converteDate = moment(created_at).format("DD.MM.YYYY");
      if (!acc[converteDate]) {
        acc[converteDate] = [];
      }
      acc[converteDate].push(curr.status);
      return acc;
    }, {});

    // Переведем в массив для удобной распечатки
    const convertToArray = Object.entries(reducedData).map((i) => {
      const item = {
        date: i[0],
        items: i[1],
      };
      return item;
    });

    setStatusesList(convertToArray);
  }, [statusesHistory]);

  return (
    <div className={styles.detailCardHistoryStatuses} ref={statusesHistoryRef}>
      {Array.from(statusesList).map((item, index) => {
        return (
          <div className={styles.detailCardHistoryStatuses__block} key={index}>
            <p className={styles.detailCardHistoryStatuses__date}>{item.date}</p>
            {item.items.map((status: string) => {
              return (
                <p className={styles.detailCardHistoryStatuses__status} key={status + index}>
                  {content.deals.detail_deal_card.history_statuses.label} "
                  {statusesData?.find((item) => item.id === status)?.name ?? status}"
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default DetailCardHistoryStatuses;
