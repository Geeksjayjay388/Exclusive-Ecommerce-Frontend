import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            console.log('Attempting to login with:', credentials);
            await login(credentials);
            navigate('/');
        } catch (err) {
            console.error('Login error:', err);
            console.error('Error response:', err.response);
            setError(err.response?.data?.message || err.message || 'Invalid email or password');
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
                        alt="Log in to Exclusive"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right - Form Content */}
                <div className="lg:w-5/12 max-w-sm mx-auto space-y-12">
                    <div className="space-y-6">
                        <h1 className="text-4xl font-bold tracking-tight">Log in to Exclusive</h1>
                        <p className="text-base font-medium">Enter your details below</p>
                    </div>

                    <form className="space-y-8" onSubmit={handleSubmit}>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <div className="space-y-10">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email or Phone Number"
                                required
                                value={credentials.email}
                                onChange={handleChange}
                                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors"
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                required
                                value={credentials.password}
                                onChange={handleChange}
                                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-[#DB4444] text-white px-12 py-4 rounded font-medium hover:bg-[#c93d3d] transition-all active:scale-[0.98] disabled:opacity-70"
                            >
                                {loading ? 'Logging In...' : 'Log In'}
                            </button>
                            <button
                                type="button"
                                className="text-[#DB4444] font-medium hover:underline transition-all"
                            >
                                Forget Password?
                            </button>
                        </div>
                    </form>

                    <div className="text-center">
                        <p className="text-gray-600">
                            Don't have account?{' '}
                            <Link to="/signup" className="text-black font-medium border-b border-gray-400 ml-2 hover:border-black transition-colors">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
