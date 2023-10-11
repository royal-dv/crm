import { useEffect, useState } from "react";
import { Input, Modal, message } from "antd";
import InputMask from "react-input-mask";
import InputCustom from "../../../../components/ui/InputCustom/InputCustom";
import { modalStuffTypes } from "../Stuff";
import styles from "./StuffCardDetail.module.scss";
import "./StuffCardDetail_override.scss";
import content from "../../../../settings/content";
import ButtonCustom from "../../../../components/ui/ButtonCustom/ButtonCustom";
import { IRequestStuff, createStuff, editStuff, getStuffById, getUserRoles } from "../../../../services/User";
import { useMutation, useQuery } from "react-query";
import { NoticeType } from "antd/es/message/interface";
import { formatPhone } from "../../../../helpers/formatString";
import SelectCustom from "../../../../components/ui/SelectCustom/SelectCustom";
import { IGetShops } from "../../../../services/Shops";
import { IGetDepartments } from "../../../../services/Department";

interface IStuffInput {
  phone: string;
  login: string;
  name: string;
  password: string;
}
export interface IStuffCardDetail {
  isEdit: string;
  open: boolean;
  onCancel: () => void;
  editAndRefetch: () => void;
  createAndRefetch: () => void;
  shops: IGetShops;
  departments: IGetDepartments;
}

const initialData = {
  phone: "",
  login: "",
  email: "",
  name: "",
  password: "",
  shop_id: "",
  department_id: "",
  role: "",
};

const StuffCardDetail: React.FC<IStuffCardDetail> = ({ isEdit, open, onCancel, editAndRefetch, createAndRefetch, departments, shops }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState<IRequestStuff>(initialData);
  const [password, setPassword] = useState<string>("");
  const [shopId, setShopId] = useState<string>("");
  const [departmentId, setDepartmentId] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const {
    data: currentStuff,
    refetch,
    isLoading,
  } = useQuery({
    queryFn: () => getStuffById(isEdit),
    queryKey: ["currentStuff"],
    enabled: isEdit !== modalStuffTypes.CREATE && isEdit !== modalStuffTypes.EMPTY,
  });

  const { data: userRoles } = useQuery({
    queryFn: () => getUserRoles(),
    queryKey: ["roles"],
  });

  const { mutateAsync: onEditStuff } = useMutation({
    mutationFn: editStuff,
    onSuccess: () => {},
  });

  const { mutateAsync: onCreateStuff } = useMutation({
    mutationFn: createStuff,
    onSuccess: () => {},
  });

  useEffect(() => {
    if (currentStuff?.data) {
      setData(currentStuff.data);
    }
    if (isEdit === modalStuffTypes.CREATE) {
      setData(initialData);
    }
  }, [currentStuff?.data, isEdit]);

  useEffect(() => {
    if (data.role) {
      setRole(data.role);
    }
    if (data.department_id) {
      setDepartmentId(data.department_id);
    }
    if (data.shop_id) {
      setShopId(data.shop_id);
    }
  }, [data]);

  const alert = (type: NoticeType, content: string) => {
    messageApi.open({
      type: type,
      content: content,
    });
  };

  const getDataInput = (name: string) => data[name as keyof IRequestStuff];

  const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleShop = (value: string) => {
    setData({ ...data, shop_id: value });
  };

  const handleDepartment = (value: string) => {
    setData({ ...data, department_id: value });
  };

  const handleRole = (value: string) => {
    setData({ ...data, role: value });
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleCreate = () => {
    if (data.role && data.department_id && data.email && data.login && data.name && data.phone && data.shop_id) {
      onCreateStuff({
        role: data.role,
        shop_id: data.shop_id,
        department_id: data.department_id,
        login: data?.login,
        password: password,
        email: data.email,
        phone: formatPhone(data?.phone),
        name: data.name,
      }).then((response) => {
        if (response.status === 200) {
          createAndRefetch();
        } else {
          alert("error", content.alert_messages.stuffs.create.error_stuff);
        }
      });
    }
  };

  const handleEdit = () => {
    onEditStuff({
      id: isEdit,
      userInfo: {
        department_id: data.department_id,
        shop_id: data.shop_id,
        email: data.email,
        name: data.name,
        phone: formatPhone(data.phone ?? ""),
        role: data.role,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          editAndRefetch();
        } else {
          alert("error", content.alert_messages.stuffs.edit.error_stuff);
        }
      })
      .catch((err) => {
        alert("error", content.alert_messages.stuffs.edit.error_stuff);
      });
  };

  const handleBlock = () => {
    /* Потом добавить функцию */
    console.log("block");
  };

  return (
    <Modal destroyOnClose={true} className="custom_styles" width={340} centered open={open} onCancel={onCancel} footer={null}>
      <div className={styles.stuffCard_detail}>
        {contextHolder}
        <div className={styles.stuffCard_detail__header}>
          <p className={styles.stuffCard_detail__header_title}>{content.organizations.stuff.title}</p>
        </div>
        <div className={styles.stuffCard_detail__form}>
          {content.organizations.stuff.detail_card.data_input.map((item, index) => {
            return (
              <div className={styles.stuffCard_detail__form_data} key={index}>
                <p className={styles.stuffCard_detail__form_title}>{item.title}</p>
                {item.name === "phone" ? (
                  <InputMask
                    name={item.name}
                    className={`${styles.stuffCard_detail__form_phone} ant-input`}
                    mask={item.mask}
                    maskChar=" "
                    placeholder={item.placeholder}
                    value={getDataInput(item.name)}
                    onChange={handleData}
                    autoComplete="off"
                  />
                ) : item.type === "password" ? (
                  <Input.Password
                    disabled={isEdit === modalStuffTypes.CREATE ? false : true}
                    name={item.name}
                    placeholder={item.placeholder}
                    value={password}
                    onChange={handlePassword}
                  />
                ) : (
                  <InputCustom name={item.name} placeholder={item.placeholder} value={getDataInput(item.name)} onChange={handleData} />
                )}
              </div>
            );
          })}
          <div className={styles.stuffCard_detail__form_data}>
            <p className={styles.stuffCard_detail__form_title}>{content.organizations.stuff.detail_card.shop.title}</p>
            <SelectCustom
              width="100%"
              placeholder={content.organizations.stuff.detail_card.shop.placeholder}
              options={shops?.data?.map((shop) => ({
                value: shop.id,
                label: shop.name,
              }))}
              onChange={handleShop}
              value={shopId}
            />
          </div>
          <div className={styles.stuffCard_detail__form_data}>
            <p className={styles.stuffCard_detail__form_title}>{content.organizations.stuff.detail_card.department.title}</p>
            <SelectCustom
              width="100%"
              placeholder={content.organizations.stuff.detail_card.department.placeholder}
              options={departments?.data?.map((department) => ({
                value: department.id,
                label: department.name,
              }))}
              onChange={handleDepartment}
              value={departmentId}
            />
          </div>
          {userRoles?.data && (
            <div className={styles.stuffCard_detail__form_data}>
              <p className={styles.stuffCard_detail__form_title}>{content.organizations.stuff.detail_card.roles.title}</p>
              <SelectCustom
                defaultValue={data.role}
                width="100%"
                placeholder={content.organizations.stuff.detail_card.roles.placeholder}
                options={userRoles.data
                  ?.map((role) => ({
                    value: role.id,
                    label: role.name,
                  }))
                  .filter((item) => item.value !== "organization_admin")}
                onChange={handleRole}
                value={role}
              />
            </div>
          )}

          <div className={styles.stuffCard_detail__footer_container}>
            <ButtonCustom
              maxWidth="140px"
              className={styles.stuffCard_detail__footer_container_custom_button_save}
              children={<span>{content.organizations.stuff.detail_card.footer.save}</span>}
              disabled={false}
              onClick={isEdit === modalStuffTypes.CREATE ? handleCreate : handleEdit}
            />
            {isEdit !== modalStuffTypes.CREATE && (
              <ButtonCustom
                maxWidth="210px"
                className={styles.stuffCard_detail__footer_container_custom_button_block}
                children={<span>{content.organizations.stuff.detail_card.footer.block}</span>}
                onClick={handleBlock}
              />
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default StuffCardDetail;
