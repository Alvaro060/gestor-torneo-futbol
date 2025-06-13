import { Outlet } from "react-router-dom";
import Menu from "../components/Menu";

const Home: React.FC = () => {
  return (
    <>
      <Menu />
      <Outlet />
    </>
  );
};

export default Home;