import {motion as Motion} from "motion/react";
import {Sparkles} from "lucide-react";


type HeadingTag = {
    tag: string;
}


export function HeadingTag({tag}: HeadingTag) {
    return (
        <>
            <Motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-5 py-2 bg-linear-to-r from-[#0056A3]/10 to-[#00B0E6]/10 border border-[#00B0E6]/20 rounded-full mb-6"
            >
                <Sparkles className="w-4 h-4 text-[#0056A3]" />
                <span className="text-sm font-semibold text-[#0056A3] tracking-wide uppercase">
                            {tag}
                        </span>
            </Motion.div>
        </>
    );
}