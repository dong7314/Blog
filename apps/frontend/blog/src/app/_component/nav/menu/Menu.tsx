import * as styles from "./Menu.css";

import MenuData from "./model/MenuData";

import MenuItem from "./item/MenuItem";

export default async function Menu() {
  /* 
    todo
    await으로 쿠키에 담긴 유저의 정보에 따라 메뉴 데이터 불러오기
  */
  const menuData: MenuData[] = [
    { menuName: "홈", link: "/home" },
    { menuName: "게시글", link: "/posts" },
    { menuName: "노트", link: "/category" },
    { menuName: "태그", link: "/tags" },
  ];

  return (
    <ul className={styles.menu}>
      {menuData &&
        menuData.map((data) => {
          return <MenuItem data={data} />;
        })}
    </ul>
  );
}
