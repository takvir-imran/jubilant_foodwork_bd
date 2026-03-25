"use client"
import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Search, User,  ChevronDown} from 'lucide-react';


interface DropdownItem{
    label: string;
    href: string;
}

interface NavItem{
    label: string;
    href?: string;
    dropdownItem?: DropdownItem[];
}

const navigationItems: NavItem[] = [
    {
        label: 'About Us',
        href: '#',
        dropdownItem: [
            {label: 'Company Profile', href: '#company-profile'},
            {label: 'CEO Message', href: '#ceo-message'},
            {label: 'Leadership', href: '#leadership'},
            {label: 'Milestones', href: '#milestones'},
            {label: 'Awards', href: '#awards'},
        ]
    },
    {
        label: 'Brands',
        href: '#',
        dropdownItem: [
            {label: 'Dominos', href: '/brands/dominos/'},
        ]
    },
    {
        label: 'Sustainability',
        href: '#',
        dropdownItem: [
            {label: 'Sustainability Progress', href: '#sustainabilityProgress',},
            {label: 'Sustainability Target', href: '#sustainabilityTarget',},
            {label: 'CSR Engagements', href: '#csr-engagements',},
        ]
    },
    {
        label: 'Career',
        href: '#',
        dropdownItem: [
            {label: 'Our Values', href: '#our-values',},
            {label: 'Work With Us', href: '#work-with-us'},
        ]
    },
    {
        label: 'Contact Us',
        href: '#',
    }
];

export default function Header() {
    const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
    const [isSearchOpen, setSearchOpen] = useState<boolean>(false);
    const [isActiveDropdown, setActiveDropdown] = useState<string | null>(null);
    const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);

    return (
        <header className="sticky top-0 left-0 right-0 bg-white shadow-md z-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-2.5">
                    <div className="flex items-center">
                        <Link href="/">
                            <Image src="/assets/jubl.png" alt="Jubilant Foodworks Bangladesh" width={50} height={50} />
                        </Link>

                    </div>
                    <nav className="hidden items-center lg:flex gap-1">
                        {/*Navigation Bar*/}
                        {navigationItems.map( items => (
                            <div key={items.label} className="relative group"
                                 onMouseEnter={() => setActiveDropdown(items.label)}
                                 onMouseLeave={() => setActiveDropdown(null)}>
                                <button className={`flex items-center gap-1 px-4 py-2 text-gray-700 transition-colors hover:text-[#0056A3] font-medium text-sm`}>
                                    {items.label}
                                </button>
                                {/*Dropdown*/}
                                {items.dropdownItem && isActiveDropdown === items.label && (
                                    <div className="absolute top-full left-0 mt-0 bg-white shadow-md rounded-lg py-2 min-w-[220px] hover:text-[#0056A3] border border-gray-100 animate-fadeIn z-50">
                                        {items.dropdownItem.map((dropdownItems => (
                                            <a key={dropdownItems.label} href={dropdownItems.href} className="block px-5 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#0056A3] transition-colors">{dropdownItems.label}</a>
                                            ))
                                        )
                                        }
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                    <div className="lg:flex hidden items-center gap-3">
                        <div className="relative">
                            {isSearchOpen ? (
                                <div className="gap-2 flex items-centre">
                                    <input type="text" placeholder="Search"
                                    className="px-4 py-1.5 border-2 border-[#0056A3] rounded-full focus: outline-none w-56 text-sm"
                                    autoFocus
                                    />
                                    <button onClick={() => setSearchOpen(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            ) : (
                                <button onClick={() => setSearchOpen(true)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <Search size={18} className="text-gray-700" />
                                </button>)}
                        </div>
                        <button className="flex items-center gap-2 rounded-full border-2 px-5 py-1.5 border-[#0056A3] text-[#0056A3] hover:bg-[#0056A3] hover:text-white transition-all font-medium text-sm">
                            <User size={16} />
                            Login
                        </button>
                    </div>
                    {/*Mobile Menu bar*/}
                    <button className="lg:hidden p-1.5 hover:bg-gray-100 rounded" onClick={()=> setMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
                        {isMenuOpen ? (<X size={24} />): (<Menu size={24} />)}
                    </button>
                </div>
                    {/*Mobile navigation bar*/}
                    {isMenuOpen && (
                        <nav className="lg:hidden pb-4 flex flex-col space-y-2 border-t border-gray-200 pt-3">
                            <div className="relative mb-2">
                                <input type="text" placeholder="Search"
                                       className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus: outline-none focus:border-[#056A3] text-sm"/>
                                <Search size={18} className="text-gray-400 absolute right-3 top-2.5" />
                            </div>
                            {navigationItems.map( items => (
                                <div key={items.label}>
                                    <button onClick={() => setActiveDropdown(items.label)} className="w-full flex items-center justify-between px-4 py-2.5 text-gray-700 hover:text-[#0056A3] hover:bg-gray-50 transition-colors font-medium text-sm rounded-lg">
                                        {items.label}
                                        <ChevronDown size={16} className={`transition-transform ${isActiveDropdown === items.label ? 'rotate-180' : ''}`} />
                                    </button>
                                    {/*Mobile Dropdown*/}
                                    {items.dropdownItem && isActiveDropdown === items.label && (
                                        <div className="pl-6 pr-4 py-2 space-y-1">
                                            {items.dropdownItem.map((dropdownItem) => (
                                                <Link className="block px-4 py-2 text-sm text-gray-600 hover:text-[#0056A3] hover:bg-blue-50 rounded-lg transition-colors" key={dropdownItem.label} href={dropdownItem.href}>{dropdownItem.label}</Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>
                    )}
            </div>
        </header>
    );
}

