import { getCurrentUserInfo } from "../services/User";
import content from "../settings/content";

export const getPermittedPages = async () => {
  const user = await getCurrentUserInfo();

  const pages = Object.entries(content.pages)
    .map((page) => (page[1].requiredRole.includes(user.role) ? page[0] : null))
    .filter((i) => i !== null);

  return pages;
};
