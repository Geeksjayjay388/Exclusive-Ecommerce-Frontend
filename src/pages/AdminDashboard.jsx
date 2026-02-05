import { useState, useEffect } from 'react';
import { Upload, X, Package, Trash2, CheckCircle, Users, TrendingUp, ShoppingBag, DollarSign, Calendar, Mail, Heart } from 'lucide-react';
import api from '../utils/api';

const AdminDashboard = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
    });
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Dashboard data
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalUsers: 0,
        recentUsers: 0,
        revenue: 0
    });
    const [recentMembers, setRecentMembers] = useState([]);
    const [mostLikedProducts, setMostLikedProducts] = useState([]);
    const [dashboardLoading, setDashboardLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [statsRes, membersRes, likedRes] = await Promise.all([
                api.get('/api/analytics/dashboard-stats'),
                api.get('/api/analytics/recent-members?limit=5'),
                api.get('/api/analytics/most-liked-products?limit=8')
            ]);

            setStats(statsRes.data);
            setRecentMembers(membersRes.data);
            setMostLikedProducts(likedRes.data);
        } catch (err) {
            console.error('Failed to fetch dashboard data:', err);
        } finally {
            setDashboardLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + images.length > 5) {
            setError('Maximum 5 images allowed');
            return;
        }

        setImages([...images, ...files]);

        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviews([...previews, ...newPreviews]);
    };

    const removeImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);

        const newPreviews = [...previews];
        newPreviews.splice(index, 1);
        setPreviews(newPreviews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        const productFormData = new FormData();
        Object.keys(formData).forEach(key => productFormData.append(key, formData[key]));
        images.forEach(image => productFormData.append('images', image));

        try {
            await api.post('/api/products', productFormData);
            setMessage('Product created successfully!');
            setFormData({ name: '', description: '', price: '', category: '', stock: '' });
            setImages([]);
            setPreviews([]);
            fetchDashboardData(); // Refresh stats
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create product');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const maxLikes = Math.max(...mostLikedProducts.map(p => p.likeCount), 1);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="bg-gradient-to-br from-[#DB4444] to-[#c93d3d] p-4 rounded-2xl shadow-lg shadow-red-200">
                        <Package className="h-8 w-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                            Admin Dashboard
                        </h1>
                        <p className="text-gray-500 mt-1">Manage your e-commerce platform</p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-blue-50 p-3 rounded-xl group-hover:bg-blue-100 transition-colors">
                                <ShoppingBag className="h-6 w-6 text-blue-600" />
                            </div>
                            <span className="text-2xl">📦</span>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium mb-1">Total Products</h3>
                        <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
                    </div>

                    <div className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-green-50 p-3 rounded-xl group-hover:bg-green-100 transition-colors">
                                <Users className="h-6 w-6 text-green-600" />
                            </div>
                            <span className="text-2xl">👥</span>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium mb-1">Total Users</h3>
                        <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                    </div>

                    <div className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-purple-50 p-3 rounded-xl group-hover:bg-purple-100 transition-colors">
                                <TrendingUp className="h-6 w-6 text-purple-600" />
                            </div>
                            <span className="text-2xl">🆕</span>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium mb-1">New This Week</h3>
                        <p className="text-3xl font-bold text-gray-900">{stats.recentUsers}</p>
                    </div>

                    <div className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-amber-50 p-3 rounded-xl group-hover:bg-amber-100 transition-colors">
                                <DollarSign className="h-6 w-6 text-amber-600" />
                            </div>
                            <span className="text-2xl">💰</span>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium mb-1">Revenue</h3>
                        <p className="text-3xl font-bold text-gray-900">${stats.revenue}</p>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Members */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
                            <div className="flex items-center gap-3">
                                <Users className="h-6 w-6" />
                                <h2 className="text-xl font-bold">New Members</h2>
                            </div>
                            <p className="text-indigo-100 text-sm mt-1">Recently joined users</p>
                        </div>
                        <div className="p-6">
                            {dashboardLoading ? (
                                <div className="flex justify-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                                </div>
                            ) : recentMembers.length === 0 ? (
                                <p className="text-center text-gray-400 py-8">No members yet</p>
                            ) : (
                                <div className="space-y-4">
                                    {recentMembers.map((member, index) => (
                                        <div
                                            key={member._id}
                                            className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all group"
                                            style={{ animationDelay: `${index * 100}ms` }}
                                        >
                                            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shadow-md group-hover:scale-110 transition-transform">
                                                {getInitials(member.name)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-gray-900 truncate">{member.name}</h3>
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <Mail className="h-3 w-3" />
                                                    <span className="truncate">{member.email}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className="text-xs font-medium text-gray-400 flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {formatDate(member.createdAt)}
                                                </span>
                                                {member.role === 'admin' && (
                                                    <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full mt-1">
                                                        Admin
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Most Liked Products */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-6 text-white">
                            <div className="flex items-center gap-3">
                                <Heart className="h-6 w-6" />
                                <h2 className="text-xl font-bold">Most Liked Items</h2>
                            </div>
                            <p className="text-pink-100 text-sm mt-1">Top products by customer favorites</p>
                        </div>
                        <div className="p-6">
                            {dashboardLoading ? (
                                <div className="flex justify-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
                                </div>
                            ) : mostLikedProducts.length === 0 ? (
                                <p className="text-center text-gray-400 py-8">No liked products yet</p>
                            ) : (
                                <div className="space-y-3">
                                    {mostLikedProducts.map((product, index) => (
                                        <div
                                            key={product._id}
                                            className="flex items-center gap-4 group hover:bg-gray-50 p-2 rounded-xl transition-all"
                                        >
                                            <span className="text-lg font-bold text-gray-300 w-6">#{index + 1}</span>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-gray-900 text-sm truncate">{product.name}</h3>
                                                <p className="text-xs text-gray-500">{product.category}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center gap-1 bg-pink-50 px-3 py-1 rounded-full">
                                                    <Heart className="h-4 w-4 text-pink-500 fill-pink-500" />
                                                    <span className="text-sm font-bold text-pink-600">{product.likeCount}</span>
                                                </div>
                                            </div>
                                            {/* Visual bar */}
                                            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-pink-500 to-rose-600 rounded-full transition-all duration-500"
                                                    style={{ width: `${(product.likeCount / maxLikes) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Product Creation Form */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 text-white">
                        <div className="flex items-center gap-3">
                            <Package className="h-6 w-6 text-[#DB4444]" />
                            <div>
                                <h2 className="text-xl font-bold">Create New Product</h2>
                                <p className="text-gray-400 text-sm mt-1">Add a new product to your inventory</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-8">
                        {message && (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-3 animate-fade-in">
                                <CheckCircle className="h-5 w-5" />
                                {message}
                            </div>
                        )}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg animate-fade-in">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-gray-700">Product Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#DB4444] focus:ring-2 focus:ring-red-100 focus:outline-none transition-all"
                                        placeholder="e.g. HAVIT HV-G92 Gamepad"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-gray-700">Category</label>
                                    <input
                                        type="text"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#DB4444] focus:ring-2 focus:ring-red-100 focus:outline-none transition-all"
                                        placeholder="e.g. Electronics"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-2 text-gray-700">Price ($)</label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#DB4444] focus:ring-2 focus:ring-red-100 focus:outline-none transition-all"
                                            placeholder="0.00"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-2 text-gray-700">Stock</label>
                                        <input
                                            type="number"
                                            name="stock"
                                            value={formData.stock}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#DB4444] focus:ring-2 focus:ring-red-100 focus:outline-none transition-all"
                                            placeholder="0"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-gray-700">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#DB4444] focus:ring-2 focus:ring-red-100 focus:outline-none transition-all resize-none"
                                        placeholder="Describe the product details..."
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Image Upload Area */}
                        <div>
                            <label className="block text-sm font-semibold mb-4 text-gray-700">Product Images (Max 5)</label>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                {previews.map((preview, index) => (
                                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-100 group">
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-full text-red-500 hover:bg-white transition-all shadow-lg opacity-0 group-hover:opacity-100"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                                {previews.length < 5 && (
                                    <label className="aspect-square rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-[#DB4444] hover:bg-red-50 transition-all group">
                                        <Upload className="h-8 w-8 text-gray-400 group-hover:text-[#DB4444] mb-2 transition-colors" />
                                        <span className="text-xs font-medium text-gray-500 group-hover:text-[#DB4444] transition-colors">Upload</span>
                                        <input type="file" multiple onChange={handleImageChange} className="hidden" accept="image/*" />
                                    </label>
                                )}
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-100 flex justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-gradient-to-r from-[#DB4444] to-[#c93d3d] text-white px-12 py-4 rounded-lg font-bold hover:shadow-xl hover:scale-105 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-red-200 w-full md:w-auto"
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating Product...
                                    </div>
                                ) : (
                                    'Publish Product'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
