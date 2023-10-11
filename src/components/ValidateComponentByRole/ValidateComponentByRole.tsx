import React from "react";
import { useUser } from "../../context/useUser";

interface IProps {
  children: React.ReactNode;
  requiredRoles: string[];
}

const ValidateComponentByRole = ({ children, requiredRoles }: IProps) => {
  const { user } = useUser();
  if (!requiredRoles?.includes(user.role)) return null;
  return <>{children}</>;
};

export default ValidateComponentByRole;
