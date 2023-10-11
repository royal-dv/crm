import React from "react";
import OrganizationHeader from "../OrganizationHeader/OrganizationHeader";
import content from "../../../settings/content";
import KeysCard from "./KeysCard/KeysCard";

type Props = {};

const Keys: React.FC<Props> = ({}) => {
  return (
    <div>
      <OrganizationHeader title={""} placeholder={content.organizations.keys.placeholder} />
      <KeysCard />
    </div>
  );
};
export default Keys;
