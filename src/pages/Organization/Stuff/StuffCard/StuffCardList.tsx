import React, { useEffect, useState } from "react";
import { modalStuffTypes } from "../Stuff";
import styles from "./StuffCard.module.scss";
import "./StuffCard_override.scss";
import { useMutation, useQuery } from "react-query";
import { IGetAllStuffResponse, IRequestStuff, IStuffUser, editStuff, getAllStuff } from "../../../../services/User";
import Loader from "../../../../components/ui/Loader/Loader";
import { IGetShops, IShop, getShops } from "../../../../services/Shops";
import { IDepartment, IGetDepartments, getDepartment } from "../../../../services/Department";
import content from "../../../../settings/content";
import StuffCard from "./StuffCard";

interface IProps {
  stuff: IGetAllStuffResponse;
  isLoading: boolean;
  shops: IGetShops;
  departments: IGetDepartments;
  setIsOpen: React.Dispatch<React.SetStateAction<string>>;
}

const StuffCardList: React.FC<IProps> = ({ stuff, isLoading, setIsOpen, departments, shops }) => {
  const [stuffData, setStuffData] = useState<IStuffUser[]>([]);
  const [shopsData, setShopsData] = useState<IShop[]>([]);
  const [departmentsData, setDepartmentsData] = useState<IDepartment[]>([]);

  const { mutateAsync: onEditStuff } = useMutation({
    mutationFn: editStuff,
    onSuccess: () => {},
  });

  useEffect(() => {
    if (shops?.data) {
      setShopsData(shops.data);
    }
  }, [shops]);

  useEffect(() => {
    if (departments?.data) {
      setDepartmentsData(departments.data);
    }
  }, [departments]);

  useEffect(() => {
    if (stuff?.data) {
      setStuffData(stuff.data);
    }
  }, [stuff]);

  const editStuffHandler = (e: React.MouseEvent<HTMLDivElement>, stuff: IStuffUser) => {
    e.stopPropagation();
    /* Здесь нужно добавить загрузку данных с бэка */
    setIsOpen(stuff.id);
  };

  const changeShop = (user_id: string, editedUserInfo: IRequestStuff) => {
    onEditStuff({ id: user_id, userInfo: { ...editedUserInfo } });
  };

  const changeDepartment = (user_id: string, editedUserInfo: IRequestStuff) => {
    onEditStuff({ id: user_id, userInfo: { ...editedUserInfo } });
  };

  if ((!stuff?.data && isLoading) || !shops || !departments) {
    return <Loader />;
  }

  return (
    <>
      {departments &&
        shops &&
        stuff &&
        stuffData?.map((user) => {
          return (
            <StuffCard
              key={user.id}
              user={user}
              shopsData={shopsData}
              departmentsData={departmentsData}
              changeDepartment={changeDepartment}
              changeShop={changeShop}
              editStuffHandler={editStuffHandler}
            />
          );
        })}
    </>
  );
};

export default StuffCardList;
