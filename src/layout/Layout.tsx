import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen w-full ">
      <div className="flex flex-col h-screen w-full justify-center items-center">
        <Outlet />
      </div>

      <div className="flex-1" />
      <div className="w-full justify-center flex mb-10">
        <p>Built with ❤️❤️❤️</p>
      </div>
    </div>
  );
};

export default Layout;
