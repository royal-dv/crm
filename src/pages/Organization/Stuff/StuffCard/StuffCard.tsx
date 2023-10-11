import React from "react";
import styles from "./StuffCard.module.scss";
import SelectCustom from "../../../../components/ui/SelectCustom/SelectCustom";
import { IRequestStuff, IStuffUser } from "../../../../services/User";
import content from "../../../../settings/content";
import { IDepartment } from "../../../../services/Department";
import { IShop } from "../../../../services/Shops";
import { ReactComponent as EditIcon } from "../../../../assets/icons/edit.svg";
import { ReactComponent as HideIcon } from "../../../../assets/icons/hide_eye.svg";

interface IProps {
  user: IStuffUser;
  shopsData: IShop[];
  departmentsData: IDepartment[];
  changeShop: (user_id: string, editedUserInfo: IRequestStuff) => void;
  changeDepartment: (user_id: string, editedUserInfo: IRequestStuff) => void;
  editStuffHandler: (e: React.MouseEvent<HTMLDivElement>, stuff: IStuffUser) => void;
}

const StuffCard = ({ user, departmentsData, shopsData, changeShop, changeDepartment, editStuffHandler }: IProps) => {
  return (
    <div className={styles.stuffCard} key={user.id}>
      <div className={styles.stuffCard__item}>{user.name}</div>
      <div className={styles.stuffCard__item}>{user.email}</div>
      <div className={styles.stuffCard__item}>{user.phone}</div>
      <div className={styles.stuffCard__item}>
        <SelectCustom
          defaultValue={shopsData.find((shop) => shop.id === user.shop_id)?.id ?? content.organizations.stuff.detail_card.shop.title}
          onChange={(e) =>
            changeShop(user.id, {
              shop_id: e,
              department_id: user.department_id,
              email: user.email,
              phone: user.phone,
              name: user.name,
            })
          }
          options={shopsData?.map((shop) => ({
            value: shop.id,
            label: shop.name,
          }))}
          className={"stuffCard__select"}
          disabled={user.role === "organization_admin" ? true : false}
        />
      </div>
      <div className={styles.stuffCard__item}>
        <SelectCustom
          defaultValue={
            departmentsData.find((department) => department.id === user.department_id)?.id ??
            content.organizations.stuff.detail_card.department.title
          }
          onChange={(e) =>
            changeDepartment(user.id, {
              shop_id: user.shop_id,
              department_id: e,
              email: user.email,
              phone: user.phone,
              name: user.name,
            })
          }
          options={departmentsData?.map((department) => ({
            value: department.id,
            label: department.name,
          }))}
          className={"stuffCard__select"}
          disabled={user.role === "organization_admin" ? true : false}
        />
      </div>
      <div className={styles.stuffCard__btn_container}>
        <div onClick={(e) => editStuffHandler(e, user)} className={styles.stuffCard__btn}>
          <EditIcon />
        </div>
        <div className={styles.stuffCard__btn}>
          <HideIcon />
        </div>
      </div>
    </div>
  );
};

export default StuffCard;
