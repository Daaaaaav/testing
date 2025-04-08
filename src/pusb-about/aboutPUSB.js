import React, { useEffect, useState } from "react";
import { GetPUSBProfile } from "@/utils/aboutProfileAPI";
import ContainerAccordion from "@/components/Accordion/ContainerAccordion";
import CardLogoContainer from "@/components/CardLogoContainer";
import { MissionPUSB } from "@/src/lib/data";

const PUSBPage = () => {
  const [profilePUSB, setProfilePUSB] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await GetPUSBProfile();
      setProfilePUSB(data);
    };

    fetchProfile();
  }, []);

  if (!profilePUSB) return <p>Loading...</p>; 

  return (
    <main className="w-full min-h-screen">
      {/* HERO SECTION */}
      <section className="w-full h-[86vh] bg-gray-900 flex flex-col justify-center items-center gap-4">
        <div className="w-full flex justify-center items-center gap-4">
          <img src="./assets/pusblogo.png" alt="PUSB Logo" className="w-44 lg:w-56" />
          <img src={profilePUSB.cabinet_logo} alt="PUSB Cabinet Logo" className="w-[12rem] lg:w-[20rem]" />
        </div>

        <div className="text-center px-4">
          <h2 className="text-2xl lg:text-4xl font-bold">President University Student Board 2025</h2>
          <h2 className="text-2xl lg:text-4xl font-semibold">{profilePUSB.cabinet_name}</h2>
        </div>
      </section>

      {/* VISION SECTION */}
      <section className="w-full flex flex-col lg:flex-row justify-between items-center py-8 px-8 lg:px-16">
        <div className="w-full font-black lg:px-0 lg:pb-0">
          <h2 className="text-3xl lg:text-4xl">Vision</h2>
          <h1 className="text-3xl lg:text-5xl">PUSB 2025</h1>
          <h3 className="text-3xl lg:text-5xl">Sanctus Cabinet</h3>
        </div>
        <div className="w-full bg-[#343434] p-2 lg:p-8 flex justify-center items-center rounded-lg mt-4">
          <p className="text-lg text-white font-sans font-medium">{profilePUSB.vision}</p>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="w-full flex flex-col lg:flex-row-reverse justify-center items-center py-8 px-8 lg:px-16 bg-gray-900">
        <div className="w-full text-center font-black pb-4 lg:pb-0">
          <h2 className="text-3xl lg:text-4xl">Mission</h2>
          <h1 className="text-3xl lg:text-5xl">PUSB 2025</h1>
          <h3 className="text-3xl lg:text-5xl">Sanctus Cabinet</h3>
        </div>
        <ContainerAccordion missions={MissionPUSB} />
      </section>

      {/* LOGO SECTION */}
      <section className="w-full min-h-[90vh] flex flex-col justify-center items-center px-8 lg:px-16 mt-8 mb-12">
        <CardLogoContainer />
      </section>
    </main>
  );
};

export default PUSBPage;
