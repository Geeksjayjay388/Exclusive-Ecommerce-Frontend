import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Search, Menu, X, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Contact', path: '/contact' },
        { name: 'About', path: '/about' },
        ...(!user ? [{ name: 'Sign Up', path: '/signup' }] : []),
        ...(user?.role === 'admin' ? [{ name: 'Dashboard', path: '/admin/dashboard' }] : []),
    ];

    return (
        <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
            {/* Top Header - Optional, adding for premium feel */}
            <div className="bg-black text-white text-xs py-2 px-4 text-center">
                Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
                <Link to="/shop" className="font-bold underline ml-2 hover:text-gray-300 transition-colors">ShopNow</Link>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center">
                        <h1 className="text-2xl font-bold tracking-tight text-black">Exclusive</h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) =>
                                    `text-base font-medium transition-colors hover:text-gray-600 ${isActive ? 'border-b-2 border-black' : 'text-black'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    {/* Right Side Icons & Search */}
                    <div className="flex items-center space-x-4">
                        {/* Search Bar */}
                        <div className="hidden lg:flex items-center bg-gray-100 rounded-lg px-3 py-2">
                            <input
                                type="text"
                                placeholder="What are you looking for?"
                                className="bg-transparent border-none focus:ring-0 text-sm w-48 text-gray-600 placeholder-gray-400"
                            />
                            <Search className="h-5 w-5 text-gray-500 cursor-pointer hover:text-black transition-colors" />
                        </div>

                        {/* Action Icons */}
                        <div className="flex items-center space-x-4">
                            <Link to="/wishlist" className="p-2 rounded-full hover:bg-gray-100 transition-all active:scale-95">
                                <Heart className="h-6 w-6 text-black" />
                            </Link>
                            <Link to="/cart" className="p-2 rounded-full hover:bg-gray-100 transition-all active:scale-95 relative">
                                <ShoppingCart className="h-6 w-6 text-black" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-[#DB4444] text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                            {user ? (
                                <div className="flex items-center space-x-2">
                                    <Link to="/profile" className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100">
                                        <User className="h-6 w-6 text-black" />
                                        <span className="hidden lg:block text-sm font-medium">{user.name}</span>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="text-xs font-bold text-[#DB4444] hover:underline"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <Link to="/login" className="text-sm font-medium hover:text-gray-600 transition-colors">
                                    Login
                                </Link>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden animate-in slide-in-from-top duration-300">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) =>
                                    `block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive ? 'bg-gray-50 text-black' : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                                    }`
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                        {/* Search for mobile */}
                        <div className="px-3 py-2">
                            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="bg-transparent border-none focus:ring-0 text-sm w-full text-gray-600"
                                />
                                <Search className="h-5 w-5 text-gray-500" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
