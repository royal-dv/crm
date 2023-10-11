import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import ButtonCustom from "../../../../components/ui/ButtonCustom/ButtonCustom";
import SelectCustom from "../../../../components/ui//SelectCustom/SelectCustom";
import TextArea from "antd/es/input/TextArea";
import { Modal, Tabs, message } from "antd";
import { IDeal, IDealStatusResponse, editDeal, editDealStatus, getDeal, getHistoryDealStatuses } from "../../../../services/Deals";
import Loader from "../../../../components/ui/Loader/Loader";
import DetailCardCreatedBy from "./DetailCardCreatedBy/DetailCardCreatedBy";
import DetailCardHistoryStatuses from "./DetailCardHistoryStatuses/DetailCardHistoryStatuses";
import moment from "moment";
import { ReactComponent as EditIcon } from "../../../../assets/icons/edit.svg";
import { ReactComponent as CloseIcon } from "../../../../assets/icons/cross.svg";
import InputCustom from "../../../../components/ui/InputCustom/InputCustom";
import InputMask from "react-input-mask";
import { validateEmail } from "../../../../helpers/validateInputs";
import { formatPhone } from "../../../../helpers/formatString";
import { IProject, createProject, getProjectsByDeal } from "../../../../services/Projects";
import DetailCardProjects from "./DetailCardProjects/DetailCardProjects";
import { getCurrentUserInfo } from "../../../../services/User";
import DetailCardAdditionalGoods from "./DetailCardAdditionalGoods/DetailCardAdditionalGoods";
import { NoticeType } from "antd/es/message/interface";
import styles from "./DealCardDetail.module.scss";
import "./DealCardDetail_override.scss";
import content from "../../../../settings/content";
import { getSource } from "../../../../services/Source";
export interface IDealCardDetailProps {
  id: string;
  onCancel: () => void;
  updateDealsList: () => void;
  alertUpdate: () => void;
  statusesData: IDealStatusResponse[];
}

interface INewProject {
  name: string;
  room_type: string[];
}

const initialProject: INewProject = {
  name: "",
  room_type: [],
};

const initialState: IDeal = {
  client_email: "",
  client_fullname: "",
  client_phone: "",
  comment: "",
  created_at: "",
  created_by: "",
  department_id: "",
  estate_name: "",
  id: "",
  renovation_stage: "",
  room_type: "",
  status: "",
  surface_area: 0,
  title: "",
};
interface ISourceSelect {
  value: string;
  label: string;
}

const DealCardDetail: React.FC<IDealCardDetailProps> = ({ id, onCancel, statusesData, updateDealsList, alertUpdate }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState<IDeal>(initialState);
  const [editInput, setInputEdit] = useState("");
  const [isCreatingProject, setIsCreatingProject] = useState<boolean>(false);
  const [newProject, setNewProject] = useState<INewProject>(initialProject);
  const [projectsByDeal, setProjectByDeal] = useState<IProject[]>([]);
  const [isModalLeadOpen, setIsModalLeadOpen] = useState<boolean>(false);
  const [roomTypes, setRoomTypes] = useState<ISourceSelect[]>();
  const { data: dealData, refetch: refetchDealData } = useQuery({
    queryFn: () => getDeal({ id }),
    queryKey: ["deal"],
    enabled: !!id,
  });

  const { data: statusesHistory, refetch: refetchStatusesHistory } = useQuery({
    queryFn: () => getHistoryDealStatuses(id),
    queryKey: ["statusesHistory"],
  });

  const { mutateAsync: onEditDeal } = useMutation({
    mutationFn: editDeal,
    onSuccess: () => {
      updateDealsList();
    },
  });

  const { mutateAsync: onEditDealStatus } = useMutation({
    mutationFn: editDealStatus,
    onSuccess: () => {
      updateDealsList();
    },
  });

  const { data: projectsData, refetch } = useQuery({
    queryFn: () => getProjectsByDeal({ id }),
    queryKey: ["projects"],
  });

  const { data: userInfo } = useQuery({
    queryFn: () => getCurrentUserInfo(),
    queryKey: ["user"],
  });

  const { data: source } = useQuery({
    queryFn: () => getSource("room_type"),
    queryKey: ["source"],
  });

  // Получим данные для инпутов при открытии модального окна
  useEffect(() => {
    if (dealData?.data) {
      setData(dealData.data);
    }
  }, [dealData, id]);

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
    if (projectsData?.data) {
      setProjectByDeal(projectsData.data);
    }
  }, [projectsData, id]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleNewProjectChange = (e: React.ChangeEvent<HTMLInputElement> | any): void => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    onEditDeal({
      id: id,
      title: dealData?.data.title,
      client_phone: formatPhone(data.client_phone),
      client_email: data.client_email,
      client_fullname: data.client_fullname,
      room_type: data.room_type,
      surface_area: +data.surface_area,
      renovation_stage: data.renovation_stage,
      estate_name: data.estate_name,
      comment: data.comment,
    }).then((response) => {
      if (response.status === 200) {
        alertUpdate();
        <Loader />;
        onCancel();
      } else alert("error", content.alert_messages.deals.edit.error_deal);
    });
  };

  const handleStatusChange = (value: string) => {
    onEditDealStatus({ dealId: id, status: value }).then((response) => {
      refetchDealData();
      refetchStatusesHistory();
    });
  };

  const getDataInput = (index: string) => data[index as keyof IDeal];

  const handleCloseModal = () => onCancel();

  const onEditInput = (id: string) => {
    if (id === editInput) {
      setInputEdit("");
      return;
    }
    setInputEdit(id);
  };

  const validateInput = (inputName: string, value: string): "" | "error" | "warning" | undefined => {
    if (inputName === "client_email") {
      return validateEmail(value);
    }
    return "";
  };

  const isSubmitDisabled = () => {
    let result = true;
    if ((validateEmail(data.client_email) !== "error" && data.client_email !== "") || formatPhone(data.client_phone).length === 11) {
      result = false;
    }

    return result;
  };

  const handleCreateProject = (projectName: string, room_type_id: string) => {
    createProject({ deal_id: id, project_name: projectName, room_type_id: room_type_id }).then((response) => {
      const link = document.createElement("a");
      link.href = `url:?url=${response.data.id}`;
      link.target = "_blank";
      link.click();
      setIsCreatingProject(false);
      setNewProject(initialProject);
      refetch();
    });
  };

  const alert = (type: NoticeType, content: string) => {
    messageApi.open({
      type: type,
      content: content,
    });
  };

  const tabs = [
    {
      label: content.deals.detail_deal_card.tabs.history.label,
      key: "1",
      children: (
        <DetailCardHistoryStatuses
          statusesHistory={statusesHistory?.sort(function (a, b) {
            return moment(a.created_at).diff(moment(b.created_at));
          })}
          statusesData={statusesData}
        />
      ),
    },
    {
      label: content.deals.detail_deal_card.tabs.projects.label,
      key: "2",
      children: <DetailCardProjects projectsByDeal={projectsByDeal} userInfo={userInfo} />,
    },
  ];

  const openCreateLeadModal = () => {
    setIsModalLeadOpen(true);
  };

  const closeCreateLeadModal = () => {
    setIsModalLeadOpen(false);
  };

  return (
    <Modal
      key={id}
      centered
      width={600}
      open={id ? true : false}
      closeIcon={false}
      onCancel={onCancel}
      className="custom-styles"
      footer={null}
    >
      <div className={styles.dealCardDetail}>
        {contextHolder}
        <div className={styles.dealCardDetail__header}>
          <p>{dealData?.data.title}</p>
          <ButtonCustom className={styles.dealCardDetail__header_close} onClick={handleCloseModal} isTransparent>
            <CloseIcon />
          </ButtonCustom>
        </div>

        <div className={styles.dealCardDetail__block}>
          <div className={styles.dealCardDetail__createdBy}>
            <DetailCardCreatedBy created_by={data.created_by} created_at={data.created_at} />
          </div>

          <div className={styles.dealCardDetail__status}>
            <span className={styles.dealCardDetail__status_title}>{content.deals.detail_deal_card.status_title}</span>
            <SelectCustom
              defaultValue={data.status}
              options={statusesData?.map((status) => ({
                value: status.id,
                label: status.name,
              }))}
              onChange={handleStatusChange}
              value={data.status}
              width="25%"
            />
          </div>

          <div className={styles.dealCardDetail__inputs}>
            {content.deals.detail_deal_card.dealCardDetailedColumns.map((column) => {
              return (
                <div className={styles.dealCardDetail__inputs_row} key={column?.toString()}>
                  {column.map((input, index) => {
                    return (
                      <div key={index} className={styles.dealCardDetail__input_block}>
                        <ButtonCustom
                          onClick={() => onEditInput(input.id)}
                          className={styles.dealCardDetail__input_edit_button}
                          isTransparent
                        >
                          {editInput !== input.id ? (
                            <EditIcon className={styles.dealCardDetail__input_edit_icon} />
                          ) : (
                            <CloseIcon className={styles.dealCardDetail__input_close_icon} />
                          )}
                        </ButtonCustom>
                        {input.name === "client_phone" ? (
                          <InputMask
                            className={styles.dealCardDetail__input}
                            placeholder={input.placeholder}
                            mask={"+7 (999) 999-99-99"}
                            maskChar={" "}
                            name={input.name}
                            value={getDataInput(input.name)}
                            onChange={handleChange}
                            style={{ padding: "4px 10px" }}
                            disabled={editInput !== input.id}
                          />
                        ) : (
                          <InputCustom
                            type={input.name === "surface_area" ? "number" : "text"}
                            className={styles.dealCardDetail__input}
                            name={input.name}
                            onChange={handleChange}
                            value={getDataInput(input.name)}
                            placeholder={input.placeholder}
                            maxLength={input.name === "surface_area" ? 10 : 100}
                            // key={index + input.id}
                            disabled={editInput !== input.id}
                            allowClear
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          {/* <div className={styles.dealCardDetail__reminder}>
            <ButtonCustom isTransparent className={`${styles.button_custom} ${styles.button_icon}`} icon={<CalendarIcon />} />
          </div> */}
          <div className={styles.dealCardDetail__button_container}>
            <ButtonCustom
              className={styles.dealCardDetail__button}
              maxWidth={"none"}
              children={<span>{content.deals.detail_deal_card.buttons.title.add_goods}</span>}
              onClick={openCreateLeadModal}
            />
            <ButtonCustom
              className={styles.dealCardDetail__button}
              maxWidth={"none"}
              children={<span>{content.deals.detail_deal_card.buttons.title.create_project}</span>}
              onClick={() => setIsCreatingProject(true)}
            />
            <ButtonCustom
              className={styles.dealCardDetail__button}
              maxWidth={"none"}
              disabled={true}
              children={<span>{content.deals.detail_deal_card.buttons.title.show_gallery}</span>}
            />
            <ButtonCustom
              className={styles.dealCardDetail__button}
              maxWidth={"none"}
              disabled={true}
              children={<span>{content.deals.detail_deal_card.buttons.title.open_project}</span>}
            />
            <ButtonCustom
              className={styles.dealCardDetail__button}
              maxWidth={"none"}
              disabled={true}
              children={<span>{content.deals.detail_deal_card.buttons.title.create_apartment}</span>}
            />
          </div>

          <div className={styles.dealCardDetail__tabs}>
            <Tabs defaultActiveKey="1" items={tabs} />
          </div>

          <div className={styles.dealCardDetail__comment}>
            <span className={styles.dealCardDetail__comment_label}>{content.deals.detail_deal_card.comment.label}</span>
            <div className={styles.dealCardDetail__comment_textBlock}>
              <TextArea
                rows={2.5}
                placeholder={content.deals.detail_deal_card.comment.placeholder}
                name={"comment"}
                onChange={handleChange}
                value={getDataInput("comment")}
              />
              {/* <ButtonCustom className={styles.dealCardDetail__send_button} isTransparent onClick={() => {}}>
                <SendIcon />
              </ButtonCustom> */}
            </div>
          </div>

          <div className={styles.dealCardDetail__submit}>
            <ButtonCustom className={styles.custom_button} onClick={handleSubmit} disabled={isSubmitDisabled()}>
              <span>{content.deals.detail_deal_card.save_button}</span>
            </ButtonCustom>
          </div>
        </div>
      </div>
      <Modal
        key={id + "projectname"}
        centered
        width={300}
        open={isCreatingProject}
        closeIcon={false}
        onCancel={() => {
          setIsCreatingProject(false);
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
        <div className={styles.dealCardDetail__projectName_input}>
          <InputCustom
            onChange={handleNewProjectChange}
            value={newProject.name}
            name="name"
            placeholder={content.deals.detail_deal_card.placeholder.newProjectName}
            allowClear
          />
        </div>
        <div className={styles.dealCardDetail__projectName_input}>
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
      <DetailCardAdditionalGoods open={isModalLeadOpen} onCancel={closeCreateLeadModal} deal_id={id} />
    </Modal>
  );
};

export default DealCardDetail;
