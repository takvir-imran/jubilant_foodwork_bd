import Header from "@/app/global_component/Header";
import {Footer} from "@/app/global_component/Footer_Components/Footer";
import HeroSection from "@/app/global_component/page_components/brands/dominos/HeroSection";
import StatSection from "@/app/global_component/page_components/brands/dominos/StatSection";
import AboutSection from "@/app/global_component/page_components/brands/dominos/AboutSection";
import WhyChooseUsSection from "@/app/global_component/page_components/brands/dominos/WhyChooseUsSection";
import {DominosTimeline} from "@/app/global_component/page_components/brands/dominos/DominosTimeline";
import {HeroPizza} from "@/app/global_component/page_components/brands/dominos/HeroPizza";
import PizzaProductCard from "@/app/global_component/PizzaCard";
import {MenuShowcase} from "@/app/global_component/page_components/brands/dominos/Menushowcase";



export default function DominosPage(){

    return (
        <>
            <Header />
            <main className="main">
                <section className="relative h-screen overflow-hidden">
                    <HeroSection />
                </section>
                <StatSection />
                <AboutSection />
                <WhyChooseUsSection />
                <DominosTimeline />
                <HeroPizza />
                <MenuShowcase />

            </main>
            <Footer />
        </>
    );
}