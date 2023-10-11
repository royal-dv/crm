import { Form, Modal, message } from "antd";
import { useMutation, useQuery } from "react-query";
import { useEffect, useState } from "react";
import SelectCustom from "../../../../../components/ui/SelectCustom/SelectCustom";
import TextArea from "antd/es/input/TextArea";
import ButtonCustom from "../../../../../components/ui/ButtonCustom/ButtonCustom";
import { getDepartment } from "../../../../../services/Department";
import { createDraftDeal } from "../../../../../services/Deals";
import Loader from "../../../../../components/ui/Loader/Loader";
import styles from "./DetailCardAdditionalGoods.module.scss";
import "./DetailCardAdditionalGoods_override.scss";
import content from "../../../../../settings/content";

interface IDetailCardAdditionalGoods {
  open: boolean;
  onCancel: () => void;
  deal_id: string;
}

const DetailCardAdditionalGoods: React.FC<IDetailCardAdditionalGoods> = ({ open, onCancel, deal_id }) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [departments, setDepartments] = useState<{ value: string; label: string }[]>([]);
  const [comment, setComment] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [selectDepartment, setSelectDepartment] = useState<string>("");
  const { data: departmentData } = useQuery({
    queryFn: () => getDepartment(),
    queryKey: ["departments"],
  });

  const { mutateAsync: createDraftDealRequest } = useMutation({
    mutationFn: createDraftDeal,
  });

  useEffect(() => {
    if (departmentData?.data && Array.isArray(departmentData?.data)) {
      console.log(departmentData.data);
      const options = departmentData?.data.map((item) => ({
        value: item.id,
        label: item.name ? item.name : item.id,
      }));
      setDepartments(options);
    }
  }, [departmentData]);

  useEffect(() => {
    return comment.length >= 2 && selectDepartment ? setIsDisabled(false) : setIsDisabled(true);
  }, [comment.length, isDisabled, selectDepartment]);

  const handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleDepartment = (value: string) => {
    setSelectDepartment(value);
  };

  const onReset = () => {
    form.resetFields();
  };

  const handleClose = () => {
    onReset();
    onCancel();
  };

  const handleSubmit = async () => {
    createDraftDealRequest({
      target_department_id: selectDepartment,
      comment: comment,
      parent_deal_id: deal_id,
    }).then((res) => {
      if (!res) {
        return error();
      }
      if (res.status === 200) {
        success();
        onReset();
        <Loader />;
        onCancel();
      } else {
        error();
      }
    });
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: content.alert_messages.leads.success_lead,
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: content.alert_messages.leads.error_lead,
    });
  };

  return (
    <Modal className="custom_styles" width={316} centered open={open} onCancel={handleClose} footer={null}>
      {contextHolder}
      <div className={styles.detailCard_additionalGoods}>
        <div className={styles.detailCard_additionalGoods__header}>
          <p className={styles.detailCard_additionalGoods__header_title}>{content.deals.detail_deal_card.add_leads.title}</p>
        </div>
        <Form form={form}>
          <Form.Item name="departments">
            <SelectCustom
              width="100%"
              placeholder={content.deals.detail_deal_card.add_leads.select_department}
              options={departments}
              onChange={handleDepartment}
            />
          </Form.Item>
          <Form.Item name="comment">
            <TextArea
              rows={4}
              placeholder={content.deals.detail_deal_card.add_leads.placehoder}
              name={"comment"}
              onChange={handleComment}
              value={comment}
            />
          </Form.Item>
          <div className={styles.detailCard_additionalGoods__send_container}>
            <ButtonCustom
              className={styles.detailCard_additionalGoods__send_contain_custom_button}
              children={<span>{content.deals.detail_deal_card.add_leads.send}</span>}
              disabled={isDisabled}
              onClick={handleSubmit}
            />
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default DetailCardAdditionalGoods;
