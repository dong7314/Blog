import Login from "@/app/_component/login/Login";
import LoginModal from "@/app/_component/login/modal/LoginModal";

export default function LoginModalPage() {
  return (
    <LoginModal width="370px" height="500px">
      <Login modal={true} />
    </LoginModal>
  );
}
