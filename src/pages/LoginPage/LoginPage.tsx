import React, { useState } from "react";
import styles from "./LoginPage.module.scss";
import InputMask from "react-input-mask";
import { Form, Radio, RadioChangeEvent, message } from "antd";
import InputCustom from "../../components/ui/InputCustom/InputCustom";
import { validateEmail, validatePassword } from "../../helpers/validateInputs";
import { formatPhone } from "../../helpers/formatString";
import ButtonCustom from "../../components/ui/ButtonCustom/ButtonCustom";
import "./LoginPage_override.scss";
import { useMutation } from "react-query";
import { login } from "../../services/Authorization";
import Cookies from "js-cookie";
import LinkCustom from "../../components/ui/LinkCustom/LinkCustom";
import content from "../../settings/content";
import { NoticeType } from "antd/es/message/interface";

type Props = {};

const EMAIL_FROM_STORAGE = localStorage.getItem("user_email") ?? "";

const LoginPage = (props: Props) => {
  const { mutateAsync: authRequest } = useMutation({
    mutationFn: login,
  });

  const [loginType, setLoginType] = useState<"email" | "phone">("email");
  const [messageApi, contextHolder] = message.useMessage();
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("" || EMAIL_FROM_STORAGE);
  const [password, setPassword] = useState<string>("");

  const onLoginTypeChange = (e: RadioChangeEvent) => {
    setPhone("");
    setEmail("");
    setPassword("");
    setLoginType(e.target.value);
  };
  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatedPhone = formatPhone(e.target.value);
    setPhone(formatedPhone);
  };
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const isLoginDisabled = () => {
    if (
      ((validateEmail(email) === "" && email !== "") || phone?.toString().length === 11) &&
      validatePassword(password) === "" &&
      password !== ""
    ) {
      return false;
    }
    return true;
  };

  const onLogin = async () => {
    authRequest(
      loginType === "email"
        ? { key: "org-2-key-1", login: email, password: password }
        : { key: "org-2-key-1", login: phone, password: password },
    ).then((response) => {
      if (response?.access_token && response?.refresh_token) {
        Cookies.set("access_token", response.access_token);
        Cookies.set("refresh_token", response.refresh_token);
        window.location.href = "/";
      } else {
        alert("error", content.alert_messages.login.error);
      }
    });
  };

  const alert = (type: NoticeType, content: string) => {
    messageApi.open({
      type: type,
      content: content,
    });
  };

  return (
    <div className={styles.loginPage__container}>
      {contextHolder}
      <h1 className={styles.loginPage__title}>{content.login.title}</h1>
      <Radio.Group onChange={onLoginTypeChange} value={loginType}>
        {content.login.tabs.map((tab) => {
          return (
            <Radio.Button className={styles.loginPage__typeBtn} value={tab.value}>
              {tab.title}
            </Radio.Button>
          );
        })}
      </Radio.Group>
      <Form className={styles.loginPage__form}>
        <div className={styles.loginPage__form_inputs}>
          {loginType === "phone" && (
            <InputMask
              className={`${styles.loginPage__form_phone} ant-input`}
              mask={content.login.form.phone.mask}
              maskChar=" "
              placeholder={content.login.form.phone.placeholder}
              value={phone}
              onChange={onPhoneChange}
            />
          )}
          {loginType === "email" && (
            <>
              <InputCustom
                type="text"
                status={validateEmail(email)}
                value={email}
                onChange={onEmailChange}
                placeholder={content.login.form.email.placeholder}
              />
            </>
          )}
          <InputCustom
            type="password"
            status={validatePassword(password)}
            value={password}
            onChange={onPasswordChange}
            placeholder={content.login.form.password.placeholder}
          />
        </div>
        <div className={styles.loginPage__form_footer}>
          <ButtonCustom
            htmlType="submit"
            type="primary"
            children={<span>{content.login.footer.button_title}</span>}
            onClick={onLogin}
            className={styles.loginPage__form_submit}
            disabled={isLoginDisabled()}
          />
          <LinkCustom
            title={content.login.footer.reset_password.title}
            to={content.login.footer.reset_password.path}
            className={styles.loginPage__passwordReset}
          />
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
