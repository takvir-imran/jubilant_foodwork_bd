'use client'

import {Pizza, Store, TrendingUp, Users} from "lucide-react";

export default function StatSection(){

    return (
        <section className="py-14 bg-white border-b">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">

                    {/* Stat: Total stores */}
                    <div className="text-center group cursor-pointer">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl mb-4 group-hover:bg-[#0056A3] transition-colors">
                            <Store className="w-8 h-8 text-[#0056A3] group-hover:text-white transition-colors" />
                        </div>
                        <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">40+</div>
                        <div className="text-gray-600 font-medium">Stores</div>
                    </div>

                    {/* Stat: Happy customers */}
                    <div className="text-center group cursor-pointer">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-50 rounded-2xl mb-4 group-hover:bg-[#00B0E6] transition-colors">
                            <Users className="w-8 h-8 text-[#00B0E6] group-hover:text-white transition-colors" />
                        </div>
                        <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">1M+</div>
                        <div className="text-gray-600 font-medium">Happy Customers</div>
                    </div>

                    {/* Stat: Pizzas delivered */}
                    <div className="text-center group cursor-pointer">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-2xl mb-4 group-hover:bg-[#7CB342] transition-colors">
                            <Pizza className="w-8 h-8 text-[#7CB342] group-hover:text-white transition-colors" />
                        </div>
                        <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">10M+</div>
                        <div className="text-gray-600 font-medium">Pizzas Delivered</div>
                    </div>

                    {/* Stat: Years in Bangladesh */}
                    <div className="text-center group cursor-pointer">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-50 rounded-2xl mb-4 group-hover:bg-[#FFB300] transition-colors">
                            <TrendingUp className="w-8 h-8 text-[#FFB300] group-hover:text-white transition-colors" />
                        </div>
                        <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">7+</div>
                        <div className="text-gray-600 font-medium">Years in BD</div>
                    </div>
                </div>
            </div>
        </section>
    );
}