import { Star, Heart, Truck, RefreshCw, Minus, Plus } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {
    const product = {
        name: "Havic HV G-92 Gamepad",
        price: 192,
        rating: 4,
        reviews: 150,
        stock: "In Stock",
        description: "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & no residue removal. Ghost shell design.",
        colors: ["#A0BCE0", "#E07575"],
        sizes: ["XS", "S", "M", "L", "XL"],
    };

    const relatedProducts = [
        { id: 19, name: "HAVIT HV-G92 Gamepad", currentPrice: 120, originalPrice: 160, discount: 40, rating: 5, reviews: 88, image: "" },
        { id: 20, name: "AK-900 Wired Keyboard", currentPrice: 960, originalPrice: 1160, discount: 35, rating: 4, reviews: 75, image: "" },
        { id: 21, name: "IPS LCD Gaming Monitor", currentPrice: 370, originalPrice: 400, discount: 30, rating: 5, reviews: 99, image: "" },
        { id: 22, name: "RGB liquid CPU Cooler", currentPrice: 160, originalPrice: 170, rating: 4.5, reviews: 65, image: "" },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            {/* Breadcrumb */}
            <nav className="mb-20 text-sm">
                <span className="text-gray-500">Account / Gaming / </span>
                <span className="text-black font-medium">{product.name}</span>
            </nav>

            <div className="flex flex-col lg:flex-row gap-16 mb-20">
                {/* Product Images */}
                <div className="lg:w-7/12 flex flex-col md:flex-row gap-8">
                    <div className="flex flex-row md:flex-col gap-4 order-2 md:order-1">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded p-4 cursor-pointer hover:ring-1 hover:ring-black transition-all">
                                <div className="w-full h-full bg-black/5 rounded"></div>
                            </div>
                        ))}
                    </div>
                    <div className="flex-grow bg-gray-100 rounded p-12 flex items-center justify-center order-1 md:order-2 aspect-square md:aspect-auto h-full">
                        <div className="w-full h-full bg-black/5 rounded"></div>
                    </div>
                </div>

                {/* Product Info */}
                <div className="lg:w-5/12 space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-2xl font-bold tracking-tight">{product.name}</h1>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`h-4 w-4 ${i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                                ))}
                                <span className="text-sm text-gray-400 ml-2">({product.reviews} Reviews)</span>
                            </div>
                            <span className="text-gray-300">|</span>
                            <span className="text-[#00FF66] text-sm">{product.stock}</span>
                        </div>
                        <p className="text-2xl font-medium">${product.price.toFixed(2)}</p>
                        <p className="text-sm leading-6 border-b border-gray-200 pb-8">{product.description}</p>
                    </div>

                    <div className="space-y-6">
                        {/* Colors */}
                        <div className="flex items-center gap-6">
                            <span className="text-xl font-medium">Colours:</span>
                            <div className="flex gap-2">
                                {product.colors.map((color, i) => (
                                    <div key={i} style={{ backgroundColor: color }} className={`w-5 h-5 rounded-full cursor-pointer ring-offset-2 hover:ring-1 hover:ring-black transition-all ${i === 0 ? 'ring-1 ring-black' : ''}`}></div>
                                ))}
                            </div>
                        </div>

                        {/* Sizes */}
                        <div className="flex items-center gap-6">
                            <span className="text-xl font-medium">Size:</span>
                            <div className="flex gap-4">
                                {product.sizes.map((size) => (
                                    <button key={size} className={`w-8 h-8 rounded border text-sm font-medium transition-all hover:bg-[#DB4444] hover:text-white hover:border-[#DB4444] ${size === 'M' ? 'bg-[#DB4444] text-white border-[#DB4444]' : 'border-gray-400'}`}>
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center border border-gray-400 rounded overflow-hidden">
                                <button className="p-3 hover:bg-gray-100 transition-colors border-r border-gray-400"><Minus className="h-5 w-5" /></button>
                                <span className="w-12 text-center font-bold">2</span>
                                <button className="p-3 bg-[#DB4444] text-white hover:bg-[#c93d3d] transition-colors"><Plus className="h-5 w-5" /></button>
                            </div>
                            <button className="flex-grow bg-[#DB4444] text-white py-3 rounded font-medium hover:bg-[#c93d3d] transition-all">Buy Now</button>
                            <button className="p-3 border border-gray-400 rounded hover:bg-gray-50 transition-all"><Heart className="h-5 w-5" /></button>
                        </div>
                    </div>

                    {/* Delivery Info */}
                    <div className="border border-gray-300 rounded divide-y divide-gray-300">
                        <div className="p-6 flex items-start gap-4">
                            <Truck className="h-10 w-10 mt-1" />
                            <div className="space-y-2">
                                <h4 className="font-bold">Free Delivery</h4>
                                <p className="text-xs font-medium underline cursor-pointer">Enter your postal code for Delivery Availability</p>
                            </div>
                        </div>
                        <div className="p-6 flex items-start gap-4">
                            <RefreshCw className="h-10 w-10 mt-1" />
                            <div className="space-y-2">
                                <h4 className="font-bold">Return Delivery</h4>
                                <p className="text-xs font-medium">Free 30 Days Delivery Returns. <span className="underline cursor-pointer">Details</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Items Section */}
            <div className="space-y-10 pt-20 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                    <div className="w-5 h-10 bg-[#DB4444] rounded-sm"></div>
                    <h2 className="text-xl font-medium text-[#DB4444]">Related Item</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {relatedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
