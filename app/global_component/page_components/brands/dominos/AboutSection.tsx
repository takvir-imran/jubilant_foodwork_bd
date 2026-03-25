import {ArrowRight} from "lucide-react";
import Image from "next/image";

export default function AboutSection() {
    return (
        <section className="py-14 md:py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

                    {/* Left column: brand photography */}
                    <div className="relative h-[500px] group overflow-hidden rounded-3xl shadow-2xl">
                        <Image
                            src="/assets/dominos/doePrepare.jpeg"
                            alt="Pizza Making"
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            fill
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0056A3]/30 to-transparent" />
                    </div>

                    {/* Right column: brand narrative */}
                    <div>
                        <div className="inline-block px-4 py-2 bg-blue-100 text-[#0056A3] rounded-full text-sm font-semibold mb-6">
                            About Domino&#39;s
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Crafting Excellence Since 1960
                        </h2>
                        <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                            Domino&#39;s Pizza operates in Bangladesh under{" "}
                            <span className="font-bold text-[#0056A3]">Jubilant FoodWorks</span>,
                            bringing world-class pizza delivery services to millions of
                            customers nationwide.
                        </p>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            We are committed to delivering exceptional quality, reliable
                            service, and a customer-first experience in every order. From
                            fresh ingredients to hot delivery, we ensure every pizza exceeds
                            expectations.
                        </p>
                        <button className="group inline-flex items-center gap-3 px-6 py-3 bg-[#0056A3] text-white rounded-full font-semibold hover:bg-[#00B0E6] transition-all hover:shadow-lg">
                            Learn More
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}