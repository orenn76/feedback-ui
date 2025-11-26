import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';

const MainLayout = ({ isAdmin }) => {
  return (
    <>
      <Topbar />
      {isAdmin && <Sidebar />}
      <div className="flex-grow ml-30 p-6"> {/* Adjust margin-left to match sidebar width */}
        <Outlet />
      </div>
      <ToastContainer />
    </>
  );
};
export default MainLayout;
