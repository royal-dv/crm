import { useEffect, useState } from "react";
import styles from "./GalleryCards.module.scss";
import GalleryCard from "../GalleryCard/GalleryCard";
import { useQuery } from "react-query";
import { IProject, getProjects } from "../../../services/Projects";
import { Empty, Modal } from "antd";
import ButtonCustom from "../../../components/ui/ButtonCustom/ButtonCustom";
import content from "../../../settings/content";
import GalleryCardDetailed from "../GalleryCardDetailed/GalleryCardDetailed";
import Loader from "../../../components/ui/Loader/Loader";
import Pagination from "../../../components/Pagination/Pagination";
import "./GalleryCards_override.scss";
import NotFound from "../../../components/NotFound/NotFound";
import DealCardCreate from "../../DealsPage/components/DealCardCreate/DealCardCreate";
import InputCustom from "../../../components/ui/InputCustom/InputCustom";
import { createProject } from "../../../services/Projects";
import SelectCustom from "../../../components/ui/SelectCustom/SelectCustom";
import { getSource } from "../../../services/Source";

const LIMIT: number = 9;

interface ISelect {
  value: string;
  select_name: string;
}
interface IProps {
  searchQuery: ISelect | undefined;
  refetchProjects: boolean;
}
interface INewProject {
  name: string;
  room_type: string[];
}
interface ISourceSelect {
  value: string;
  label: string;
}

const initialProject: INewProject = {
  name: "",
  room_type: [],
};

const GalleryCards: React.FC<IProps> = ({ searchQuery, refetchProjects }) => {
  const {
    data: projects,
    refetch,
    isLoading,
    isRefetching,
  } = useQuery({
    queryFn: () => getProjects({ offset: offset, limit: LIMIT, room_type_id: searchQuery?.value || "" }),
    queryKey: ["projects"],
  });

  const [projectsData, setProjectsData] = useState<IProject[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");

  const [offset, setOffset] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);
  const [modalCreate, setModalCreate] = useState(false);
  const [dealId, setDealId] = useState("");
  const [newProject, setNewProject] = useState<INewProject>(initialProject);
  const [closeProject] = useState(false);
  const [hint, setHint] = useState(false);
  const [roomTypes, setRoomTypes] = useState<ISourceSelect[]>();

  const { data: source } = useQuery({
    queryFn: () => getSource("room_type"),
    queryKey: ["source"],
  });

  const handlePageChange = (e: { selected: number }) => {
    if (!projects) return;
    const newOffset = (e.selected * LIMIT) % projects.data.count;
    setOffset(newOffset);
  };

  useEffect(() => {
    if (!projects) return;
    if (projects.data.items) {
      setProjectsData(projects.data.items);
      setPageCount(Math.ceil(projects.data.count / LIMIT));
    }
  }, [projects]);

  useEffect(() => {
    if (!projects) return;
    updateProjects();
  }, [offset]);

  useEffect(() => {
    if (!source) return;

    const convertDataForSelect = source.data.map((item) => {
      return {
        value: item.id,
        label: item.value,
      };
    });

    setRoomTypes(convertDataForSelect);
  }, [source]);

  useEffect(() => {
    refetch();
  }, [refetchProjects]);

  const handleCardClick = (id: string) => {
    if (id) {
      setSelectedProjectId(id);
    }
  };

  const handleCancelModal = () => {
    setSelectedProjectId("");
  };

  const updateProjects = () => {
    refetch();
  };

  if (isLoading) {
    return <Loader />;
  }

  // В случае если сделка создана показываем форму и передаем id для
  // создания проекта
  const handleSuccess = (data: string) => setDealId(data);

  const handleNewProjectChange = (e: React.ChangeEvent<HTMLInputElement> | any): void => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleCreateProject = (projectName: string, room_type_id: string) => {
    createProject({ deal_id: dealId, project_name: projectName, room_type_id: room_type_id }).then((response) => {
      if (response.status === 200) {
        const link = document.createElement("a");
        link.href = `url:?url=${response.data.id}&url=${selectedProjectId}`;
        link.target = "_blank";
        link.click();
        setDealId("");
        setNewProject(initialProject);
        refetch();
      } else {
        alert("error");
      }
    });
  };

  return (
    <>
      {isRefetching ? (
        <Loader />
      ) : (
        <div className={styles.gallery_cards}>
          {projects?.status === 200 ? (
            projectsData.length > 0 ? (
              projectsData.map((card: IProject) => {
                return <GalleryCard key={card.id} project={card} handleCardClick={handleCardClick} />;
              })
            ) : (
              <div className={styles.gallery_cards__no_data}>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </div>
            )
          ) : (
            <div className={styles.gallery_cards__no_data}>
              <NotFound title={content.not_found} />
            </div>
          )}

          <Modal
            key={selectedProjectId}
            centered
            width={800}
            open={!!selectedProjectId}
            onCancel={handleCancelModal}
            footer={[
              <ButtonCustom
                key={selectedProjectId}
                className={styles.custom_button}
                onClick={() => setModalCreate(true)}
                maxWidth="fit-content"
              >
                <span>{content.gallery.detail_card.create_projec_button_title}</span>
              </ButtonCustom>,
            ]}
          >
            {selectedProjectId && <GalleryCardDetailed selectedProjectId={selectedProjectId} />}
          </Modal>
          {modalCreate && (
            <DealCardCreate
              onCancel={() => setModalCreate(false)}
              handleSuccess={handleSuccess}
              open={modalCreate}
              updateDealsList={() => {}}
            />
          )}
          <Modal
            key={dealId + "projectname"}
            centered
            width={300}
            open={dealId !== ""}
            closeIcon={false}
            onCancel={() => {
              if (!closeProject) {
                setHint(true);
                return;
              }
              setHint(false);
              setDealId("");
              setNewProject(initialProject);
            }}
            className={styles.dealCardDetail__projectName_modal}
            footer={
              <ButtonCustom
                className={styles.custom_button}
                onClick={() => handleCreateProject(newProject.name, newProject.room_type.join(","))}
                disabled={newProject.name.length < 2 || !newProject.room_type.length}
                children={<span>{content.deals.detail_deal_card.buttons.title.create_project}</span>}
              />
            }
          >
            {hint && (
              <div className={styles.gallery_cards_warning}>
                <p>{content.alert_messages.projects.hint.hint_title}</p>
                <p>{content.alert_messages.projects.hint.hint_subtitle}</p>
                <div className={styles.gallery_cards_warning_btns}>
                  <ButtonCustom onClick={() => setHint(false)} className={styles.blanks__close}>
                    <span>{content.alert_messages.projects.continue}</span>
                  </ButtonCustom>
                  <ButtonCustom
                    onClick={() => (setDealId(""), setNewProject(initialProject), setHint(false), setSelectedProjectId(""))}
                    isTransparent
                  >
                    <span>{content.alert_messages.projects.close}</span>
                  </ButtonCustom>
                </div>
              </div>
            )}
            <div className={styles.gallery_cards__project_input}>
              <InputCustom
                onChange={handleNewProjectChange}
                value={newProject.name}
                name="name"
                placeholder={content.deals.detail_deal_card.placeholder.newProjectName}
                allowClear
              />
            </div>
            <div className={styles.gallery_cards__project_input}>
              <SelectCustom
                options={[...(roomTypes || [])]}
                onChange={(value) => setNewProject((prev) => ({ ...prev, room_type: value as string[] | any }))}
                onDeselect={(value) => setNewProject((prev) => ({ ...prev, room_type: newProject.room_type.filter((i) => i !== value) }))}
                placeholder={content.deals.detail_deal_card.placeholder.newProjectRoomType}
                width="100%"
                mode="multiple"
              />
            </div>
          </Modal>
        </div>
      )}
      {projects && projects?.data.count > LIMIT ? (
        <div className={styles.gallery_pagination}>
          <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
        </div>
      ) : null}
    </>
  );
};

export default GalleryCards;
