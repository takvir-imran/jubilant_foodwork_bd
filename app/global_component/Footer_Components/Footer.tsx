import Link from "next/link";
import FooterColumn from "@/app/global_component/Footer_Components/FooterColumn";
import Image from "next/image";
import {MapPin, Youtube, Facebook, Instagram, Linkedin, Twitter} from "lucide-react";
import Newsletter from "@/app/global_component/Footer_Components/Newsletter";


interface navButton{
    label: string;
    href: string;
}
interface NavColumn{
    header : string,
    columnItems: navButton[]
}

const aboutUs: NavColumn = {
    header : "About Us",
    columnItems: [
        {
            label: "Company Profile",
            href: "/about_us/company-profile/",
        },
        {
            label: "Ceo Message",
            href: "/about_us/ceo-message/",
        },
        {
            label: "Leadership",
            href: "/about_us/leadership",
        },
        {
            label: "Milestones",
            href: "/about_us/milestones",
        },
        {
            label: "Awards",
            href: "/about_us/awards",
        }
    ]
}
const brands: NavColumn = {
    header: "Brands",
    columnItems: [
        {
            label: "Domino's Pizza",
            href: "brands/dominos/"
        }
    ]
}
const sustainability: NavColumn = {
    header: "Sustainability",
    columnItems: [
        { label: "Sustainability Progress", href: "#sustainability-progress" },
        { label: "Sustainability Targets", href: "#sustainability-targets" },
        { label: "CSR Engagements", href: "#csr-engagements" },
    ],
};

const career: NavColumn = {
    header: "Career",
    columnItems: [
        { label: "Our Values", href: "#our-values" },
        { label: "Work with Us", href: "/careers" },
    ],
};

const contactUs: NavColumn = {
    header: "Contact Us",
    columnItems: [
        { label: "Contact Details", href: "#contact" },
    ],
};


export function Footer(){

    return  (
        <footer className="bg-gray-50 border-t border-gray-200">
            <Newsletter />
            <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    <FooterColumn {...aboutUs} />
                    <div>
                        <FooterColumn {...brands} />
                        <FooterColumn {...sustainability} />
                    </div>
                    <div>
                        <FooterColumn {...career} />
                        <FooterColumn {...contactUs} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Image src="/assets/Dominos_pizza_logo.png" alt="Dominos Pizza App" width={32} height={32} />
                            <div>
                                <p className="text-sm font-semibold text-gray-900">Domino&#39;s Pizza App</p>
                                <p className="text-gray-600 text-sm">
                                    <Link  href="https://play.google.com/store/apps/details?id=com.dominos.bd&pli=1">Android </Link>
                                   |
                                    <Link href="https://apps.apple.com/us/app/dominos-pizza-bangladesh/id6471245392"> iPhone </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t  border-gray-200 pt-6">
                    <div className="flex flex-col lg:flex-row justify-between lg:flex-col items-start lg:items-end gap-4">
                        <div className="flex-1">
                            <Image className="mb-2" src="/assets/jubl.png" alt="Jubl Logo" width={48} height={48} />
                            <div className="flex items-start gap-2 text-sm  text-gray-600">
                                <MapPin className="w-4 h-4 text-[#0056A3] flex-shrink-0 mt-0.5" />
                                <p>Paragon House, (Level 2), 5, Mohakhali, C/A, Dhaka 1212, Bangladesh.</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Link
                                href="https://www.facebook.com/dominospizzabn"
                                className="w-9 h-9 bg-gray-100 hover:bg-[#1877F2] text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-all"
                                aria-label="Facebook" target="_blank"
                            >
                                <Facebook className="w-4 h-4" />
                            </Link>
                            <a
                                href="https://www.instagram.com/dominos_bd/"
                                className="w-9 h-9 bg-gray-100 hover:bg-gradient-to-tr from-[#fdb045] via-[#fd1d1d] to-[#833ab4] text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-all"
                                aria-label="Instagram"
                                target="_blank"
                            >
                                <Instagram className="w-4 h-4" />
                            </a>
                            <Link
                                href="https://www.linkedin.com/company/dominospizzabangladesh/posts/?feedView=all"
                                className="w-9 h-9 bg-gray-100 hover:bg-[#0077B5] text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-all"
                                aria-label="LinkedIn"
                                target="_blank"
                            >
                                <Linkedin className="w-4 h-4" />
                            </Link>
                            <Link
                                href="https://www.youtube.com/@dominospizzabangladesh2453"
                                className="w-9 h-9 bg-gray-100 hover:bg-[#cc181e] text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-all"
                                aria-label="YouTube"
                                target="_blank"
                            >
                                <Youtube className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                </div>
                <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mt-6 pt-6 border-t border-gray-200">
                    <div className="text-xs text-gray-600 grid">
                        <span>Designed and Developed by </span>
                        <span className="text-sm font-bold">Jubilant foodworks Bangladesh </span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 text-xs">
                        <a href="#" className="text-gray-600 hover:text-[#0056A3] transition-colors">Privacy Policy</a>
                        <span className="text-gray-400">|</span>
                        <a href="#" className="text-gray-600 hover:text-[#0056A3] transition-colors">Disclaimer</a>
                        <span className="text-gray-400">|</span>
                        <a href="#" className="text-gray-600 hover:text-[#0056A3] transition-colors">Terms and Conditions</a>
                    </div>
                    <p className="text-xs text-gray-600">
                        © Jubilant Foodworks Bangladesh All Rights Reserved
                    </p>
                </div>
            </div>

        </footer>);
}