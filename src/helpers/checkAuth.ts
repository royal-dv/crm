import Cookies from "js-cookie";

export const checkAuthenticated = () => {
  const cookie = Cookies.get("access_token");
  if (cookie) {
    return true;
  }
  return false;
};
