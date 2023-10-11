import InputCustom from "../ui/InputCustom/InputCustom";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";

import styles from "./SearchBar.module.scss";
import { IInput } from "../ui/InputCustom/InputCustom";

interface IInputSearchProps extends IInput {}

const SearchBar: React.FC<IInputSearchProps> = ({ placeholder, className, onChange, value }) => {
  return (
    <InputCustom
      className={className ? className : styles.search_bar}
      placeholder={placeholder}
      suffix={<SearchIcon />}
      onChange={onChange}
      value={value}
    ></InputCustom>
  );
};

export default SearchBar;
