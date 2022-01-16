import { Button } from "antd";
import { useRouter } from "next/router";

const Demo = () => {
  const router = useRouter();

  const logout = () => {
    router.push("/login");
  };

  return (
    <>
      <Button type="primary" onClick={logout}>
        Logout
      </Button>
    </>
  );
};

// ReactDOM.render(<Demo />, mountNode);
export default Demo;
