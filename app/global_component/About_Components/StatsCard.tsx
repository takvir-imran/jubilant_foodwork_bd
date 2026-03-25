import {TrendingUp, Globe, Heart, Users} from "lucide-react";
import {motion as Motion} from "motion/react";

const stats = [
    {
        icon: TrendingUp,
        label: "Years in Bangladesh",
        value: "7",
        color: "from-[#0056A3] to-[#003d7a]",
        suffix: "+",
    },
    {
        icon: Users,
        label: "Customers Served",
        value: "1M",
        color: "from-[#00B0E6] to-[#0090c5]",
        suffix: "+",
    },
    {
        icon: Globe,
        label: "Store Locations",
        value: "40",
        color: "from-[#7CB342] to-[#558B2F]",
        suffix: "",
    },
    {
        icon: Heart,
        label: "Customer Satisfaction",
        value: "98",
        color: "from-[#FFB300] to-[#FF8F00]",
        suffix: "%",
    },
];

export default function StatsCard(){


    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-14 md:mb-20 ">
            {stats.map((stat, index) => (
                <Motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="group relative bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-shadow border border-gray-100 overflow-hidden"
                >
                    <div
                        className={`absolute inset-0 bg-linear-to-br ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                    />
                    <Motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`inline-flex items-center justify-center w-16 h-16 bg-linear-to-br ${stat.color} rounded-2xl mb-6 shadow-lg text-white`}
                    >
                        <stat.icon className="w-8 h-8" />
                    </Motion.div>
                    <div className="text-5xl md:text-6xl font-black text-gray-900 mb-2 tracking-tight">
                        {stat.value}
                        <span className="text-[#00B0E6] text-4xl md:text-5xl align-top">
                  {stat.suffix}
                </span>
                    </div>
                    <div className="text-sm md:text-base font-semibold text-gray-500 uppercase tracking-wider">
                        {stat.label}
                    </div>
                </Motion.div>
            ))}
        </div>
    );
}