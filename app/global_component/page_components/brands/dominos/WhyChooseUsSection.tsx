import {Award, Clock, Shield} from "lucide-react";
import Image from "next/image";

export default function WhyChooseUsSection() {

    return (
        <section className="py-14 md:py-20 bg-white">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

                    {/* Left column: USP feature list (renders second on mobile) */}
                    <div className="order-2 md:order-1">
                        <div className="inline-block px-4 py-2 bg-cyan-100 text-[#00B0E6] rounded-full text-sm font-semibold mb-6">
                            Why Choose Us
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                            Quality You Can Taste
                        </h2>

                        {/* Feature list: icon + heading + description */}
                        <div className="space-y-6">

                            {/* USP 1: Premium Ingredients */}
                            <div className="flex gap-4 group cursor-pointer">
                                <div className="flex-shrink-0 w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-[#0056A3] transition-colors">
                                    <Award className="w-7 h-7 text-[#0056A3] group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#0056A3] transition-colors">
                                        Premium Ingredients
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Only the freshest, highest-quality ingredients in every pizza
                                    </p>
                                </div>
                            </div>

                            {/* USP 2: 30-Minute Guarantee */}
                            <div className="flex gap-4 group cursor-pointer">
                                <div className="flex-shrink-0 w-14 h-14 bg-cyan-50 rounded-xl flex items-center justify-center group-hover:bg-[#00B0E6] transition-colors">
                                    <Clock className="w-7 h-7 text-[#00B0E6] group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#00B0E6] transition-colors">
                                        30-Minute Guarantee
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Hot and fresh pizza delivered in 30 minutes or less
                                    </p>
                                </div>
                            </div>

                            {/* USP 3: Quality Assurance */}
                            <div className="flex gap-4 group cursor-pointer">
                                <div className="flex-shrink-0 w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center group-hover:bg-[#7CB342] transition-colors">
                                    <Shield className="w-7 h-7 text-[#7CB342] group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#7CB342] transition-colors">
                                        Quality Assurance
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Every pizza meets our rigorous quality standards
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right column: fresh ingredients photo (renders first on mobile) */}
                    <div className="order-1 md:order-2 relative h-[500px] group overflow-hidden rounded-3xl shadow-2xl">
                        <Image
                            src="/assets/dominos/pizzaMaking.jpeg"
                            alt="Fresh Ingredients"
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            fill
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#00B0E6]/30 to-transparent" />
                    </div>
                </div>
            </div>
        </section>
    );
}