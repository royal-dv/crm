import { useEffect, useState } from "react";
import ButtonCustom from "../../../../components/ui/ButtonCustom/ButtonCustom";
import content from "../../../../settings/content";
import styles from "./ShopsCards.module.scss";
import "./ShopsCards_override.scss";
import { useQuery } from "react-query";
import { Empty, Modal } from "antd";
import { ReactComponent as CloseIcon } from "../../../../assets/icons/cross.svg";
import { ReactComponent as EditIcon } from "../../../../assets/icons/edit.svg";
import { IAddShop, IGetShops, addShop, getShops } from "../../../../services/Shops";
import CreateShop from "../CreateShop/CreateShop";
import EditShop from "../EditShop/EditShop";
import OrganizationHeader from "../../OrganizationHeader/OrganizationHeader";
import Departments from "../Departments/Departments";
import NotFound from "../../../../components/NotFound/NotFound";
import Loader from "../../../../components/ui/Loader/Loader";

const enum modalTypes {
  CREATE = "create",
  EDIT = "edit",
  EMPTY = "",
}

export interface IProps {}

export interface IShop {
  id?: string;
  name: string;
  address?: string;
  department?: string;
}

const initialState: IAddShop = {
  name: "",
  address: "",
  // department: "",
};

const ShopsCards: React.FC<IProps> = ({}) => {
  const [shopsData, setShopsData] = useState<IGetShops>();
  const [open, setOpen] = useState("");
  // Сейчас есть только поле Name
  const [data, setData] = useState<IAddShop>(initialState);

  const {
    data: shops,
    refetch,
    isLoading,
    isRefetching,
  } = useQuery({
    queryFn: () => getShops(),
    queryKey: ["shops"],
  });

  const refetchShopsAndClose = () => {
    refetch();
    setData(initialState);
    setOpen(modalTypes.EMPTY);
  };

  const handleCloseModal = () => {
    setData(initialState);
    setOpen(modalTypes.EMPTY);
  };

  useEffect(() => {
    if (!shops) return;
    if (!Array.isArray(shops?.data)) return;
    setShopsData(shops);
  }, [shops]);

  const editShop = (shop: IAddShop, e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setData(shop);
    setOpen(modalTypes.EDIT);
  };

  return (
    <div className={styles.shops}>
      <OrganizationHeader title={content.organizations.shops.title} placeholder={content.organizations.shops.search_placeholder} />
      <>
        <div className={styles.shopsCards}>
          {isLoading || isRefetching ? (
            <Loader />
          ) : shops?.status === 200 ? (
            shopsData && shopsData?.data.length > 0 ? (
              shopsData?.data
                ?.sort((a, b): number => (a.name > b.name ? -1 : 1))
                .map((shop, index) => {
                  return (
                    <div key={shop.id} className={styles.shopsCards__shop}>
                      <span className={styles.shopsCards__index}>{index + 1}</span>
                      <div className={styles.shopsCards__container}>
                        <div className={styles.shopsCards__block}>
                          <p className={styles.shopsCards__shop_name}>{shop.name}</p>
                          <div onClick={(e) => editShop(shop, e)} className={styles.shopsCards__block_btns}>
                            <EditIcon />
                          </div>
                        </div>
                        <div className={styles.shopsCards__block}>
                          <p className={styles.shopsCards__street}>{shop.address}</p>
                        </div>
                        <Departments shop_id={shop.id} />
                      </div>
                    </div>
                  );
                })
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )
          ) : (
            <div className={styles.shopsCards__not_data}>
              <NotFound title={content.not_found} />
            </div>
          )}
        </div>

        <div className={styles.shopsCards__add}>
          <ButtonCustom
            onClick={() => setOpen(modalTypes.CREATE)}
            className={styles.shopsCards__add_button}
            maxWidth="fit-content"
            disabled={shops?.status !== 200}
          >
            <span>{content.organizations.shops.add_shop_btn}</span>
          </ButtonCustom>
        </div>
        <Modal
          className={"custom_shop_modal"}
          open={open !== modalTypes.EMPTY}
          centered
          mask={false}
          onCancel={() => handleCloseModal()}
          closeIcon={false}
          footer={false}
          width={340}
          destroyOnClose={open === modalTypes.CREATE}
        >
          <div className={styles.shopsCards__header}>
            <span>{content.organizations.shops.modal_title}</span>
            <ButtonCustom isTransparent maxWidth="20px" className={styles.shopsCards__header_close} onClick={() => handleCloseModal()}>
              <CloseIcon />
            </ButtonCustom>
          </div>
          {open === modalTypes.CREATE ? <CreateShop refetchShopsAndClose={refetchShopsAndClose} /> : null}
          {open === modalTypes.EDIT ? <EditShop data={data} refetchShopsAndClose={refetchShopsAndClose} /> : null}
        </Modal>
      </>
    </div>
  );
};

export default ShopsCards;
