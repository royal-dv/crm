import React, { useState } from "react";
import styles from "./ResetPassword.module.scss";
import InputMask from "react-input-mask";
import InputCustom from "../../components/ui/InputCustom/InputCustom";
import { formatPhone } from "../../helpers/formatString";
import ButtonCustom from "../../components/ui/ButtonCustom/ButtonCustom";
import LinkCustom from "../../components/ui/LinkCustom/LinkCustom";
import content from "../../settings/content";

type Props = {};

const ResetPassword = (props: Props) => {
  const [phone, setPhone] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatedPhone = formatPhone(e.target.value);
    setPhone(formatedPhone);
  };

  const onCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 4) {
      setCode(e.target.value);
    }
  };
  const isCodeDisabled = () => {
    if (phone?.toString().length === 11 && code.length === 4) {
      return false;
    }
    return true;
  };

  return (
    <div className={styles.resetLoginPage__container}>
      <h1 className={styles.resetLoginPage__title}>{content.reset_password.title}</h1>
      <div className={styles.resetLoginPage__inputs}>
        <InputMask
          className={`${styles.resetLoginPage__phone} ant-input`}
          mask={content.reset_password.mask}
          maskChar=" "
          placeholder={content.reset_password.placeholder.phone}
          value={phone}
          onChange={onPhoneChange}
        />
        <InputCustom
          type="number"
          status={code.length === 4 || 0 ? "" : "error"}
          value={code}
          onChange={onCodeChange}
          placeholder={content.reset_password.placeholder.sms_code}
        />
      </div>
      <div className={styles.resetLoginPage__btns}>
        <ButtonCustom
          type="primary"
          children={<span>{content.reset_password.get_code}</span>}
          disabled={isCodeDisabled()}
          onClick={() => {}}
          className={styles.loginPage__submit}
        />
        <span className={styles.resetLoginPage__hint}>{content.reset_password.hint}</span>
        <LinkCustom
          title={content.reset_password.button_back_title}
          to={content.reset_password.button_back_path}
          className={styles.loginPage__passwordReset}
        />
      </div>
    </div>
  );
};

export default ResetPassword;
