import { ReactComponent as ExpandIcon } from "../../../../../assets/icons/expand.svg";
import NotFound from "../../../../../components/NotFound/NotFound";
import content from "../../../../../settings/content";
import { Collapse } from "antd";
import { IProject } from "../../../../../services/Projects";
import styles from "./DetailCardProjects.module.scss";
import "./DetailCardProjects.override.scss";
import DetailCardProjectsLabel from "./DetailCardProjectsLabel/DetailCardProjectsLabel";
import DetailCardProjectsData from "./DetailCardProjectsData/DetailCardProjectsData";

interface IProps {
  projectsByDeal?: IProject[];
  userInfo: {
    name: string;
  };
}

const DetailCardProjects: React.FC<IProps> = ({ projectsByDeal, userInfo }) => {
  const projects =
    projectsByDeal &&
    projectsByDeal?.map((project) => {
      return {
        key: project.id,
        label: <DetailCardProjectsLabel data={project} userInfo={userInfo} />,
        children: <DetailCardProjectsData data={project} />,
      };
    });

  return (
    <>
      {projectsByDeal && projectsByDeal.length > 0 ? (
        <div className={styles.projects}>
          <Collapse
            className="custom_styles"
            expandIcon={({ isActive }) => <ExpandIcon className={isActive ? styles.collapse__expand : styles.collapse__expand_rotate} />}
            expandIconPosition={"end"}
            items={projects}
          />
        </div>
      ) : (
        <div className={styles.projects_not_found}>
          <NotFound title={content.deals.detail_deal_card.tabs.projects.not_found} />
        </div>
      )}
    </>
  );
};

export default DetailCardProjects;
