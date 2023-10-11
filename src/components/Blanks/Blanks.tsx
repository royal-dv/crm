import React, { useState } from "react";
import styles from "./Blanks.module.scss";
import ButtonCustom from "../ui/ButtonCustom/ButtonCustom";
import content from "../../settings/content";
import { Modal } from "antd";
import { ReactComponent as CloseIcon } from "../../assets/icons/cross.svg";
import AddBlank from "./AddBlank/AddBlank";
import OrderBlank from "./OrderBlank/OrderBlank";
import ListBlanks from "./ListBlanks/ListBlanks";

const enum BlankTypes {
  ADD = "add_blank",
  ORDER = "order_blank",
  LIST = "list_blank",
  EMPTY = "",
}

type Props = {};

const Blanks: React.FC<Props> = ({}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState("");
  const [isBlankEmpty, setIsBlankEmpty] = useState(true);
  const [alert, setAlert] = useState(false);

  const handleModal = (isOpen: boolean, type: string) => {
    if (!isBlankEmpty) {
      setAlert(true);
      return;
    }

    setIsModalOpen(isOpen);
    setType(type);
    setAlert(false);
  };

  const isBlankEmptyHanlder = (isEmpty: boolean) => {
    setIsBlankEmpty(isEmpty);
    return isEmpty;
  };

  const closeModalAndClear = () => {
    setAlert(false);
    setType("");
    setIsBlankEmpty(true);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.blanks}>
      <p className={styles.blanks__title}>{content.blanks.title}</p>
      <div className={styles.blanks__btns}>
        <ButtonCustom className={styles.blanks__btn} onClick={() => handleModal(true, BlankTypes.ADD)}>
          <span>{content.blanks.buttons.add}</span>
        </ButtonCustom>
        <ButtonCustom className={styles.blanks__btn} onClick={() => handleModal(true, BlankTypes.ORDER)}>
          <span>{content.blanks.buttons.order}</span>
        </ButtonCustom>
        <ButtonCustom className={styles.blanks__btn} onClick={() => handleModal(true, BlankTypes.LIST)}>
          <span>{content.blanks.buttons.list}</span>
        </ButtonCustom>
      </div>
      <Modal
        className={"custom_shop_modal"}
        open={alert}
        zIndex={9999999}
        centered
        mask={true}
        closeIcon={false}
        footer={false}
        width={340}
      >
        <div className={styles.blanks__warning}>
          <p>{content.blanks.warning.title}</p>
          <p>{content.blanks.warning.subtitle}</p>
          <div className={styles.blanks__warning_btns}>
            <ButtonCustom onClick={() => closeModalAndClear()} className={styles.blanks__close}>
              <span>{content.blanks.warning.close}</span>
            </ButtonCustom>
            <ButtonCustom onClick={() => setAlert(false)} isTransparent>
              <span>{content.blanks.warning.cancel}</span>
            </ButtonCustom>
          </div>
        </div>
      </Modal>
      <Modal
        destroyOnClose
        className={"custom_shop_modal"}
        open={isModalOpen}
        centered
        mask={false}
        onCancel={() => handleModal(false, BlankTypes.EMPTY)}
        closeIcon={false}
        footer={false}
        width={BlankTypes.ADD === type || BlankTypes.ORDER === type || BlankTypes.EMPTY === type ? 340 : 625}
      >
        <div className={styles.blanks__modal_header}>
          <span>
            {BlankTypes.ADD === type ? content.blanks.add_modal.form_title : null}
            {BlankTypes.ORDER === type ? content.blanks.order_modal.form_title : null}
            {BlankTypes.LIST === type ? content.blanks.list_modal.form_title : null}
          </span>
          <ButtonCustom
            isTransparent
            maxWidth="20px"
            className={styles.blanks__modal_close}
            onClick={() => handleModal(false, BlankTypes.EMPTY)}
          >
            <CloseIcon />
          </ButtonCustom>
        </div>
        {BlankTypes.ADD === type && <AddBlank />}
        {BlankTypes.ORDER === type && <OrderBlank isBlankEmpty={isBlankEmptyHanlder} isModalOpen={isModalOpen} />}
        {BlankTypes.LIST === type && <ListBlanks />}
      </Modal>
    </div>
  );
};

export default Blanks;
