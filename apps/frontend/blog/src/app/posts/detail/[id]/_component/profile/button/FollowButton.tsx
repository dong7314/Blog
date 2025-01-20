import { Button } from "@frontend/coreui";

export default function FollowButton({
  isFollowing,
  onFollow,
  onUnfollow,
}: {
  isFollowing: boolean;
  onFollow: () => void;
  onUnfollow: () => void;
}) {
  return isFollowing ? (
    <Button rounded={true} type="tertiary" size="l" onClick={onUnfollow}>
      언팔로우
    </Button>
  ) : (
    <Button rounded={true} type="primary" size="l" onClick={onFollow}>
      팔로우
    </Button>
  );
}
