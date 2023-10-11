import React, { useEffect, useState } from "react";
import styles from "../ShopsCards/ShopsCards.module.scss";
import content from "../../../../settings/content";
import InputCustom from "../../../../components/ui/InputCustom/InputCustom";
import { validateText } from "../../../../helpers/validateInputs";
import ButtonCustom from "../../../../components/ui/ButtonCustom/ButtonCustom";
import { useMutation } from "react-query";
import { IAddShop, addShop } from "../../../../services/Shops";
import { message } from "antd";
import { addDepartment } from "../../../../services/Department";
import { ReactComponent as AddIcon } from "../../../../assets/icons/add.svg";

interface IProps {
  refetchShopsAndClose: () => void;
}

const initialState = {
  id: "",
  name: "",
  address: "",
};

const CreateShop: React.FC<IProps> = ({ refetchShopsAndClose }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [counter, setCounter] = useState(1);
  const [departments, setDepartments] = useState<[string, string][]>();
  const [inputData, setInputData] = useState(initialState);
  const [disabled, setDisabled] = useState(true);
  const [inputs, setInputs] = useState(content.organizations.shops.inputs_create);
  const { mutateAsync: onAddShop } = useMutation({
    mutationFn: addShop,
    onSuccess: () => {
      refetchShopsAndClose();
    },
  });

  const { mutateAsync: onAddDepartment } = useMutation({
    mutationFn: addDepartment,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });

    // Сделаем проверку для кнопки "Сохранить"
    const isDisabled = validateText(e.target.value);

    if (e.target.name === "name") {
      if (isDisabled || !e.target.value.length) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
      return;
    }
  };

  const getDataInput = (index: string) => inputData[index as keyof IAddShop];

  const addShopHandler = async () => {
    const shopData = { name: inputData.name, address: inputData.address };

    onAddShop(shopData).then((res) => {
      if (typeof res?.id !== "undefined") {
        // Если магази по какой-либо причине не был создан
        // Отделы нет смысла создавать, выходим и выводим ошибку
        addDepartmentHandler(res.id).then(() => {
          success();
        });
      } else {
        error();
      }
    });
  };

  useEffect(() => {
    if (!inputData) return;
    // Получим массив отделов, в виде картежа
    // [0] - name отдела
    // [1] - введенные данные

    // TODO - сделать проверку на пустую строку. Пустой отдел добавлять в базу не будем
    const getDepartments = Object.entries(inputData).filter((dep) => dep[0].includes("department"));
    setDepartments(getDepartments);
  }, [inputData]);

  const addDepartmentHandler = async (shop_id: string) => {
    // Пройдемся по каждому значению и запишем данные в базу
    departments?.forEach((i) => {
      onAddDepartment({
        name: i[1],
        shop_id: shop_id,
      });
    });
  };

  // При добавлении отдела, нужно создать новый инпут объект
  // с уникальным ID для этого используем state - counter
  const addDepartmentInput = (dep: string) => {
    const departments = {
      id: `department_id_${counter}`,
      name: `department_${counter}`,
      placeholder: "Название отдела",
      title: "",
      enabled: true,
      options: false,
    };

    setInputs([...inputs, departments]);
    setCounter((prev) => prev + 1);
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: content.alert_messages.shops.create.success_shop,
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: content.alert_messages.shops.create.error_shop,
    });
  };

  return (
    <div className={styles.shopsCards__inputs_wrapper}>
      {contextHolder}
      {inputs.map((input) => {
        return (
          <div key={input.id} className={styles.shopsCards__input}>
            <div className={styles.shopsCards__lables}>
              <label htmlFor={input.id}>{input.title}</label>
              {input.options && (
                <div className={styles.shopsCards__add} onClick={() => addDepartmentInput(getDataInput(input.name) || "")}>
                  <AddIcon />
                </div>
              )}
            </div>
            {input.name === "department" ? null : (
              <InputCustom
                className={styles.custom_input}
                placeholder={input.placeholder}
                name={input.name}
                onChange={(e) => handleChange(e)}
                value={getDataInput(input.name)}
                disabled={!input.enabled}
                status={input.name !== "name" ? "" : validateText(String(getDataInput(input.name)))}
              />
            )}
          </div>
        );
      })}
      <ButtonCustom onClick={addShopHandler} className={styles.shopsCards__save} disabled={disabled}>
        <span>{content.organizations.shops.save}</span>
      </ButtonCustom>
    </div>
  );
};

export default CreateShop;
