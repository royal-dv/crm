import { Tabs } from "antd";
import styles from "./GalleryCardDetailed.module.scss";
import { IProject, IProjectJson, getProjectById, getProjectJsonById } from "../../../services/Projects";
import { useEffect, useState } from "react";
import ProjectPanorama from "./ProjectPanorama";
import Loader from "../../../components/ui/Loader/Loader";
import { useQuery } from "react-query";
import NotFound from "../../../components/NotFound/NotFound";
import { ReactComponent as QRIcon } from "../../../assets/icons/qr.svg";
import "./GalleryCardDetailed_override.scss";
import ButtonCustom from "../../../components/ui/ButtonCustom/ButtonCustom";
import GalleryQRCode from "./GalleryQRCode";

interface IGalleryCardDetailed {
  selectedProjectId: string;
}

const GalleryCardDetailed: React.FC<IGalleryCardDetailed> = ({ selectedProjectId }) => {
  const { data: projectData } = useQuery({
    queryFn: () => getProjectById(selectedProjectId),
    queryKey: ["project", selectedProjectId],
  });

  const { data: projectJsonData, isSuccess } = useQuery({
    queryFn: () => getProjectJsonById(selectedProjectId),
    queryKey: ["projectJson", selectedProjectId],
  });

  const [data, setData] = useState<IProject>();
  const [pano, setPano] = useState<IProjectJson[]>([]);
  const [qrModal, setQrModal] = useState(false);

  useEffect(() => {
    setData(projectData?.data ? projectData?.data : undefined);
  }, [projectData, selectedProjectId]);

  useEffect(() => {
    setPano(projectJsonData?.data ? projectJsonData.data.items : []);
  }, [projectJsonData, selectedProjectId, projectData]);

  const handleCloseQr = () => setQrModal(false);

  return (
    <div className={styles.gallery_card_detailed}>
      {!data && projectJsonData?.status !== 404 ? (
        <Loader />
      ) : !!pano?.length ? (
        <div className={styles.gallery_card_detailed__content}>
          <h2>{projectData?.data.name}</h2>
          <Tabs
            defaultActiveKey="0"
            tabPosition={"left"}
            style={{ height: 400 }}
            items={pano?.map((item, i) => {
              const id = String(i);
              return {
                label: (
                  <div
                    className={styles.gallery_card_detailed__label}
                    style={{ backgroundImage: `url(${`https://presales.storage.yandexcloud.net/${data?.id}/pano/${item?.preview}`})` }}
                  >
                    <img
                      alt="preview"
                      style={{ width: "100%", height: "auto" }}
                      src={`https://presales.storage.yandexcloud.net/${data?.id}/pano/${item?.preview}`}
                    />
                  </div>
                ),
                key: id,
                children: (
                  <div className={styles.gallery_card_detailed__panorama_container}>
                    <div className={"panorama_custom"}>
                      <ProjectPanorama
                        panoramaUrl={`https://presales.storage.yandexcloud.net/${data?.id}/pano/${item?.pano}`}
                        id={id}
                        sceneId={`${id} scene`}
                        height="400px"
                      />
                    </div>
                    <div className={styles.gallery_card_detailed__qr}>
                      <ButtonCustom isTransparent className={styles.gallery_card_detailed__qr_btn} onClick={() => setQrModal(true)}>
                        <QRIcon />
                      </ButtonCustom>
                    </div>
                    <GalleryQRCode
                      panoramaUrl={`${window.location.origin}/panorama-view/${data?.id}/pano/${item?.pano}`}
                      id={id}
                      item={item}
                      qrModal={qrModal}
                      handleCloseQr={handleCloseQr}
                    />
                  </div>
                ),
              };
            })}
          />
        </div>
      ) : (
        <NotFound title="Панорамы для этого проекта не найдены" />
      )}
    </div>
  );
};

export default GalleryCardDetailed;
