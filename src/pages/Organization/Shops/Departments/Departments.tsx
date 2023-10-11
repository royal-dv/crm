import { useQuery } from "react-query";
import { IGetDepartments, getDepartment } from "../../../../services/Department";
import { useEffect, useState } from "react";
import styles from "./Departments.module.scss";
import content from "../../../../settings/content";

export interface IProps {
  shop_id: string;
}

const Departments: React.FC<IProps> = ({ shop_id }) => {
  const [data, setData] = useState<IGetDepartments>();

  const { data: departments } = useQuery({
    queryFn: () => getDepartment(shop_id),
    queryKey: [`departments_${shop_id}`],
  });

  useEffect(() => {
    if (!departments) return;
    setData(departments);
  }, [departments, shop_id]);

  return (
    <div className={styles.departments}>
      {data?.data.length ? (
        data?.data.map((dep) => {
          return (
            <div key={dep.id} className={styles.departments__item}>
              {dep.name}
            </div>
          );
        })
      ) : (
        <span className={styles.departments__none}>{content.organizations.shops.departments_not_set}</span>
      )}
    </div>
  );
};

export default Departments;
