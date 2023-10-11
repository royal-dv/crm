import React, { useState } from "react";
import styles from "./DealCardCreate.module.scss";
import InputMask from "react-input-mask";
import InputCustom from "../../../../components/ui/InputCustom/InputCustom";
import ButtonCustom from "../../../../components/ui/ButtonCustom/ButtonCustom";
import "./DealCardCreate_override.scss";
import { validateEmail, validateText } from "../../../../helpers/validateInputs";
import { formatPhone } from "../../../../helpers/formatString";
import Modal from "antd/es/modal/Modal";
import { useMutation } from "react-query";
import { addDeal } from "../../../../services/Deals";
import { message } from "antd";
import Loader from "../../../../components/ui/Loader/Loader";
import content from "../../../../settings/content";
import { NoticeType } from "antd/es/message/interface";

interface IDealCardCreateProps {
  open: boolean;
  onCancel: () => void;
  updateDealsList: () => void;
  handleSuccess?: (id: string) => void;
  openModalDetail?: (id: string) => any;
}

interface IData {
  client_fullname: string;
  client_email: string;
  title: string;
  client_phone: string;
  renovation_stage: string;
  room_type: string;
  surface_area: 0;
  comment: string;
  estate_name: string;
}

const DealCardCreate: React.FC<IDealCardCreateProps> = ({ open, onCancel, updateDealsList, handleSuccess, openModalDetail }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { mutateAsync: onAddDeal } = useMutation({
    mutationFn: addDeal,
    onSuccess: () => {
      updateDealsList();
    },
  });

  const [data, setData] = useState({
    client_fullname: "",
    client_email: "",
    title: "",
    client_phone: "",
    renovation_stage: "",
    room_type: "",
    surface_area: 0,
    comment: "",
    estate_name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    onAddDeal({
      client_fullname: data.client_fullname,
      client_email: data.client_email,
      title: data.title,
      client_phone: formatPhone(data.client_phone),
      renovation_stage: data.renovation_stage,
      room_type: data.room_type,
      surface_area: +data.surface_area,
      comment: data.comment,
      estate_name: data.estate_name,
    }).then((res) => {
      if (!res) {
        return alert("error", content.alert_messages.deals.create.error_deal);
      }
      if (res.status === 200) {
        alert("success", content.alert_messages.deals.create.success_deal);
        resetData();
        <Loader />;
        onCancel();
        if (handleSuccess) {
          handleSuccess(res.id);
        }
        if (openModalDetail) {
          openModalDetail(res.id);
        }
      } else {
        alert("error", content.alert_messages.deals.create.error_deal);
      }
    });
  };

  const isDisabled = () => {
    if (
      ((validateEmail(data.client_email) === "" && data.client_email !== "") || data.client_phone !== "") &&
      validateText(data.client_fullname) === "" &&
      data.client_fullname !== "" &&
      validateText(data.title) === "" &&
      data.title !== ""
    ) {
      return false;
    }
    return true;
  };

  const resetData = () => {
    setData({
      client_fullname: "",
      client_email: "",
      title: "",
      client_phone: "",
      renovation_stage: "",
      room_type: "",
      surface_area: 0,
      comment: "",
      estate_name: "",
    });
  };

  const alert = (type: NoticeType, content: string) => {
    messageApi.open({
      type: type,
      content: content,
    });
  };

  const getDataInput = (index: string) => data[index as keyof IData];

  return (
    <Modal
      zIndex={99999}
      open={open}
      onCancel={onCancel}
      centered
      title={content.deals.deal_card_create.title}
      footer={[
        <ButtonCustom className={styles.custom_button} disabled={isDisabled()} onClick={handleSubmit}>
          <span>{content.deals.deal_card_create.submit}</span>
        </ButtonCustom>,
      ]}
      width={340}
    >
      {contextHolder}
      <div className={styles.dealCardCreate}>
        {content.deals.deal_card_create.dealCardInputs.map((input) => {
          return (
            <div key={input.id} className={styles.dealCardCreate__input}>
              {input.required && <span>*</span>}
              {input.type === "mask" ? (
                <InputMask
                  className={`${styles.custom_input} ${styles.dealCardCreate__input_phone}`}
                  placeholder={input.placeholder}
                  mask={input.mask || ""}
                  maskChar={input.maskChar}
                  name={input.name}
                  value={getDataInput(input.name)}
                  onChange={handleChange}
                />
              ) : (
                <InputCustom
                  className={styles.custom_input}
                  placeholder={input.placeholder}
                  name={input.name}
                  value={getDataInput(input.name)}
                  onChange={handleChange}
                  style={{ display: input.name === "room_type" ? "none" : "block" }}
                  status={
                    input.required && input.type === "email"
                      ? validateEmail(String(getDataInput(input.name)))
                      : input.required && input.type === ""
                      ? validateText(String(getDataInput(input.name)))
                      : ""
                  }
                />
              )}
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default DealCardCreate;
