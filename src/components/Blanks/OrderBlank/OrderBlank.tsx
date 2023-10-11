import React, { useEffect, useState } from "react";
import styles from "./OrderBlank.module.scss";
import content from "../../../settings/content";
import ButtonCustom from "../../ui/ButtonCustom/ButtonCustom";
import UploadCustom from "../../ui/UploadCustom/UploadCustom";
import TextArea from "antd/es/input/TextArea";
import DatePickerCustom, { IPeriod } from "../../ui/DatePickerCustom/DatePickerCutsom";
import { validateText } from "../../../helpers/validateInputs";

type Props = {
  isBlankEmpty: (isEmpty: boolean) => boolean;
  isModalOpen: boolean;
};

interface IOrder {
  colors: string;
  fonts: string;
  contacts: string;
  comments: string;
  phone: string;
}

const initialState: IOrder = {
  colors: "",
  fonts: "",
  contacts: "",
  comments: "",
  phone: "",
};

const OrderBlank: React.FC<Props> = ({ isBlankEmpty, isModalOpen }) => {
  const [order, setOrder] = useState(initialState);
  const [date, setDate] = useState<IPeriod>();
  const [isDisabled, setIsDisabled] = useState(false);
  const [checkTextAreas, setCheckTextAreas] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    checkIsBlankEmpty();
    if (!date?.to || !date.from || !uploadedFiles.length || !checkTextAreas) {
      setIsDisabled(true);
      return;
    }
    setIsDisabled(false);
  }, [order, date, uploadedFiles, checkTextAreas, alert]);

  useEffect(() => {
    if (isModalOpen) return;
    setOrder(initialState);
    setUploadedFiles([]);
    setDate({ from: "", to: "" });
  }, [isModalOpen]);

  const checkIsBlankEmpty = () => {
    const isTextAreasEmpty = Object.values(order).filter((i) => i !== "");

    if (isTextAreasEmpty.length || uploadedFiles.length || date?.to || date?.from) {
      isBlankEmpty(false);
    } else {
      isBlankEmpty(true);
    }
  };

  const getDate = (data: IPeriod) => setDate(data);

  const handleOrderData = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const isTextAreasEmpty = Object.values(order).filter((i) => i === "");
    if (isTextAreasEmpty.length) {
      setCheckTextAreas(false);
      return;
    }
    setCheckTextAreas(true);
  }, [order]);

  const handleSubmitOrder = () => {
    const data = { ...order, period: { ...date }, uploadedFiles: { ...uploadedFiles } };
    console.log("order blank: ", data);
  };

  const uploadedFilesHandler = (files: any) => {
    setUploadedFiles(files);
  };

  return (
    <div className={styles.orderBlank}>
      <div className={styles.orderBlank__block}>
        <div className={styles.orderBlank__content}>
          <span>{content.blanks.order_modal.block_upload.index}</span>
          <span>{content.blanks.order_modal.block_upload.text}</span>
        </div>
        <UploadCustom
          numberFilesToUpload={1}
          uploadedFiles={uploadedFilesHandler}
          typesOfFiles={["image/png", "image/jpeg", "image/jpg"]}
          //   typesOfFiles={["application/pdf", "application/illustrator", "application/postscript"]}
        >
          <ButtonCustom maxWidth="200px" className={styles.orderBlank__download_btn}>
            <span>{content.blanks.order_modal.block_upload.download}</span>
          </ButtonCustom>
        </UploadCustom>
      </div>
      {content.blanks.order_modal.textareas.map((textarea) => {
        return (
          <div className={styles.orderBlank__block} key={textarea.name_textarea}>
            <div className={styles.orderBlank__content}>
              <span>{textarea.index}</span>
              <span>{textarea.text}</span>
            </div>
            <TextArea
              onChange={(e) => handleOrderData(e)}
              value={order[textarea.name_textarea as keyof IOrder]}
              status={validateText(order[textarea.name_textarea as keyof IOrder])}
              name={textarea.name_textarea}
              placeholder={textarea.placeholder}
            ></TextArea>
          </div>
        );
      })}
      <div className={styles.orderBlank__block}>
        <div className={styles.orderBlank__content}>
          <span>{content.blanks.order_modal.block_date.index}</span>
          <span>{content.blanks.order_modal.block_date.text}</span>
        </div>
        <div className={styles.orderBlank__date}>
          <DatePickerCustom format="YYYY-MM-DD" getDate={getDate} />
        </div>
      </div>
      <div className={styles.orderBlank__send}>
        <ButtonCustom maxWidth="200px" disabled={isDisabled} className={styles.orderBlank__send_btn} onClick={() => handleSubmitOrder()}>
          <span>{content.blanks.order_modal.send}</span>
        </ButtonCustom>
      </div>
    </div>
  );
};

export default OrderBlank;
