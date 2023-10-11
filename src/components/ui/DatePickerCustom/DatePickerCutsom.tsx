import React, { useEffect, useState } from "react";
import styles from "./DatePicker.module.scss";
import { DatePicker } from "antd";
import locale from "antd/es/date-picker/locale/ru_RU";
import "dayjs/locale/ru";
import dayjs from "dayjs";
import content from "../../../settings/content";

const enum periodTypes {
  FROM = "from",
  TO = "to",
}

export interface IPeriod {
  from: string;
  to: string;
}

type Props = {
  format?: string;
  getDate: (data: IPeriod) => void;
  validate?: boolean;
};

// TODO
// 1. Не работает формат, погрузится в проблему и понять почему не работает...

const DatePickerCustom: React.FC<Props> = ({ format, getDate, validate = true }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [validateDate, setValidateDate] = useState(false);

  const handleChangeDate = (period: string, date: string) => {
    if (periodTypes.FROM === period) {
      setFrom(date);
    }
    if (periodTypes.TO === period) {
      setTo(date);
    }
  };

  useEffect(() => {
    // Включим / выключим валидацию полей дат
    // Дата не С не может быть больше даты ПО
    // и наоборот
    if (validate) {
      if (dayjs(from).isAfter(to)) {
        const selectedPeriod = { from: "", to: "" };
        getDate(selectedPeriod);
        setValidateDate(dayjs(from).isAfter(to));
        return;
      }
    } else {
      setValidateDate(false);
    }

    if (!from && !to) {
      const selectedPeriod = { from: "", to: "" };
      getDate(selectedPeriod);
      return;
    }
    let fromData = from;
    let toData = to;
    const selectedPeriod = { from: fromData, to: toData };
    getDate(selectedPeriod);
  }, [from, to]);

  return (
    <div className={styles.datePicker}>
      <div className={styles.datePicker__date}>
        <div className={styles.datePicker__date_block}>
          <span>{content.blanks.add_modal.from}</span>
          <DatePicker
            status={!from || validateDate ? "error" : ""}
            locale={locale}
            allowClear={false}
            onChange={(dateString) => handleChangeDate(periodTypes.FROM, dayjs(dateString).format(format))}
          />
        </div>
        <div className={styles.datePicker__date_block}>
          <span>{content.blanks.add_modal.to}</span>
          <DatePicker
            status={!to || validateDate ? "error" : ""}
            locale={locale}
            allowClear={false}
            onChange={(dateString) => handleChangeDate(periodTypes.TO, dayjs(dateString).format(format))}
          />
          {validateDate ? <span className={styles.datePicker__hint}>{content.date_picker.hint}</span> : null}
        </div>
      </div>
    </div>
  );
};

export default DatePickerCustom;
