"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Button, Text, TextButton } from "@frontend/coreui";

import * as styles from "./DetailProfile.css";

import useFollow from "../../_hooks/useFollow";
import FollowButton from "./button/FollowButton";
import { User as IUser } from "@/app/_model/User.model";

type Props = {
  author: IUser;
};

export default function DetailProfile({ author }: Props) {
  const session = useSession();
  const { isFollowing, handleFollow, handleUnfollow } = useFollow(
    author,
    session.data,
  );

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
            <FollowButton
              isFollowing={isFollowing}
              onFollow={handleFollow}
              onUnfollow={handleUnfollow}
            />
          </div>
        )}
      </div>
      <div className={styles.profileDescription}>
        <Text color="#595959">{author.description}</Text>
      </div>
    </div>
  );
}
