import { ChevronUp, ChevronDown, X, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

    const shipping = "Free";
    const total = cartTotal;

    if (cartItems.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col items-center justify-center text-center space-y-6">
                <div className="p-6 bg-gray-100 rounded-full">
                    <ShoppingBag className="h-16 w-16 text-gray-400" />
                </div>
                <h2 className="text-3xl font-bold">Your Cart is Empty</h2>
                <p className="text-gray-500 max-w-md">Looks like you haven't added anything to your cart yet. Go back to shop and find something you love!</p>
                <Link
                    to="/"
                    className="bg-[#DB4444] text-white px-12 py-4 rounded font-bold hover:bg-[#c93d3d] transition-all active:scale-95 shadow-lg shadow-red-100"
                >
                    Return To Shop
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            {/* Breadcrumb */}
            <nav className="mb-20 text-sm">
                <span className="text-gray-500">Home / </span>
                <span className="text-black font-medium">Cart</span>
            </nav>

            <div className="space-y-10">
                {/* Table Header */}
                <div className="hidden lg:grid grid-cols-4 p-6 bg-white border border-gray-100 rounded shadow-sm text-base font-medium">
                    <span>Product</span>
                    <span className="text-center">Price</span>
                    <span className="text-center">Quantity</span>
                    <span className="text-right">Subtotal</span>
                </div>

                {/* Cart Items */}
                <div className="space-y-8">
                    {cartItems.map((item) => (
                        <div key={item.id} className="relative group grid grid-cols-1 lg:grid-cols-4 items-center gap-6 p-6 bg-white border border-gray-100 rounded shadow-sm">
                            {/* Product Info */}
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="absolute -top-2 -left-2 bg-[#DB4444] text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                                <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center overflow-hidden p-2">
                                    {item.image ? (
                                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                    ) : (
                                        <div className="w-full h-full bg-black/10 rounded"></div>
                                    )}
                                </div>
                                <span className="text-base font-medium">{item.name}</span>
                            </div>

                            {/* Price */}
                            <div className="flex justify-between lg:justify-center items-center">
                                <span className="lg:hidden text-gray-500">Price:</span>
                                <span className="text-base font-bold">${item.price}</span>
                            </div>

                            {/* Quantity */}
                            <div className="flex justify-between lg:justify-center items-center">
                                <span className="lg:hidden text-gray-500">Quantity:</span>
                                <div className="flex items-center gap-4 border border-gray-300 rounded px-3 py-1.5 w-fit bg-white">
                                    <span className="text-base w-6 text-center font-bold">{item.quantity}</span>
                                    <div className="flex flex-col border-l border-gray-200 pl-2 ml-2">
                                        <ChevronUp
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="h-4 w-4 cursor-pointer hover:text-[#DB4444] transition-colors"
                                        />
                                        <ChevronDown
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="h-4 w-4 cursor-pointer hover:text-[#DB4444] transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Subtotal */}
                            <div className="flex justify-between lg:justify-end items-center">
                                <span className="lg:hidden text-gray-500">Subtotal:</span>
                                <span className="text-base font-bold text-[#DB4444]">${item.price * item.quantity}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <Link
                        to="/"
                        className="w-full sm:w-fit border-2 border-gray-200 px-12 py-4 rounded font-bold hover:bg-black hover:text-white hover:border-black transition-all active:scale-95 text-center"
                    >
                        Return To Shop
                    </Link>
                    <button
                        className="w-full sm:w-fit border-2 border-gray-200 px-12 py-4 rounded font-bold hover:bg-black hover:text-white hover:border-black transition-all active:scale-95"
                        onClick={() => window.location.reload()}
                    >
                        Update Cart
                    </button>
                </div>

                {/* Coupon & Total */}
                <div className="flex flex-col lg:flex-row items-start justify-between gap-12 pt-10">
                    <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-fit">
                        <input
                            type="text"
                            placeholder="Coupon Code"
                            className="w-full sm:w-72 border border-gray-300 rounded py-4 px-6 focus:outline-none focus:border-black transition-all"
                        />
                        <button className="bg-[#DB4444] text-white px-12 py-4 rounded font-bold hover:bg-[#c93d3d] transition-all whitespace-nowrap active:scale-95">
                            Apply Coupon
                        </button>
                    </div>

                    <div className="w-full lg:w-[470px] border-2 border-black rounded-lg p-8 space-y-6 bg-white shadow-xl shadow-gray-100">
                        <h3 className="text-xl font-bold">Cart Total</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between border-b border-gray-200 pb-4">
                                <span className="text-base">Subtotal:</span>
                                <span className="text-base font-bold">${cartTotal}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-4">
                                <span className="text-base">Shipping:</span>
                                <span className="text-base font-bold text-green-600">{shipping}</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold">
                                <span className="">Total:</span>
                                <span className="text-[#DB4444]">${total}</span>
                            </div>
                        </div>
                        <button className="w-full bg-[#DB4444] text-white py-5 rounded font-bold hover:bg-[#c93d3d] transition-all active:scale-95 shadow-lg shadow-red-100">
                            Process to checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
