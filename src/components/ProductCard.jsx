import { Heart, Eye, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { name, currentPrice, originalPrice, discount, rating, reviews, image } = product;
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart({
            id: product.id || product._id,
            name,
            price: currentPrice,
            image
        });
    };

    return (
        <div className="group relative flex flex-col bg-white rounded-sm overflow-hidden border border-transparent hover:border-gray-100 transition-all duration-300">
            {/* Image Container */}
            <div className="relative aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                {/* Discount Badge */}
                {discount && (
                    <div className="absolute top-3 left-3 bg-[#DB4444] text-white text-xs font-medium px-3 py-1 rounded-sm z-10">
                        -{discount}%
                    </div>
                )}

                {/* Action Icons */}
                <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <button className="bg-white p-1.5 rounded-full hover:bg-gray-50 transition-colors shadow-sm">
                        <Heart className="h-5 w-5 text-black" />
                    </button>
                    <button className="bg-white p-1.5 rounded-full hover:bg-gray-50 transition-colors shadow-sm">
                        <Eye className="h-5 w-5 text-black" />
                    </button>
                </div>

                {/* Product Image */}
                <div className="w-full h-full flex items-center justify-center p-8 group-hover:scale-110 transition-transform duration-500">
                    {image ? (
                        <img src={image} alt={name} className="max-w-full max-h-full object-contain" />
                    ) : (
                        <div className="text-gray-300 text-xs text-center">No Image<br />Available</div>
                    )}
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={handleAddToCart}
                    className="absolute bottom-0 inset-x-0 bg-black text-white text-sm font-bold py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 active:bg-gray-900"
                >
                    Add To Cart
                </button>
            </div>

            {/* Details Container */}
            <div className="pt-4 flex flex-col space-y-2">
                <h3 className="text-base font-bold text-black truncate">{name}</h3>

                {/* Pricing */}
                <div className="flex items-center space-x-3">
                    <span className="text-[#DB4444] font-bold text-base">${currentPrice}</span>
                    {originalPrice && (
                        <span className="text-gray-500 line-through text-base">${originalPrice}</span>
                    )}
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                    <div className="flex items-center text-[#FFAD33]">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 fill-current ${i < Math.floor(rating) ? 'text-[#FFAD33]' : 'text-gray-300'}`} />
                        ))}
                    </div>
                    <span className="text-gray-500 text-sm font-semibold">({reviews})</span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
