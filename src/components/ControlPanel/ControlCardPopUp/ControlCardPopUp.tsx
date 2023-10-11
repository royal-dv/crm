import ButtonCustom from "../../ui/ButtonCustom/ButtonCustom";
import Leads from "../Leads/Leads";
import styles from "./ControlCardPopUp.module.scss";
import { ReactComponent as CloseIcon } from "../../../assets/icons/cross.svg";
import { MutableRefObject } from "react";
import { useClickAway } from "@uidotdev/usehooks";

interface IProps {
  header: {
    name: string;
    title: string;
  };
  handleOpenCard: (name: string, title: string) => void;
  updateDraftDealsCount: () => void;
}

const ControlCardPopUp: React.FC<IProps> = ({ header, handleOpenCard, updateDraftDealsCount }) => {
  const ref: MutableRefObject<HTMLDivElement> = useClickAway(() => {
    handleOpenCard("", "");
  });

  return (
    <div className={styles.controlPanelPopUp}>
      <div className={styles.controlPanelPopUp__header}>
        <span>{header.title}</span>
        <ButtonCustom className={styles.controlPanelPopUp__close} isTransparent maxWidth="20px" onClick={() => handleOpenCard("", "")}>
          <CloseIcon />
        </ButtonCustom>
      </div>
      <div className={styles.controlPanelPopUp__wrapper} ref={ref}>
        {header.name === "leads" ? <Leads updateDraftDealsCount={updateDraftDealsCount} /> : null}
        {header.name === "analytic_projects" ? <span className={styles.controlPanelPopUp__wrapper_description}>{header.title}</span> : null}
        {header.name === "statistics_platform" ? (
          <span className={styles.controlPanelPopUp__wrapper_description}>{header.title}</span>
        ) : null}
        {header.name === "statistics_coach" ? <span className={styles.controlPanelPopUp__wrapper_description}>{header.title}</span> : null}
        {header.name === "invoices" ? <span className={styles.controlPanelPopUp__wrapper_description}>{header.title}</span> : null}
        {header.name === "register" ? <span className={styles.controlPanelPopUp__wrapper_description}>{header.title}</span> : null}
        {header.name === "analytic_products" ? <span className={styles.controlPanelPopUp__wrapper_description}>{header.title}</span> : null}
        {header.name === "analytic_active_days" ? (
          <span className={styles.controlPanelPopUp__wrapper_description}>{header.title}</span>
        ) : null}
      </div>
    </div>
  );
};

export default ControlCardPopUp;
