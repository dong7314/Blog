import Image from "next/image";
import * as styles from "./Logo.css";
import LogoImage from "../../../../../public/Logo.png";
import Link from "next/link";

export default function Logo() {
  return (
    <div className={styles.logo}>
      <Link href={"/home"}>
        <Image src={LogoImage} alt="DPOST" height={40} priority />
      </Link>
    </div>
  );
}
