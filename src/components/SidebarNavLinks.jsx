import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="fixed top-0 left-0 h-screen w-30 bg-white shadow-lg flex">
                <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-6">Sidebar</h2>
                    <nav>
                        <ul className="space-y-4">
                            <li>
                                <NavLink to="/" exact activeClassName="active">
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/about" activeClassName="active">
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/services" activeClassName="active">
                                    Services
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact" activeClassName="active">
                                    Contact
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
                {/* Vertical Line */}
                <div className="w-0.5 bg-indigo-200"></div> {/* Adjust width and color as needed */}
            </div>
        </div>
    );
};

export default Sidebar;
