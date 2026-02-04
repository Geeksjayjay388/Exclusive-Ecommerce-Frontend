import { Store, DollarSign, ShoppingBag, Briefcase, Linkedin, Twitter, Instagram } from 'lucide-react';

const About = () => {
    const stats = [
        { icon: Store, value: '10.5k', label: 'Sellers active our site', active: false },
        { icon: DollarSign, value: '33k', label: 'Monthly Produdct Sale', active: true },
        { icon: ShoppingBag, value: '45.5k', label: 'Customer active in our site', active: false },
        { icon: Briefcase, value: '25k', label: 'Anual gross sale in our site', active: false },
    ];

    const team = [
        { name: 'Tom Cruise', role: 'Founder & Chairman', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400' },
        { name: 'Emma Watson', role: 'Managing Director', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400' },
        { name: 'Will Smith', role: 'Product Designer', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            {/* Breadcrumb */}
            <nav className="mb-12 text-sm">
                <span className="text-gray-500">Home / </span>
                <span className="text-black font-medium">About</span>
            </nav>

            {/* Our Story */}
            <section className="flex flex-col lg:flex-row items-center gap-16 mb-32">
                <div className="lg:w-1/2 space-y-8">
                    <h1 className="text-5xl font-bold tracking-tight">Our Story</h1>
                    <div className="space-y-6 text-base leading-relaxed">
                        <p>
                            Launced in 2015, Exclusive is South Asia’s premier online shopping maketplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region.
                        </p>
                        <p>
                            Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.
                        </p>
                    </div>
                </div>
                <div className="lg:w-1/2 rounded-lg overflow-hidden h-[600px] w-full bg-pink-100 flex items-center justify-center">
                    <img
                        src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&q=80&w=1000"
                        alt="Shopping Experience"
                        className="w-full h-full object-cover grayscale"
                    />
                </div>
            </section>

            {/* Stats */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className={`p-10 border rounded flex flex-col items-center justify-center space-y-4 hover:bg-[#DB4444] hover:text-white transition-all group cursor-default ${stat.active ? 'bg-[#DB4444] text-white border-[#DB4444]' : 'bg-white text-black border-gray-200'}`}
                    >
                        <div className={`p-2 rounded-full ring-8 transition-all ${stat.active ? 'bg-white ring-white/30 text-black' : 'bg-black ring-gray-200 group-hover:bg-white group-hover:ring-white/30 group-hover:text-black text-white'}`}>
                            <stat.icon className="h-8 w-8" />
                        </div>
                        <span className="text-3xl font-bold">{stat.value}</span>
                        <span className="text-base text-center">{stat.label}</span>
                    </div>
                ))}
            </section>

            {/* Team */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                {team.map((member, index) => (
                    <div key={index} className="space-y-6">
                        <div className="bg-gray-100 h-[430px] rounded p-12 pb-0 flex items-end justify-center overflow-hidden">
                            <img src={member.image} alt={member.name} className="h-full w-full object-cover rounded-t" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-3xl font-bold">{member.name}</h3>
                            <p className="text-base text-gray-600">{member.role}</p>
                            <div className="flex gap-4 pt-2">
                                <Twitter className="h-5 w-5 cursor-pointer hover:text-[#DB4444] transition-colors" />
                                <Instagram className="h-5 w-5 cursor-pointer hover:text-[#DB4444] transition-colors" />
                                <Linkedin className="h-5 w-5 cursor-pointer hover:text-[#DB4444] transition-colors" />
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* Features Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-12 py-20 border-t border-gray-100">
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-2 bg-black rounded-full ring-8 ring-gray-200">
                        <ShoppingBag className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold">FREE AND FAST DELIVERY</h4>
                    <p className="text-sm text-gray-500">Free delivery for all orders over $140</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-2 bg-black rounded-full ring-8 ring-gray-200">
                        <Headphones className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold">24/7 CUSTOMER SERVICE</h4>
                    <p className="text-sm text-gray-500">Friendly 24/7 customer support</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-2 bg-black rounded-full ring-8 ring-gray-200">
                        <Monitor className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold">MONEY BACK GUARANTEE</h4>
                    <p className="text-sm text-gray-500">We return money within 30 days</p>
                </div>
            </section>
        </div>
    );
};

// Mock Icons for reuse
const Headphones = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
);

const Monitor = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10c0-2.136-.56-4.13-1.552-5.859z" />
    </svg>
);

export default About;
