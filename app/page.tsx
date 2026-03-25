import Header from "@/app/global_component/Header";
import Hero from "@/app/global_component/Hero";
import {Footer} from "@/app/global_component/Footer_Components/Footer";
import {Announcements} from "@/app/global_component/Announcement_component/Anncouncement";

import {Brands} from "@/app/global_component/Brands/Brands";
import AwardsSlider from "@/app/global_component/Awards/AwardSlider";
import {About} from "@/app/global_component/About_Components/About";



export default function Home() {
  return (
    <div >
          <Header/>
          <main className="mt-4 lg:mt-0">
              <Hero />
              <Announcements />
              <About />
              <Brands />
              <AwardsSlider />
          </main>
        <Footer/>
    </div>
  );
}
