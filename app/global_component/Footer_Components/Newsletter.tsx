'use client'
import {useState} from "react";
import {ArrowRight} from "lucide-react";

export default function Newsletter() {

    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState('');
    const [isSubscribing, setIsSubscribing] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes('@')) {
            alert('Please enter a valid email address');
            return;
        }

        setIsSubscribing(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubscribing(false);
            // Trigger the coupon modal
            window.dispatchEvent(new CustomEvent('showCouponModal', { detail: { email } }));
            setEmail('');
        }, 1000);
    };
    return (
        <>
        <div className="bg-[#0056A3] py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="text-white">
                        <h3 className="text-2xl font-bold mb-2">Subscribe to our Newsletter</h3>
                        <p className="text-white/80">Get the latest news, updates and coupons from Jubilant FoodWorks.</p>
                    </div>
                    <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isSubscribing}
                            className="bg-white px-6 py-3 rounded-full w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-[#00B0E6] disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        <button
                            type="submit"
                            disabled={isSubscribing}
                            className="px-8 py-3 bg-[#FFB300] text-gray-900 font-semibold rounded-full hover:bg-[#ffc133] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubscribing ? 'Subscribing...' : 'Subscribe'} <ArrowRight size={18} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}