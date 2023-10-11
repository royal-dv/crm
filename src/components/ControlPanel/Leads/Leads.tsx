import { useMutation, useQuery } from "react-query";
import { IGetAllDraftsDeals, getAllDraftsDeals, acceptDraftDealRequest } from "../../../services/Deals";
import styles from "./Leads.module.scss";
import { useEffect, useState } from "react";
import ButtonCustom from "../../ui/ButtonCustom/ButtonCustom";
import content from "../../../settings/content";
import LeadAuthor from "./LeadAuthor";
import { Alert } from "antd";
import Loader from "../../ui/Loader/Loader";
import NotFound from "../../NotFound/NotFound";

interface IProps {
  updateDraftDealsCount: () => void;
}

const Leads: React.FC<IProps> = ({ updateDraftDealsCount }) => {
  const [draftsData, setDraftsData] = useState<IGetAllDraftsDeals>();
  const {
    data: drafts,
    refetch,
    isLoading,
    isRefetching,
  } = useQuery({
    queryFn: () => getAllDraftsDeals(),
    queryKey: ["drafts"],
  });

  const { mutateAsync: onAcceptDraftDealRequest } = useMutation({
    mutationFn: acceptDraftDealRequest,
  });

  const acceptDraftDealHandler = (id: string) => {
    onAcceptDraftDealRequest(id).then(() => {
      refetch();
      updateDraftDealsCount();
    });
  };

  useEffect(() => {
    if (!drafts) return;
    setDraftsData(drafts);
  }, [drafts]);

  return (
    <>
      {isLoading || isRefetching ? (
        <Loader />
      ) : drafts?.status === 200 ? (
        draftsData && draftsData?.data.length > 0 ? (
          draftsData?.data.map((draft) => {
            return (
              <div className={styles.leads} key={draft.id}>
                <LeadAuthor author_id={draft.created_by} />
                <div className={styles.leads__wrapper}>
                  <span className={styles.leads__comments}>
                    {content.control.leads.comment} {draft.comment}
                  </span>
                  <ButtonCustom className={styles.leads__button} maxWidth="150px" onClick={() => acceptDraftDealHandler(draft.id)}>
                    <span>{content.control.leads.button_txt}</span>
                  </ButtonCustom>
                </div>
              </div>
            );
          })
        ) : (
          <Alert message={content.control.leads.not_leads} type="error" showIcon />
        )
      ) : (
        <NotFound title={content.not_found} />
      )}
    </>
  );
};

export default Leads;
