import * as styles from "./Menu.css";

import MenuData from "./model/MenuData";

import MenuItem from "./item/MenuItem";
import MenuButtons from "./buttons/MenuButtons";

export default async function Menu() {
  /* 
    todo
    await으로 쿠키에 담긴 유저의 정보에 따라 메뉴 데이터 불러오기
  */
  const menuData: MenuData[] = [
    { menuName: "홈", link: "/home" },
    { menuName: "게시글", link: "/posts" },
    { menuName: "노트", link: "/note" },
    { menuName: "마이페이지", link: "/profile" },
    { menuName: "공지사항", link: "/notifications" },
  ];

  return (
    <div className={styles.menuBar}>
      <ul className={styles.menu}>
        {menuData &&
          menuData.map((data, index) => {
            return <MenuItem data={data} key={index} />;
          })}
      </ul>
      <div className={styles.menuButtons}>
        <MenuButtons />
      </div>
    </div>
  );
}
