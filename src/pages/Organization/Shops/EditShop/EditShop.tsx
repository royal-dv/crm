import React, { useEffect, useState } from "react";
import styles from "../ShopsCards/ShopsCards.module.scss";
import content from "../../../../settings/content";
import InputCustom from "../../../../components/ui/InputCustom/InputCustom";
import { IShop } from "../ShopsCards/ShopsCards";
import { validateText } from "../../../../helpers/validateInputs";
import ButtonCustom from "../../../../components/ui/ButtonCustom/ButtonCustom";
import { useMutation, useQuery } from "react-query";
import { IAddShop, editShop } from "../../../../services/Shops";
import { message } from "antd";
import { IGetDepartments, addDepartment, editDepartment, getDepartment } from "../../../../services/Department";
import { ReactComponent as AddIcon } from "../../../../assets/icons/add.svg";

interface IProps {
  data: IShop;
  refetchShopsAndClose: () => void;
}

interface IAdditionalDepartments {
  [key: string]: string;
}

const initialState: IAddShop = {
  name: "",
  address: "",
};

const EditShop: React.FC<IProps> = ({ data, refetchShopsAndClose }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [departmentsData, setDepartmentsData] = useState<IGetDepartments>();
  const [inputs, setInputs] = useState(content.organizations.shops.inputs_edit);
  const [inputData, setInputData] = useState<IShop>(initialState);

  const getDataInput = (index: string) => inputData[index as keyof IShop];

  const { mutateAsync: onEditShop } = useMutation({
    mutationFn: editShop,
  });

  const { mutateAsync: onEditDepartment } = useMutation({
    mutationFn: editDepartment,
  });

  const { mutateAsync: onAddDepartment } = useMutation({
    mutationFn: addDepartment,
  });

  const { data: departments, refetch } = useQuery({
    queryFn: () => getDepartment(inputData.id || ""),
    queryKey: [`departments_${inputData.id}`],
  });

  useEffect(() => {
    if (!departments) return;
    setDepartmentsData(departments);
  }, [departments]);

  // При редактировании отдела нужно получить отделы магазина (если они есть)
  // и по их кол-ву создать инпуты
  // Чтобы инпуты не задваивались, будем работать с локальным массивом из массива content
  useEffect(() => {
    if (!departmentsData) return;

    const initialInputs = [];

    // Создадим дополнительные инпуты для отрисовки
    // По аналогии из массива content
    const departmentInputs = departmentsData.data.map((dep, index) => {
      return {
        id: dep.id || `department_${dep.id}`,
        name: `department_${dep.id}`,
        placeholder: "Название отдела",
        title: "",
        enabled: true,
        options: false,
        hidden: false,
      };
    });

    initialInputs.push(...content.organizations.shops.inputs_edit, ...departmentInputs);

    // Если у магазина уже есть отделы, при открытие окна для редактирования
    // скроем первый пустой инпут
    // Если у магазина нет отделов, покажем сообщение об отсутсвии отделов
    const filteredInputs = initialInputs.map((i) => (i.id === "department_id" ? { ...i, hidden: true } : { ...i, hidden: false }));
    setInputs([...filteredInputs]);

    // Соберем отдельный объект, с отделами, чтобы можно было сразу подтягивать данные
    // для инпутов при открытии
    const department_additional_input: IAdditionalDepartments = {};
    departmentsData?.data.forEach((i) => (department_additional_input[`department_${i.id}`] = i.name));
    setInputData({ ...data, ...department_additional_input });
  }, [departmentsData, data]);

  const editShopHandler = async () => {
    onEditShop({
      shop_id: inputData.id,
      name: inputData.name,
      address: inputData.address,
    }).then((data) => {
      if (data.status === 200) {
        editDepartments().then(() => refetchShopsAndClose());
        success();
      } else {
        error();
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const editDepartments = async () => {
    // Получим все объекты с признаком department
    const getDepartments = Object.entries(inputData).filter((i) => i[0].includes("department"));

    // Конвертируем в удобно-читаемый вид
    const convertDepartmentsData = getDepartments.map((dep) => {
      return {
        // Пример на вход "department_2e4f67bd-773c-4f2e-b96c-5e5c3006e8ca"
        // оставим только Id
        department_id: dep[0].split("_")[1],
        name: dep[1],
      };
    });

    // Сделаем циклом изменение каждого отдела, так как изменение может быть сделано
    // сразу в нескольких отделах
    convertDepartmentsData.forEach((item) => {
      onEditDepartment({ name: item.name, id: item.department_id }).then(() => refetch());
    });
  };

  const addDepartmentHandler = async (shop_id: string) => {
    onAddDepartment({
      name: content.organizations.shops.new_department,
      shop_id: shop_id,
    }).then(() => refetch());
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: content.alert_messages.shops.edit.success_shop,
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: content.alert_messages.shops.edit.error_shop,
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
                <div className={styles.shopsCards__add} onClick={() => addDepartmentHandler(inputData.id || "")}>
                  <AddIcon />
                </div>
              )}
            </div>
            {input.hidden ? (
              departmentsData?.data.length ? null : (
                <span className={styles.shopsCards__hint}>{content.organizations.shops.empty_departments}</span>
              )
            ) : (
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
      <ButtonCustom onClick={() => editShopHandler()} className={styles.shopsCards__save} disabled={false}>
        <span>{content.organizations.shops.save}</span>
      </ButtonCustom>
    </div>
  );
};

export default EditShop;
