import React, { useEffect, useState } from "react";
import styles from "./AddBlank.module.scss";
import ButtonCustom from "../../ui/ButtonCustom/ButtonCustom";
import content from "../../../settings/content";
import DatePickerCustom, { IPeriod } from "../../ui/DatePickerCustom/DatePickerCutsom";
import UploadCustom from "../../ui/UploadCustom/UploadCustom";
import { uploadFile } from "../../../services/FileController";
import { useMutation } from "react-query";
import { addBlank } from "../../../services/Blanks";
import { NoticeType } from "antd/es/message/interface";
import { message } from "antd";

type Props = {};

interface IFile {
  id: string;
  name: string;
}

const AddBlank: React.FC<Props> = ({}) => {
  const [date, setDate] = useState<IPeriod>();
  const [isDisabled, setIsDisabled] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<IFile>();
  const [messageApi, contextHolder] = message.useMessage();

  const { mutateAsync: onUploadFile } = useMutation({
    mutationFn: uploadFile,
  });

  const { mutateAsync: onAddBlank } = useMutation({
    mutationFn: addBlank,
  });

  const getDate = (data: IPeriod) => setDate(data);

  useEffect(() => {
    if (!date?.to || !date.from || !uploadedFiles) {
      setIsDisabled(true);
      return;
    }
    setIsDisabled(false);
  }, [date, uploadedFiles]);

  const handleBlankToAdd = async () => {
    // Если по какой-либо причине кнопка стала активной
    // но у нас еще не прикреплен файл или не указаны даты
    // выходим, чтобы не отправлять пустой запрос
    if (!uploadedFiles || !date) return;

    onAddBlank({
      file_id: uploadedFiles?.id,
      start: date?.from,
      end: date?.to,
    }).then((response) => {
      if (response.status === 200) {
        alert("success", content.alert_messages.add_blank.success_blank);
      } else {
        alert("error", content.alert_messages.add_blank.error_blank);
      }
    });
  };

  const alert = (type: NoticeType, content: string) => {
    messageApi.open({
      type: type,
      content: content,
    });
  };

  // Преобразуем прикрепленный файл в FormData
  // На данный момент можно отправить только один файл
  const uploadedFilesHandler = async (files: any) => {
    const formData = new FormData();
    formData.append(files[0].name, files[0].originFileObj);

    onUploadFile(formData).then((response) => {
      if (response.status === 200) {
        const file = {
          id: response.id,
          name: files[0].name,
        };
        setUploadedFiles(file);
      }
    });
  };

  return (
    <div className={styles.addBlank}>
      {contextHolder}
      <div className={styles.addBlank__block}>
        <div className={styles.addBlank__content}>
          <span>{content.blanks.add_modal.block_1.index}</span>
          <span>{content.blanks.add_modal.block_1.text}</span>
        </div>
        <UploadCustom uploadedFiles={uploadedFilesHandler} numberFilesToUpload={1} typesOfFiles={["image/png", "image/jpeg", "image/jpg"]}>
          <ButtonCustom maxWidth="200px" className={styles.addBlank__download_btn}>
            <span>{content.blanks.add_modal.block_1.download}</span>
          </ButtonCustom>
        </UploadCustom>
      </div>
      <div className={styles.addBlank__block}>
        <div className={styles.addBlank__content}>
          <span>{content.blanks.add_modal.block_2.index}</span>
          <span>{content.blanks.add_modal.block_2.text}</span>
        </div>
        <div className={styles.addBlank__date}>
          <DatePickerCustom format="YYYY-MM-DD" getDate={getDate} />
        </div>
      </div>
      <div className={styles.addBlank__send}>
        <ButtonCustom maxWidth="200px" disabled={isDisabled} className={styles.addBlank__send_btn} onClick={() => handleBlankToAdd()}>
          <span>{content.blanks.add_modal.send}</span>
        </ButtonCustom>
      </div>
    </div>
  );
};

export default AddBlank;
