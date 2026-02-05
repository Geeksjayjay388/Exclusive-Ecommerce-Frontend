import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const SignUp = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            console.log('Attempting to register with:', formData);
            await register(formData);
            navigate('/');
        } catch (err) {
            console.error('Registration error:', err);
            console.error('Error response:', err.response);
            setError(err.response?.data?.message || err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="flex flex-col lg:flex-row items-center gap-16">
                {/* Left - Side Image */}
                <div className="lg:w-7/12 rounded-r-lg overflow-hidden h-[780px] bg-[#CBE4E8] flex items-center justify-center -ml-4 sm:-ml-6 lg:-ml-8">
                    <img
                        src="/assets/auth-side.png"
                        alt="Join Exclusive"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right - Form Content */}
                <div className="lg:w-5/12 max-w-sm mx-auto space-y-12">
                    <div className="space-y-6">
                        <h1 className="text-4xl font-bold tracking-tight">Create an account</h1>
                        <p className="text-base font-medium">Enter your details below</p>
                    </div>

                    <form className="space-y-8" onSubmit={handleSubmit}>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <div className="space-y-10">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email or Phone Number"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors"
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors"
                            />
                        </div>

                        <div className="space-y-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#DB4444] text-white py-4 rounded font-medium hover:bg-[#c93d3d] transition-all active:scale-[0.98] disabled:opacity-70"
                            >
                                {loading ? 'Creating Account...' : 'Create Account'}
                            </button>
                            <button
                                type="button"
                                className="w-full border border-gray-300 py-4 rounded font-medium flex items-center justify-center gap-4 hover:bg-gray-50 transition-all active:scale-[0.98]"
                            >
                                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                                Sign up with Google
                            </button>
                        </div>
                    </form>

                    <div className="text-center">
                        <p className="text-gray-600">
                            Already have account?{' '}
                            <Link to="/login" className="text-black font-medium border-b border-gray-400 ml-2 hover:border-black transition-colors">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
