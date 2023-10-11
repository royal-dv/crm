import React, { Dispatch, ReactElement, useContext, useEffect, useReducer, useState } from "react";
import { useQuery } from "react-query";
import { getCurrentUserInfo } from "../services/User";

interface IUserProps {
  children: ReactElement;
}

export interface IUser {
  email: string;
  id: string;
  login: string;
  name: string;
  phone: string;
  role: string;
}

interface IUserContext {
  user: IUser;
}

const initialUser: IUser = {
  email: "",
  id: "",
  login: "",
  name: "",
  phone: "",
  role: "",
};
const initialContext: IUserContext = {
  user: { ...initialUser },
};

const UserContext = React.createContext<IUserContext>(initialContext);

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider: React.FC<IUserProps> = ({ children }) => {
  const [user, setUser] = useState<IUser>(initialUser);
  const { data: userInfo } = useQuery({
    queryFn: () => getCurrentUserInfo(),
    queryKey: ["user"],
  });

  useEffect(() => {
    console.log("userInfo", userInfo);
    if (!userInfo) {
      return;
    }
    setUser(userInfo);
  }, [userInfo]);

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};
