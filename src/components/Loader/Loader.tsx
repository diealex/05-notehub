import { SpinnerDiamond } from "spinners-react";
import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.wrap}>
      <div className={css.spinner}>
        <SpinnerDiamond
          size={50}
          thickness={100}
          speed={100}
          color="#bb2d3b"
          secondaryColor="rgba(0, 74, 212, 0.9)"
        />
      </div>
    </div>
  );
}
