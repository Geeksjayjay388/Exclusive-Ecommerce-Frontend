import { Phone, Mail } from 'lucide-react';

const Contact = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            {/* Breadcrumb */}
            <nav className="mb-12 text-sm">
                <span className="text-gray-500">Home / </span>
                <span className="text-black font-medium">Contact</span>
            </nav>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Sidebar - Contact Info */}
                <div className="lg:w-1/3 p-10 bg-white border border-gray-100 rounded shadow-sm space-y-8">
                    <div className="space-y-6 pb-8 border-b border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-[#DB4444] rounded-full">
                                <Phone className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-base font-bold text-black">Call To Us</h3>
                        </div>
                        <div className="space-y-4 text-sm text-black">
                            <p>We are available 24/7, 7 days a week.</p>
                            <p>Phone: +8801611112222</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-[#DB4444] rounded-full">
                                <Mail className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-base font-bold text-black">Write To US</h3>
                        </div>
                        <div className="space-y-4 text-sm text-black">
                            <p>Fill out our form and we will contact you within 24 hours.</p>
                            <p>Emails: customer@exclusive.com</p>
                            <p>Emails: support@exclusive.com</p>
                        </div>
                    </div>
                </div>

                {/* Right Content - Contact Form */}
                <div className="lg:w-2/3 p-10 bg-white border border-gray-100 rounded shadow-sm">
                    <form className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input
                                type="text"
                                placeholder="Your Name *"
                                required
                                className="w-full bg-gray-100 border-none rounded py-3 px-4 text-sm focus:ring-1 focus:ring-[#DB4444]"
                            />
                            <input
                                type="email"
                                placeholder="Your Email *"
                                required
                                className="w-full bg-gray-100 border-none rounded py-3 px-4 text-sm focus:ring-1 focus:ring-[#DB4444]"
                            />
                            <input
                                type="tel"
                                placeholder="Your Phone *"
                                required
                                className="w-full bg-gray-100 border-none rounded py-3 px-4 text-sm focus:ring-1 focus:ring-[#DB4444]"
                            />
                        </div>
                        <div className="w-full">
                            <textarea
                                rows="10"
                                placeholder="Your Message"
                                className="w-full bg-gray-100 border-none rounded py-3 px-4 text-sm focus:ring-1 focus:ring-[#DB4444] resize-none"
                            ></textarea>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-[#DB4444] text-white px-12 py-4 rounded font-medium hover:bg-[#c93d3d] transition-all active:scale-95"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
