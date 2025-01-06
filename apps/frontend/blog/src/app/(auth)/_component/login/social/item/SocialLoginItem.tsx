import Image from "next/image";

import * as styles from "./SocialLoginItem.css";

type Props = {
  item: string;
};

export default function SocialLoginItem({ item }: Props) {
  return (
    <div className={styles.item}>
      <Image src={`/${item}.png`} alt={item} width={36} height={36} priority />
    </div>
  );
}
