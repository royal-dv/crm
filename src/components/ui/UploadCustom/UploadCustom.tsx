import React, { ReactElement, useEffect, useState } from "react";
import { Upload, UploadProps, message } from "antd";
import { baseUrl5052, headers } from "../../../axiosConfig";

type Props = {
  typesOfFiles: string[];
  children: ReactElement;
  uploadedFiles: ([]) => void;
  numberFilesToUpload?: number;
};

const UploadCustom: React.FC<Props> = ({ children, typesOfFiles, uploadedFiles, numberFilesToUpload }) => {
  const props: UploadProps = {
    name: "file",
    action: `${baseUrl5052}file`,
    headers: headers,
    beforeUpload: (file) => {
      const types = typesOfFiles;
      const isAccepted = types.includes(file.type);
      if (!isAccepted) {
        message.error(`${file.name} данный файл не поддерживается`);
      }
      return isAccepted || Upload.LIST_IGNORE;
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        // Если файл не был загружен, валидацию не пропускаем
        const isErorr = info.fileList.map((i) => i.status === "error");

        uploadedFiles(!isErorr ? [] : info?.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} Файл успешно загружен`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} Ошибка загрузки.`);
      }
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  return (
    <Upload maxCount={numberFilesToUpload} {...props}>
      {children}
    </Upload>
  );
};

export default UploadCustom;
