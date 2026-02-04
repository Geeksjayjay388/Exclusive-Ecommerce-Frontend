import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Calendar, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <p className="text-xl font-medium mb-4">Please log in to view your profile.</p>
                <button
                    onClick={() => navigate('/login')}
                    className="bg-[#DB4444] text-white px-8 py-3 rounded font-bold hover:bg-[#c93d3d] transition-all"
                >
                    Go to Login
                </button>
            </div>
        );
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-20">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Header/Cover */}
                <div className="h-32 bg-gradient-to-r from-gray-900 to-gray-800"></div>

                <div className="px-8 pb-8">
                    {/* Profile Image & Name */}
                    <div className="relative -mt-16 mb-8 flex items-end justify-between">
                        <div className="flex items-end gap-6">
                            <div className="h-32 w-32 rounded-2xl bg-white p-1 shadow-md">
                                <div className="h-full w-full rounded-xl bg-[#F5F5F5] flex items-center justify-center">
                                    <User className="h-16 w-16 text-gray-400" />
                                </div>
                            </div>
                            <div className="pb-2">
                                <h1 className="text-3xl font-bold text-black">{user.name}</h1>
                                <p className="text-gray-500 font-medium capitalize">{user.role}</p>
                            </div>
                        </div>
                        <button className="bg-gray-100 p-3 rounded-xl hover:bg-gray-200 transition-all active:scale-95">
                            <Settings className="h-6 w-6 text-black" />
                        </button>
                    </div>

                    {/* Stats or Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold border-b pb-2">Account Information</h2>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</p>
                                        <p className="text-black font-medium">{user.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
                                    <Shield className="h-5 w-5 text-gray-400" />
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Account Role</p>
                                        <p className="text-black font-medium capitalize">{user.role}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
                                    <Calendar className="h-5 w-5 text-gray-400" />
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Member Since</p>
                                        <p className="text-black font-medium">February 2026</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-xl font-bold border-b pb-2">Quick Actions</h2>
                            <div className="grid grid-cols-1 gap-4">
                                <button className="w-full text-left p-4 rounded-xl border border-gray-100 hover:border-black hover:bg-black hover:text-white transition-all group flex items-center justify-between">
                                    <span className="font-bold">Edit Profile</span>
                                    <User className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-all" />
                                </button>
                                <button className="w-full text-left p-4 rounded-xl border border-gray-100 hover:border-black hover:bg-black hover:text-white transition-all group flex items-center justify-between">
                                    <span className="font-bold">My Orders</span>
                                    <Shield className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-all" />
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left p-4 rounded-xl border border-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all group flex items-center justify-between"
                                >
                                    <span className="font-bold">Logout Session</span>
                                    <LogOut className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
