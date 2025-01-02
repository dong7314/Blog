import { composeStyles } from "@vanilla-extract/css";
import * as styles from "./PostArrows.css";

import { Icon } from "@frontend/coreui";

type Props = {
  style?: Object;
  className?: string;
  onClick?: () => void;
};

export function PostNextArrow({ className, onClick }: Props) {
  const disabled = className?.includes("slick-disabled");

  return (
    <div
      className={`${className} ${composeStyles(styles.arrow, styles.right)} ${disabled ? styles.disabled : ""}`}
      onClick={onClick}
    >
      <span className={styles.iconBox} style={{ marginLeft: "2px" }}>
        <Icon
          type="right"
          size="h"
          color={disabled ? "#c9c9c9" : "#595959"}
        ></Icon>
      </span>
    </div>
  );
}

export function PostPrevArrow({ className, onClick }: Props) {
  const disabled = className?.includes("slick-disabled");

  return (
    <div
      className={`${className} ${composeStyles(styles.arrow, styles.left)} ${disabled ? styles.disabled : ""}`}
      onClick={onClick}
    >
      <span className={styles.iconBox} style={{ marginRight: "2px" }}>
        <Icon
          type="left"
          size="h"
          color={disabled ? "#c9c9c9" : "#595959"}
        ></Icon>
      </span>
    </div>
  );
}
