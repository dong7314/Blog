import { composeStyles } from "@vanilla-extract/css";

import * as styles from "./ProfileIcon.css";

import Image from "next/image";
import Avatar from "boring-avatars";

type Props = {
  size: number;
  name?: string;
  thumbnail?: string;
  className?: string;
};
export default function ProfileIcon({
  size,
  name,
  thumbnail,
  className,
}: Props) {
  return (
    <div className={composeStyles(styles.profileIcon, className ?? "")}>
      {thumbnail ? (
        <Image
          src={thumbnail}
          alt={"profile-icon"}
          width={size}
          height={size}
        />
      ) : (
        <Avatar name={name} variant="beam" size={size} />
      )}
    </div>
  );
}
