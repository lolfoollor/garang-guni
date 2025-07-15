import { useContext } from "react";
import { UiContext } from "../../context/ui-context";

const ToggleNav = () => {
  const { toggleNav } = useContext(UiContext);

  return (
    <div className="cursor-pointer" onClick={toggleNav}>
      <i className="fa-solid fa-bars fa-xl"></i>
    </div>
  );
};

export default ToggleNav;
