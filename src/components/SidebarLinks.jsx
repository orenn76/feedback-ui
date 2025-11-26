
const Sidebar = () => {
    return (
        <div className="relative">
            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out 'translate-x-0' 
                    }`}
            >
                <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-6">Sidebar</h2>
                    <nav>
                        <ul className="space-y-4">
                            <li>
                                <a href="#" className="block hover:text-blue-600">Home</a>
                            </li>
                            <li>
                                <a href="#" className="block hover:text-blue-600">About</a>
                            </li>
                            <li>
                                <a href="#" className="block hover:text-blue-600">Services</a>
                            </li>
                            <li>
                                <a href="#" className="block hover:text-blue-600">Contact</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

