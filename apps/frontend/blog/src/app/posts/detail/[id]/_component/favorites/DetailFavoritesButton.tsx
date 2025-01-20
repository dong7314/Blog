"use client";
import Form from "next/form";
import { useSession } from "next-auth/react";
import { composeStyles } from "@vanilla-extract/css";
import { useOptimistic, useState } from "react";

import * as styles from "./DetailFavoritesButton.css";

import { Like } from "@/app/_model/Like.model";
import { Icon, Text } from "@frontend/coreui";
import toggleFavorite from "../../_lib/toggleFavorite";

type Props = {
  postId: number;
  favorites: Like[];
};
export default function DetailFavoritesButton({ postId, favorites }: Props) {
  const existInLikes = (favoritesList: Like[], id?: string) => {
    if (id) {
      const exist = favoritesList.find((favorite: Like) => {
        return favorite.user.id === parseInt(id);
      });

      return exist !== undefined ? true : false;
    }
    return false;
  };

  const { data } = useSession();
  const [favoritesData, setFavoritesData] = useState<Like[]>([...favorites]);
  const [optimisticFavorites, updateOptimisticFavorites] = useOptimistic(
    favoritesData,
    (prevFavorites: Like[], updatedUserId: string) => {
      const exist = existInLikes(prevFavorites, updatedUserId);

      let updatedFavorites: Like[] = [];
      if (exist) {
        updatedFavorites = prevFavorites.filter(
          (favorite: Like) => favorite.user.id !== parseInt(updatedUserId),
        );
      } else {
        updatedFavorites = [
          ...prevFavorites,
          {
            id: 999999999,
            user: {
              id: parseInt(updatedUserId),
              name: "",
              email: "",
              description: "",
              thumbnail: "",
            },
          },
        ];
      }

      return updatedFavorites;
    },
  );

  const handleClickFavoriteButton = async () => {
    // 낙관적 업데이트 진행
    updateOptimisticFavorites(data!.user.id);
    // api 요청
    const response = await toggleFavorite(postId, data!.user.accessToken!);
    // 요청 완료 후 업데이트 진행
    setFavoritesData(response);
  };

  return (
    <Form action={handleClickFavoriteButton} className={styles.form}>
      <button type="submit" className={styles.button}>
        <span
          className={composeStyles(
            styles.heartIcon,
            existInLikes(optimisticFavorites, data?.user.id)
              ? styles.activeHeartIcon
              : "",
          )}
        >
          <Icon
            type={
              existInLikes(optimisticFavorites, data?.user.id)
                ? "favorite_fill"
                : "favorite"
            }
            size="xl"
          ></Icon>
        </span>
        <Text
          className={styles.favoritesNumber}
          size="l"
          weight={500}
          color="#3F3F3F"
        >
          {optimisticFavorites.length}
        </Text>
      </button>
      {!data && <div className={styles.preventButtonFilter}></div>}
    </Form>
  );
}
