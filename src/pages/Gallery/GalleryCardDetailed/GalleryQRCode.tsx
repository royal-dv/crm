import { Modal, QRCode } from "antd";
import styles from "./GalleryCardDetailed.module.scss";
import ButtonCustom from "../../../components/ui/ButtonCustom/ButtonCustom";
import { ReactComponent as CloseIcon } from "../../../assets/icons/cross.svg";
import { IProjectJson } from "../../../services/Projects";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";

interface Props {
  id: string;
  panoramaUrl: string;
  item: IProjectJson;
  qrModal: boolean;
  handleCloseQr: () => void;
}

const GalleryQRCode: React.FC<Props> = ({ id, panoramaUrl, item, handleCloseQr, qrModal }) => {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <Modal closeIcon={false} className={"custom_shop_modal"} width={380} footer={null} onCancel={() => handleCloseQr()} open={qrModal}>
      <div className={styles.gallery_card_detailed__modal_qr_header}>
        <span>QRCode</span>
        <ButtonCustom
          isTransparent
          maxWidth="20px"
          className={styles.gallery_card_detailed__modal_qr_close}
          onClick={() => handleCloseQr()}
        >
          <CloseIcon />
        </ButtonCustom>
      </div>
      <div className={styles.gallery_card_detailed__qr_container}>
        <Link className={styles.gallery_card_detailed_qr} to={panoramaUrl.replace(/^https?:\/\/[^/]+\//i, "")}>
          <QRCode className={`qr_${id}`} size={256} style={{ height: "auto", maxWidth: "100%", width: "100%" }} value={panoramaUrl} />
        </Link>
        <CopyToClipboard text={panoramaUrl} onCopy={() => setIsCopied(true)}>
          <button className={styles.gallery_card_detailed_copy}>Скопировать ссылку</button>
        </CopyToClipboard>
        {isCopied && <span style={{ color: "green" }}>Ссылка скопирована</span>}
      </div>
    </Modal>
  );
};

export default GalleryQRCode;
