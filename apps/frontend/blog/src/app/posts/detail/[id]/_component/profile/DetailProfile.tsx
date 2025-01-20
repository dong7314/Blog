"use client";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import * as styles from "./DetailProfile.css";

import { Button, Text, TextButton } from "@frontend/coreui";
import { User as IUser, User } from "@/app/_model/User.model";
import { getFollowers } from "../../_lib/getFollowers";
import { useEffect, useState } from "react";
import followUser from "../../_lib/followUser";

type Props = {
  author: IUser;
};
export default function DetailProfile({ author }: Props) {
  const session = useSession();
  const queryClient = useQueryClient();

  const { data: followers = [] } = useQuery({
    queryKey: ["follow", "followers", `${author.id}`],
    queryFn: () => getFollowers(author.id),
  });

  const followMutation = useMutation({
    mutationFn: ({
      userId,
      followId,
      token,
    }: {
      userId: number;
      followId: number;
      token: string;
    }) => followUser(userId, followId, token),
    onMutate: async ({ userId, followId }) => {
      await queryClient.cancelQueries({
        queryKey: ["follow", "followers", `${followId}`],
      });
      const previousFollowers = queryClient.getQueryData<User[]>([
        "follow",
        "followers",
        `${userId}`,
      ]);

      queryClient.setQueryData<User[]>(
        ["follow", "followers", `${followId}`],
        (old) =>
          old
            ? [
                ...old,
                {
                  id: userId,
                  name: "",
                  email: "",
                  description: "",
                  thumbnail: "",
                },
              ]
            : [],
      );

      return { previousFollowers };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(
        ["follow", "followers", `${_variables.followId}`],
        context?.previousFollowers,
      );
    },
    onSettled: (_data, _error, _variables) => {
      queryClient.invalidateQueries({
        queryKey: ["follow", "followers", `${_variables.followId}`],
      });
    },
  });

  // 버튼 상태 설정
  const isFollowing = followers.some(
    (user: User) => user.id === parseInt(session.data?.user.id || "-1"),
  );

  const handleFollow = () => {
    if (session.data) {
      followMutation.mutate({
        userId: parseInt(session.data.user.id!),
        followId: author.id,
        token: session.data.user.accessToken!,
      });
    }
  };

  const handleUnfollow = () => {
    // if (session.data) {
    //   unfollowMutation.mutate(parseInt(session.data.user.id));
    // }
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileBox}>
        <div className={styles.profile}>
          <Image
            src={"/profile.png"}
            alt={"profile-icon"}
            width={72}
            height={72}
            className={styles.profileIcon}
          />
          <div className={styles.profileUser}>
            <TextButton size="dxl" weight={600}>
              {author.name}
            </TextButton>
            <Text color="#7F7F7F" size="s" className={styles.email}>
              {author.email}
            </Text>
          </div>
        </div>
        {session.data && author.id !== parseInt(session.data.user.id) && (
          <div className={styles.followButtonBox}>
            {isFollowing ? (
              <Button
                rounded={true}
                type="tertiary"
                size="l"
                onClick={handleUnfollow}
              >
                언팔로우
              </Button>
            ) : (
              <Button
                rounded={true}
                type="primary"
                size="l"
                onClick={handleFollow}
              >
                팔로우
              </Button>
            )}
          </div>
        )}
      </div>
      <div className={styles.profileDescription}>
        <Text color="#595959">{author.description}</Text>
      </div>
    </div>
  );
}
