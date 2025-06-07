import { SpinnerDiamond } from "spinners-react";
import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.wrap}>
      <SpinnerDiamond
        size={50}
        thickness={100}
        speed={100}
        color="#bb2d3b"
        secondaryColor="rgba(122, 122, 122, 0.44)"
      />
    </div>
  );
}
