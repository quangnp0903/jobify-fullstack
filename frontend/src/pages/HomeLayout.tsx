import { Outlet } from 'react-router-dom';

const HomeLayout: React.FC = () => {
  return (
    <>
      {/* add things like Navbar */}
      {/* <h1>Home Layout</h1< */}
      <Outlet />
    </>
  );
};

export default HomeLayout;
