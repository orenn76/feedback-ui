import { FiBox, FiPackage, FiArchive, FiGrid } from 'react-icons/fi';
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? 'flex items-center bg-gray-200 text-black hover:bg-gray-200'
      : 'flex items-center bg-white text-black hover:bg-gray-200';

  const location = useLocation();

  const handleLinkClick = (path) => {
    if (location.pathname === path) {
      window.location.reload();
    }
  };

  return (
    <div className="sidebar">
      {/* top-[calc(3.75rem+1px)] because in topbar we have: border-b = 1px */}
      {/* border = vertical line */}
      <div className="fixed top-[calc(3.75rem+1px)] left-0 h-[calc(100vh-3.75rem)] w-30 bg-white shadow-lg border-r border-[#cccccc]">        
        {/* Put items in the center */}
        <div className="p-6 flex flex-col items-center">          
          <h2 className="text-2xl font-semibold mb-6">Menu</h2>
          <nav>
            <ul className="space-y-4">
              <li>
                <NavLink                  
                  to="/"
                  className={linkClass}
                  onClick={() => handleLinkClick('/')}
                >
                  <FiBox size={16} />
                  <span className="ml-1">Feedbacks</span>
                </NavLink>
              </li>              
              <li>
                <NavLink                  
                  to="/dashboard"
                  className={linkClass}
                  onClick={() => handleLinkClick('/dashboard')}
                >
                  <FiArchive size={16} />
                  <span className="ml-1">Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink                  
                  to="/contact"
                  className={linkClass}
                  onClick={() => handleLinkClick('/contact')}
                >
                  <FiGrid size={16} />
                  <span className="ml-1">Contact</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;