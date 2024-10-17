import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlusLg } from "react-icons/bs";
import GreenCheckmark from "./GreenCheckmark";

export default function ModuleControlButtons() {
  return (
    <div className="d-flex align-items-center float-end p-2">
      <GreenCheckmark />
      <BsPlusLg className="mx-1" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
