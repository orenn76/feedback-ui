import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const Topbar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? 'bg-blue-400 text-black hover:bg-blue-700 hover:text-white rounded-md px-3 py-2'
      : 'text-black hover:bg-blue-700 hover:text-white rounded-md px-3 py-2';

  return (
    // fixed positioning: fixed top-0 left-0 right-0 z-[1001]
    // border: horizentical line (border-b = 1px, border-b-2 = 2px)
    <nav className='fixed top-0 left-0 right-0 bg-white border-b border-[#cccccc] z-[1001]'>
      {/* <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'> - for large margins*/}
      <div className='flex h-[3.75rem] items-center justify-between px-4'>
        <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
          {/* Logo */}
          <NavLink className='flex flex-shrink-0 items-center mr-4' to='/'>
            <img className='h-10 w-auto' src={logo} alt='React Jobs' />
            <span className='hidden md:block text-black text-2xl font-bold ml-2'>
              Feedback
            </span>
          </NavLink>

          {/* Navigation Links */}
          <div className='md:ml-auto'>
            <div className='flex space-x-2'>
              <NavLink to='/' className={linkClass}>
                Log In
              </NavLink>
              <NavLink to='/jobs' className={linkClass}>
                Sign Up
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </nav>
  );
};

export default Topbar;
