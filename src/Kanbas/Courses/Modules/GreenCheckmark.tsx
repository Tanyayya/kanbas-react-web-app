import { FaCheckCircle, FaCircle } from "react-icons/fa";

export default function GreenCheckmark() {
  return (
    <span className="position-relative d-inline-block" style={{ width: "1.5em", height: "1.5em" }}>
      <FaCircle
        className="text-white position-absolute"
        style={{ top: 3, left: 0, fontSize: "1.1em" }}
      />
      <FaCheckCircle
        className="text-success position-absolute"
        style={{ top: 3, left: 0, fontSize: "1.1em" }}
      />
    </span>
  );
}
