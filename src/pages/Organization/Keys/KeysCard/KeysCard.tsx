import React, { useEffect, useState } from "react";
import SelectCustom from "../../../../components/ui/SelectCustom/SelectCustom";
import InputCustom from "../../../../components/ui/InputCustom/InputCustom";
import { ReactComponent as EditIcon } from "../../../../assets/icons/edit.svg";
import { ReactComponent as HideIcon } from "../../../../assets/icons/hide_eye.svg";
import styles from "./KeysCard.module.scss";
import ButtonCustom from "../../../../components/ui/ButtonCustom/ButtonCustom";
import { useQuery } from "react-query";
import { getOrganization } from "../../../../services/Organization";

type Props = {};

const mockData = [
  { id: "1", name: "Название / номер", placeholder_shop: "Адрес Магазина", placeholder_key: "ID ключа" },
  { id: "2", name: "Название / номер", placeholder_shop: "Адрес Магазина", placeholder_key: "ID ключа" },
  { id: "3", name: "Название / номер", placeholder_shop: "Адрес Магазина", placeholder_key: "ID ключа" },
];

const KeysCard: React.FC<Props> = () => {
  const { data: organization } = useQuery({
    queryFn: () => getOrganization(),
    queryKey: ["organization"],
  });

  const [editId, setEditId] = useState("");
  const [organizationId, setOrganizationId] = useState("");

  const editKeyHandler = (id: string) => {
    setEditId(id);

    if (id === editId) {
      setEditId("");
      return;
    }
  };

  useEffect(() => {
    if (!organization) return;
    setOrganizationId(organization.data.id);
  }, [organization]);

  return (
    <div className={styles.keysCards}>
      {mockData.map((k, index) => {
        return (
          <div key={k.id} className={styles.keysCards__card}>
            <div className={styles.keysCards__index}>{index + 1}</div>
            <div className={styles.keysCards__block}>{k.name}</div>
            <div className={styles.keysCards__block}>
              {k.id === editId ? <SelectCustom options={[]} placeholder={k.placeholder_shop} /> : <span>Adress</span>}
            </div>
            <div className={styles.keysCards__block}>
              {k.id === editId ? <InputCustom placeholder={k.placeholder_key} /> : <span>Input ID</span>}
            </div>
            <div className={styles.keysCards__btns}>
              <div className={styles.keysCards__edit} onClick={(e) => editKeyHandler(k.id)}>
                {k.id === editId ? <ButtonCustom children={<span>OK</span>} /> : <EditIcon />}
              </div>
              <div>
                <HideIcon />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default KeysCard;
