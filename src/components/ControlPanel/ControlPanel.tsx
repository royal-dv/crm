import { useEffect, useState } from "react";
import styles from "./ControlPanel.module.scss";
import PageTitle from "../ui/PageTitle/PageTitle";
import { useQuery } from "react-query";
import { getCurrentUserInfo } from "../../services/User";
import { getDraftDealsCount } from "../../services/Deals";
import ControlCard from "./ControlCard";
import { Skeleton } from "antd";
import ControlCardPopUp from "./ControlCardPopUp/ControlCardPopUp";
import content from "../../settings/content";
import Blanks from "../Blanks/Blanks";
import ValidateComponentByRole from "../ValidateComponentByRole/ValidateComponentByRole";

interface IProps {}

interface IPopUp {
  name: string;
  title: string;
}

const ControlPanel = (props: IProps) => {
  const [openCardName, setOpenCardName] = useState<IPopUp>({ name: "", title: "" });
  const [countLeads, setCountLeads] = useState<number>(0);

  const { data: userInfo, isLoading } = useQuery({
    queryFn: () => getCurrentUserInfo(),
    queryKey: ["user"],
  });

  const { data: draftDealsCount, refetch } = useQuery({
    queryFn: () => getDraftDealsCount(),
    queryKey: ["draft_deals"],
  });

  const handleOpenCard = (name: string, title: string) => {
    if (name === openCardName.name) {
      setOpenCardName({ name: "", title: "" });
      return;
    }
    setOpenCardName({ name, title });
  };

  const handleCount = (name: string): number => {
    if (name === "leads") {
      return countLeads;
    }
    return 0;
  };

  const handleUpdateDraftDealsCount = () => {
    refetch();
  };

  useEffect(() => {
    if (!draftDealsCount) return;
    setCountLeads(draftDealsCount?.data.count);
  }, [draftDealsCount]);

  return (
    <div className={styles.controlPanel__container}>
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <div className={styles.controlPanel__title_wrapper}>
            <PageTitle title={`Добро пожаловать, ${userInfo?.name ? userInfo.name : ""}!`} />
          </div>
          <div className={styles.controlPanel__buttons}>
            {content.control.controlButtons.map((item) => (
              <ValidateComponentByRole requiredRoles={item.requiredRole} key={item.name}>
                <ControlCard
                  title={item.title}
                  description={item.description}
                  name={item.name}
                  notificationCount={handleCount(item.name)}
                  handleOpenCard={handleOpenCard}
                />
              </ValidateComponentByRole>
            ))}
            {openCardName.name !== "" ? (
              <ControlCardPopUp updateDraftDealsCount={handleUpdateDraftDealsCount} header={openCardName} handleOpenCard={handleOpenCard} />
            ) : (
              false
            )}
          </div>
          <ValidateComponentByRole requiredRoles={content.blanks.requiredRole}>
            <Blanks />
          </ValidateComponentByRole>
        </>
      )}
    </div>
  );
};

export default ControlPanel;
