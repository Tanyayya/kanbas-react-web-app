import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";

export default function LessonControlButtons() {
  return (
    <div className="float-end me-3 d-flex align-items-center fs-5">
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-5 ms-1" />
    </div>
  );
}
