import content from "../../../settings/content";
import styles from "./GalleryFilters.module.scss";
import SelectCustom from "../../../components/ui/SelectCustom/SelectCustom";
import ButtonCustom from "../../../components/ui/ButtonCustom/ButtonCustom";
import { useQuery } from "react-query";
import { getSource } from "../../../services/Source";
import { useEffect, useState } from "react";

interface ISettingsBtn {
  id: string;
  placeholder: string;
  icon?: boolean;
  disabled?: boolean;
  mode?: string;
}

interface ISourceSelect {
  value: string;
  label: string;
}

interface IProps {
  setSearchQuery: (select_name: string, value: string) => void;
  updateProjects: () => void;
}

const GalleryFilters: React.FC<IProps> = ({ setSearchQuery, updateProjects }) => {
  const [roomTypes, setRoomTypes] = useState<ISourceSelect[]>();
  const { data: source } = useQuery({
    queryFn: () => getSource("room_type"),
    queryKey: ["source"],
  });

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

  const handleSelectChange = (select_name: string, value: string) => {
    setSearchQuery(select_name, value);
  };

  // В методе deselect возможно придется расширить логику
  // Сейчас есть только один справочник "Ванные комнаты"
  return (
    <div className={styles.gallery_filters}>
      <div className={styles.gallery_filters__types}>
        {content.gallery.settings.types.map((btn: ISettingsBtn) => {
          return (
            <div key={btn.id} className={styles.gallery_filters__select}>
              <SelectCustom
                width="100%"
                key={btn.id}
                disabled={btn.disabled}
                mode={btn.mode === "multiple" ? "multiple" : "tags"}
                placeholder={btn.placeholder}
                onChange={(value) => handleSelectChange(btn.id, value)}
                onDeselect={() => updateProjects()}
                options={
                  btn.id === "room_type"
                    ? [...(roomTypes || [])]
                    : [
                        { value: "jack", label: "Jack" },
                        { value: "lucy", label: "Lucy" },
                        { value: "Yiminghe", label: "yiminghe" },
                        { value: "disabled", label: "Disabled", disabled: true },
                      ]
                }
                className={"custom_select_orange"}
              />
            </div>
          );
        })}
      </div>
      <div className={styles.gallery_filters__search}>
        <ButtonCustom
          onClick={() => updateProjects()}
          className={styles.gallery_filters__custom_button}
          key={content.gallery.settings.search.id}
          children={<span>{content.gallery.settings.search.text}</span>}
          bgColor="gray"
        />
      </div>
    </div>
  );
};

export default GalleryFilters;
