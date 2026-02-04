import { useState, useEffect } from 'react';
import {
    ChevronRight, Apple, ArrowLeft, ArrowRight,
    Smartphone, Monitor, Watch, Camera, Headphones, Gamepad,
    Loader2, ShoppingBag
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import api from '../utils/api';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const categories = [
        "Woman's Fashion", "Men's Fashion", "Electronics", "Home & Lifestyle",
        "Medicine", "Sports & Outdoor", "Baby's & Toys", "Groceries & Pets", "Health & Beauty",
    ];

    const browseCategories = [
        { name: "Phones", icon: Smartphone },
        { name: "Computers", icon: Monitor },
        { name: "SmartWatch", icon: Watch },
        { name: "Camera", icon: Camera },
        { name: "HeadPhones", icon: Headphones },
        { name: "Gaming", icon: Gamepad },
    ];

    const [timeLeft, setTimeLeft] = useState({ days: '03', hours: '23', minutes: '19', seconds: '56' });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/api/products');
                setProducts(data.data);
            } catch (err) {
                console.error('Error fetching products:', err);
            } finally {
                setLoadingProducts(false);
            }
        };
        fetchProducts();

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let s = parseInt(prev.seconds) - 1;
                let m = parseInt(prev.minutes);
                let h = parseInt(prev.hours);
                let d = parseInt(prev.days);
                if (s < 0) { s = 59; m -= 1; }
                if (m < 0) { m = 59; h -= 1; }
                if (h < 0) { h = 23; d -= 1; }
                if (d < 0) return prev;
                return {
                    days: String(d).padStart(2, '0'),
                    hours: String(h).padStart(2, '0'),
                    minutes: String(m).padStart(2, '0'),
                    seconds: String(s).padStart(2, '0')
                };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatProduct = (p) => ({
        id: p._id,
        name: p.name,
        currentPrice: p.price,
        originalPrice: p.price + 50, // UI polish
        discount: 25,
        rating: 4.5,
        reviews: 10,
        image: p.images?.[0]?.url || ""
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <section className="flex flex-col md:flex-row gap-8 pt-10">
                <div className="hidden md:block w-1/4 border-r border-gray-200 pr-8">
                    <ul className="space-y-4 pt-10">
                        {categories.map((category, index) => (
                            <li key={index} className="flex items-center justify-between group cursor-pointer hover:text-gray-600 transition-colors">
                                <span className="text-base font-medium text-black group-hover:underline">{category}</span>
                                {(category === "Woman's Fashion" || category === "Men's Fashion") && (
                                    <ChevronRight className="h-4 w-4 text-black group-hover:translate-x-1 transition-transform" />
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="w-full md:w-3/4 relative overflow-hidden rounded-lg bg-black aspect-[16/8] flex items-center mt-10 shadow-2xl">
                    <div className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-overlay"
                        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200')` }}
                    ></div>
                    <div className="relative z-10 px-8 md:px-16 w-full lg:w-2/3">
                        <div className="flex items-center space-x-4 mb-4">
                            <Apple className="h-10 w-10 text-white fill-current" />
                            <span className="text-white text-base font-medium">iPhone 14 Series</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Up to 10% <br /> off Voucher</h2>
                        <Link to="/shop" className="inline-flex items-center text-white border-b-2 border-white pb-1 font-bold hover:text-[#DB4444] hover:border-[#DB4444] group transition-all">
                            Shop Now <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="mt-24 border-b border-gray-100 pb-16">
                <div className="flex items-center space-x-4 mb-6">
                    <div className="w-5 h-10 bg-[#DB4444] rounded-sm"></div>
                    <span className="text-[#DB4444] font-bold">Our Products</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-black">Explore Our Products</h2>
                    <div className="flex space-x-2">
                        <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors shadow-sm"><ArrowLeft className="h-5 w-5 text-black" /></button>
                        <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors shadow-sm"><ArrowRight className="h-5 w-5 text-black" /></button>
                    </div>
                </div>

                {loadingProducts ? (
                    <div className="flex flex-col items-center justify-center py-20 italic text-gray-400">
                        <Loader2 className="h-8 w-8 animate-spin mb-4 text-[#DB4444]" />
                        Loading products from database...
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={formatProduct(product)} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                        <ShoppingBag className="h-12 w-12 text-gray-300 mb-4" />
                        <h3 className="text-xl font-bold text-gray-400">No products found</h3>
                        <p className="text-gray-500 mt-2">Start adding products from the Admin Dashboard!</p>
                    </div>
                )}

                {/* Promotional Music Banner Section */}
                <section className="mt-24 px-8 md:px-14 py-16 bg-black rounded-lg flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden relative shadow-2xl">
                    {/* Background Glow */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#4285F4] opacity-20 blur-[120px] rounded-full"></div>

                    {/* Left Content */}
                    <div className="relative z-10 flex flex-col space-y-8 w-full lg:w-1/2">
                        <span className="text-[#00FF66] font-bold text-base">Categories</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                            Enhance Your <br /> Music Experience
                        </h2>

                        <div className="flex items-center space-x-4 md:space-x-6">
                            {['Days', 'Hours', 'Minutes', 'Seconds'].map((unit) => (
                                <div key={unit} className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex flex-col items-center justify-center text-black shadow-lg">
                                    <span className="text-sm md:text-base font-bold leading-none">{timeLeft[unit.toLowerCase()]}</span>
                                    <span className="text-[10px] md:text-xs font-semibold">{unit}</span>
                                </div>
                            ))}
                        </div>

                        <button className="bg-[#00FF66] text-white px-12 py-4 rounded-sm font-bold w-fit hover:bg-[#00e65c] transition-all active:scale-95 shadow-lg shadow-green-900/40">
                            Buy Now!
                        </button>
                    </div>

                    <div className="relative z-10 w-full lg:w-1/2 flex justify-center lg:justify-end">
                        <img
                            src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800"
                            alt="Promo Speaker"
                            className="max-w-full h-auto object-contain scale-110 drop-shadow-[0_0_50px_rgba(0,255,102,0.2)] hover:scale-125 transition-transform duration-700"
                        />
                    </div>
                </section>
            </section>
        </div>
    );
};

export default Home;
