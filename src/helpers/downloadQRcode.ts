export const getQrAndDownload = (path_to_qr: string, file_name: string) => {
  const canvas = document.querySelector(`.${path_to_qr} canvas`) as HTMLCanvasElement;
  const pngUrl = canvas?.toDataURL("image/png").replace("image/png", "image/octet-stream");
  let downloadLink = document.createElement("a");
  downloadLink.href = pngUrl;
  downloadLink.download = `${file_name}.png`;
  downloadLink.click();
};
