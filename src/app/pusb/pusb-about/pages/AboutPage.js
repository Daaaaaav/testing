import React, { useEffect, useState } from "react";
import { GetPUSBProfile } from "../utils/aboutProfileAPI";
import ContainerAccordion from "../_components/Accordion/ContainerAccordion";
import CardLogoContainer from "../_components/CardLogoContainer";
import { MissionPUSB } from "../../../../lib/data";
import pusblogo from "../../../../assets/pusblogo2.png";
import sanctusLogo from "../../../../assets/sanctusLogo.png";

const fallbackProfile = {
  cabinet_logo: sanctusLogo,
  cabinet_name: "Sanctus Cabinet",
  vision: "PUSB (President University Student Board) cultivates a vibrant and inclusive student organization at President University, providing a sanctuary where every PresUnivers feels safe, respected, and empowered to thrive, grow, and make a positive impact. Through both on-campus and off-campus collaborations, we collectively aim to inspire and support PresUnivers in becoming influential leaders, dedicated to the betterment of Indonesia.",
};

const fallbackMissions = [
  "Sanctuary: Foster a safe, supportive environment at PresUnivers where every member feels protected, respected, and empowered to express themselves and explore their potential.",
  "Support: Develop programs and activities that nurture the holistic development of PresUnivers, ensuring every student receives the guidance and support needed to achieve their goals and aspirations.",
  "Impact: Empower PresUnivers to contribute positively to President University and the broader community by fostering responsibility, leadership, and engagement in impactful initiatives.",
];

const PUSBPage = () => {
  const [profilePUSB, setProfilePUSB] = useState(fallbackProfile);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await GetPUSBProfile();

        console.log("API Response:", data);
        setProfilePUSB({
          ...fallbackProfile,
          ...(data || {}),
        });
      } catch (err) {
        console.error("Failed to fetch profile:", err.message);
        setError(err.message);
        setProfilePUSB(fallbackProfile);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <main className="w-full min-h-screen">
      {/* HERO SECTION */}
      <section className="w-full h-[86vh] bg-gray-900 flex flex-col justify-center items-center gap-4">
        <div className="w-full flex justify-center items-center gap-4">
          <img src={pusblogo} alt="PUSB Logo" className="w-56 lg:w-56" />
          {profilePUSB.cabinet_logo && (
            <img
              src={profilePUSB.cabinet_logo}
              alt="PUSB Cabinet Logo"
              className="w-80 lg:w-80"
            />
          )}
        </div>

        <div className="text-center px-4">
          <h2 className="text-2xl lg:text-4xl font-bold">
            President University Student Board 2025
          </h2>
          <h2 className="text-2xl lg:text-4xl font-semibold">
            {profilePUSB.cabinet_name}
          </h2>
        </div>
      </section>

      {/* VISION SECTION */}
      <section className="w-full flex flex-col lg:flex-row justify-between items-center py-8 px-8 lg:px-16">
        <div className="w-full font-black lg:px-0 lg:pb-0">
          <h2 className="text-3xl lg:text-4xl">Vision</h2>
          <h1 className="text-3xl lg:text-5xl">PUSB 2025</h1>
          <h3 className="text-3xl lg:text-5xl">{profilePUSB.cabinet_name}</h3>
        </div>
        <div className="w-full bg-[#343434] p-2 lg:p-8 flex justify-center items-center rounded-lg mt-4">
          <p className="text-lg text-white font-sans font-medium">
            {profilePUSB.vision}
          </p>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="w-full flex flex-col lg:flex-row-reverse justify-center items-center py-8 px-8 lg:px-16 bg-gray-900">
        <div className="w-full text-center font-black pb-4 lg:pb-0">
          <h2 className="text-3xl lg:text-4xl">Mission</h2>
          <h1 className="text-3xl lg:text-5xl">PUSB 2025</h1>
          <h3 className="text-3xl lg:text-5xl">{profilePUSB.cabinet_name}</h3>
        </div>
        <ContainerAccordion missions={MissionPUSB.length ? MissionPUSB : fallbackMissions} />
      </section>

      {/* LOGO SECTION */}
      <section className="w-full min-h-[90vh] flex flex-col justify-center items-center px-8 lg:px-16 mt-8 mb-12">
        <CardLogoContainer />
      </section>
    </main>
  );
};

export default PUSBPage;
