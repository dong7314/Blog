import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import followUser from "../../_lib/follow/followUser";
import unfollowUser from "../../_lib/follow/unfollowUser";
import { getFollowers } from "../../_lib/follow/getFollowers";
import { User as IUser } from "@/app/_model/User.model";

export default function useFollow(author: IUser, sessionData: any) {
  const queryClient = useQueryClient();
  const userId = parseInt(sessionData?.user.id || "-1");
  const token = sessionData?.user.accessToken || "";

  const { data: followers = [] } = useQuery({
    queryKey: ["follow", "followers", `${author.id}`],
    queryFn: () => getFollowers(author.id),
  });

  const followMutation = useMutation({
    mutationFn: () => followUser(userId, author.id, token),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["follow", "followers", `${author.id}`],
      });
      const previousFollowers = queryClient.getQueryData<IUser[]>([
        "follow",
        "followers",
        `${author.id}`,
      ]);
      queryClient.setQueryData<IUser[]>(
        ["follow", "followers", `${author.id}`],
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
        ["follow", "followers", `${author.id}`],
        context?.previousFollowers,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["follow", "followers", `${author.id}`],
      });
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: () => unfollowUser(userId, author.id, token),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["follow", "followers", `${author.id}`],
      });
      const previousFollowers = queryClient.getQueryData<IUser[]>([
        "follow",
        "followers",
        `${author.id}`,
      ]);
      queryClient.setQueryData<IUser[]>(
        ["follow", "followers", `${author.id}`],
        (old) => (old ? old.filter((user) => user.id !== userId) : []),
      );
      return { previousFollowers };
    },
    onError: (_err, _variables, context) => {
      queryClient.setQueryData(
        ["follow", "followers", `${author.id}`],
        context?.previousFollowers,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["follow", "followers", `${author.id}`],
      });
    },
  });

  const handleFollow = () => followMutation.mutate();
  const handleUnfollow = () => unfollowMutation.mutate();

  const isFollowing = followers.some((user: IUser) => user.id === userId);

  return { followers, isFollowing, handleFollow, handleUnfollow };
}
