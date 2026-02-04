import { useState } from 'react';
import { Upload, X, Package, Trash2, CheckCircle } from 'lucide-react';
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
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-black p-6 text-white flex items-center gap-4">
                    <Package className="h-8 w-8 text-[#DB4444]" />
                    <div>
                        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                        <p className="text-gray-400 text-sm">Create and manage your products</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    {message && (
                        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-3">
                            <CheckCircle className="h-5 w-5" />
                            {message}
                        </div>
                    )}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Product Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:outline-none transition-all"
                                    placeholder="e.g. HAVIT HV-G92 Gamepad"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:outline-none transition-all"
                                    placeholder="e.g. Electronics"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Price ($)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:outline-none transition-all"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Stock</label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:outline-none transition-all"
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:outline-none transition-all resize-none"
                                    placeholder="Describe the product details..."
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Image Upload Area */}
                    <div>
                        <label className="block text-sm font-semibold mb-4">Product Images (Max 5)</label>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {previews.map((preview, index) => (
                                <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-100">
                                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-1 right-1 bg-white/80 p-1 rounded-full text-red-500 hover:bg-white transition-all shadow-sm"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                            {previews.length < 5 && (
                                <label className="aspect-square rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-black hover:bg-gray-50 transition-all group">
                                    <Upload className="h-8 w-8 text-gray-400 group-hover:text-black mb-2" />
                                    <span className="text-xs font-medium text-gray-500 group-hover:text-black">Upload</span>
                                    <input type="file" multiple onChange={handleImageChange} className="hidden" accept="image/*" />
                                </label>
                            )}
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-[#DB4444] text-white px-12 py-4 rounded-lg font-bold hover:bg-[#c93d3d] transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-red-100 w-full md:w-auto"
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
    );
};

export default AdminDashboard;
