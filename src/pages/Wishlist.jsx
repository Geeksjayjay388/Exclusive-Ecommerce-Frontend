import ProductCard from '../components/ProductCard';

const Wishlist = () => {
    const wishlistProducts = [
        { id: 9, name: "Gucci duffle bag", currentPrice: 960, originalPrice: 1160, discount: 35, rating: 4.5, reviews: 65, image: "" },
        { id: 10, name: "RGB liquid CPU Cooler", currentPrice: 160, originalPrice: 170, rating: 4.5, reviews: 65, image: "" },
        { id: 11, name: "GP11 Gamepad", currentPrice: 660, originalPrice: null, rating: 4.5, reviews: 65, image: "" },
        { id: 12, name: "Quilted Satin Jacket", currentPrice: 660, originalPrice: null, rating: 4.5, reviews: 65, image: "" },
    ];

    const recommendedProducts = [
        { id: 13, name: "ASUS FHD Gaming Monitor", currentPrice: 960, originalPrice: 1160, discount: 35, rating: 5, reviews: 65, image: "" },
        { id: 14, name: "IPS LCD Gaming Monitor", currentPrice: 1160, originalPrice: null, rating: 5, reviews: 65, image: "" },
        { id: 15, name: "HAVIT HV-G92 Gamepad", currentPrice: 560, originalPrice: null, rating: 5, reviews: 65, image: "" },
        { id: 16, name: "AK-900 Wired Keyboard", currentPrice: 200, originalPrice: null, rating: 5, reviews: 65, image: "" },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
            {/* Wishlist Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <h1 className="text-xl font-medium">Wishlist ({wishlistProducts.length})</h1>
                <button className="border border-gray-300 px-12 py-4 rounded font-medium hover:bg-gray-50 transition-all active:scale-95">
                    Move All To Bag
                </button>
            </div>

            {/* Wishlist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {wishlistProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* Just For You Section */}
            <div className="space-y-10">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-5 h-10 bg-[#DB4444] rounded-sm"></div>
                        <h2 className="text-xl font-medium">Just For You</h2>
                    </div>
                    <button className="border border-gray-300 px-12 py-4 rounded font-medium hover:bg-gray-50 transition-all active:scale-95">
                        See All
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {recommendedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
