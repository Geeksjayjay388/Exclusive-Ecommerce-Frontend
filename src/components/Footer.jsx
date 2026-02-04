import { Send, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-black text-white pt-20 pb-6 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                {/* Exclusive Section */}
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold">Exclusive</h3>
                    <div className="space-y-4">
                        <p className="text-xl font-medium">Subscribe</p>
                        <p className="text-base text-gray-300">Get 10% off your first order</p>
                        <div className="relative max-w-[217px]">
                            <input
                                type="text"
                                placeholder="Enter your email"
                                className="w-full bg-transparent border border-white rounded py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-gray-400 placeholder-gray-500"
                            />
                            <button className="absolute right-4 top-1/2 -translate-y-1/2 hover:scale-110 transition-transform">
                                <Send className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Support Section */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold">Support</h3>
                    <div className="space-y-4 text-gray-300">
                        <p className="leading-6">111 Bijoy sarani, Dhaka, <br />  DH 1515, Bangladesh.</p>
                        <p>exclusive@gmail.com</p>
                        <p>+88015-88888-9999</p>
                    </div>
                </div>

                {/* Account Section */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold">Account</h3>
                    <nav className="flex flex-col space-y-4 text-gray-300">
                        <Link to="/profile" className="hover:text-white transition-colors">My Account</Link>
                        <Link to="/signup" className="hover:text-white transition-colors">Login / Register</Link>
                        <Link to="/cart" className="hover:text-white transition-colors">Cart</Link>
                        <Link to="/wishlist" className="hover:text-white transition-colors">Wishlist</Link>
                        <Link to="/shop" className="hover:text-white transition-colors">Shop</Link>
                    </nav>
                </div>

                {/* Quick Link Section */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold">Quick Link</h3>
                    <nav className="flex flex-col space-y-4 text-gray-300">
                        <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms-of-use" className="hover:text-white transition-colors">Terms Of Use</Link>
                        <Link to="/faq" className="hover:text-white transition-colors">FAQ</Link>
                        <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
                    </nav>
                </div>

                {/* Download App Section */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold">Download App</h3>
                    <div className="space-y-4">
                        <p className="text-xs font-medium text-gray-500">Save $3 with App New User Only</p>
                        <div className="flex gap-2">
                            <div className="w-20 h-20 bg-white p-1 rounded">
                                <div className="w-full h-full bg-black"></div> {/* QR Placeholder */}
                            </div>
                            <div className="flex flex-col justify-between py-1">
                                <div className="bg-white/10 px-3 py-1.5 rounded flex items-center gap-2 cursor-pointer hover:bg-white/20 transition-colors">
                                    <div className="w-4 h-4 bg-white/20 rounded-sm"></div>
                                    <span className="text-[10px]">Google Play</span>
                                </div>
                                <div className="bg-white/10 px-3 py-1.5 rounded flex items-center gap-2 cursor-pointer hover:bg-white/20 transition-colors">
                                    <div className="w-4 h-4 bg-white/20 rounded-sm"></div>
                                    <span className="text-[10px]">App Store</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-6 pt-4">
                            <a href="#" className="hover:text-gray-400 transition-colors"><Facebook className="h-6 w-6" /></a>
                            <a href="#" className="hover:text-gray-400 transition-colors"><Twitter className="h-6 w-6" /></a>
                            <a href="#" className="hover:text-gray-400 transition-colors"><Instagram className="h-6 w-6" /></a>
                            <a href="#" className="hover:text-gray-400 transition-colors"><Linkedin className="h-6 w-6" /></a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-16 pt-4 border-t border-white/10 text-center">
                <p className="text-gray-600 text-base">
                    &copy; Copyright Rimel 2022. All right reserved
                </p>
            </div>
        </footer>
    );
};

export default Footer;
