import Layout from "../../components/Layout/Layout";
import React, { useEffect, useState } from "react";
import ButtonCustom from "../../components/ui/ButtonCustom/ButtonCustom";
import { useDebounce } from "@uidotdev/usehooks";
import styles from "./DealsPage.module.scss";
import SearchBar from "../../components/SearchBar/SearchBar";
import DealCardCreate from "./components/DealCardCreate/DealCardCreate";
import DealsColumnList from "./components/DealsColumnList/DealsColumnList";
import DealCardDetail from "./components/DealCardDetail/DealCardDetail";
import { useQuery } from "react-query";
import { IDeal, IDealResponse, IDealStatusResponse, getAllDeals, getDealStatuses } from "../../services/Deals";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import Loader from "../../components/ui/Loader/Loader";
import content from "../../settings/content";
import "./DealsPage_override.scss";
import moment from "moment";
import NotFound from "../../components/NotFound/NotFound";
import { NoticeType } from "antd/es/message/interface";
import { message } from "antd";
import { useUser } from "../../context/useUser";

const DealsPage: React.FC = () => {
  const { user } = useUser();

  const { data: statusesData } = useQuery({
    queryFn: () => getDealStatuses(),
    queryKey: ["statuses"],
  });

  const {
    data: deals,
    isRefetching,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => getAllDeals({ search: search }),
    queryKey: ["deals"],
  });

  const [messageApi, contextHolder] = message.useMessage();
  const [search, setSearch] = useState<string>("");
  const [dealsData, setDealsData] = useState<IDealResponse[]>([]);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState<boolean>(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState<string>("");
  const [statuses, setStatuses] = useState<IDealStatusResponse[]>([]);
  const [isOnlyMyDeals, setIsOnlyMyDeals] = useState<boolean>(false);

  const updateDealsList = () => {
    refetch();
  };

  const alertUpdate = () => {
    alert("success", content.alert_messages.deals.edit.success_deal);
  };

  const openModalCreate = () => {
    setIsModalCreateOpen(true);
  };

  const closeModalCreate = () => {
    setIsModalCreateOpen(false);
  };

  const openModalDetail = (id: string) => {
    setIsModalDetailOpen(id);
  };

  const closeModalDetail = () => {
    setIsModalDetailOpen("");
  };

  const onlyMyDealsHandler = () => {
    setIsOnlyMyDeals(!isOnlyMyDeals);
  };

  const getDeals = (status: string): IDeal[] => {
    let deals = dealsData?.find((item) => item.status === status)?.deals;

    // Соберем массив всех сделок
    const allDeals = deals
      ? deals.sort(function (a, b) {
          return moment(b.created_at).diff(moment(a.created_at));
        })
      : [];

    // TODO
    // Если пользователь нажал кнопку "только мои сделки", отфильтруем массив
    // и покажем только сделки текущего пользователя.
    //
    // Сейчас фильтрация происходит по атрибуту created_by. Возможно
    // стоит переделать логику и заменить атрибут с created_by
    // на атрибут говорящий, что эта задача назначена на менеджера.
    // То есть нужно на бэке сделать нужное поле.
    const myDeals = allDeals.filter((deal) => deal.created_by === user?.id);

    return isOnlyMyDeals ? myDeals : allDeals;
  };

  const debouncedSearch = useDebounce(search, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (!deals?.data.groups) return;
    setDealsData(deals.data.groups);
  }, [deals]);

  useEffect(() => {
    updateDealsList();
  }, [debouncedSearch]);

  useEffect(() => {
    if (statusesData) {
      setStatuses(statusesData);
    }
  }, [statusesData]);

  const alert = (type: NoticeType, content: string) => {
    messageApi.open({
      type: type,
      content: content,
    });
  };

  return (
    <>
      <Layout horizontal_scroll>
        {contextHolder}
        <div className={styles.dealsPage__container}>
          <div className={styles.dealsPage__header}>
            <ButtonCustom className={styles.dealsPage__header_custom_button} onClick={openModalCreate} bgColor="orange">
              <span>{content.deals.header.create_deal}</span>
            </ButtonCustom>
            <DealCardCreate
              open={isModalCreateOpen}
              onCancel={closeModalCreate}
              updateDealsList={updateDealsList}
              openModalDetail={openModalDetail}
            />
            {isModalDetailOpen && (
              <DealCardDetail
                id={isModalDetailOpen}
                onCancel={closeModalDetail}
                statusesData={statuses}
                updateDealsList={updateDealsList}
                alertUpdate={alertUpdate}
              />
            )}
            <SearchBar
              className={styles.dealsPage__header_search}
              placeholder={content.deals.header.search_deals}
              suffix={<SearchIcon />}
              onChange={handleChange}
              value={search}
            />
            <ButtonCustom
              className={isOnlyMyDeals ? styles.dealsPage__header_show_deals_active : styles.dealsPage__header_show_deals}
              maxWidth="none"
              onClick={() => onlyMyDealsHandler()}
            >
              <span>{!isOnlyMyDeals ? content.deals.header.show_my_deals : content.deals.header.show_all_deals}</span>
            </ButtonCustom>
          </div>
          <div className={styles.dealsPage__data}>
            {(isLoading || isRefetching) && !isModalDetailOpen ? (
              <Loader />
            ) : deals?.status === 200 ? (
              statusesData?.map((status) => (
                <DealsColumnList
                  id={status.id}
                  data={getDeals(status.id)}
                  title={status.name}
                  onClick={openModalDetail}
                  key={status.name}
                  selectedDealId={isModalDetailOpen}
                />
              ))
            ) : (
              <NotFound title={content.not_found} />
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default DealsPage;
