import React, { useContext } from "react";
import { Context } from "../../main"; // Adjust the import path as necessary
import { Navigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategories";

const Home = () => {
  const { isAuthorized, user } = useContext(Context);

  // if (!isAuthorized) {
  //   return <Navigate to={"/login"} />;
  // }
  if (!isAuthorized) {
    return <Navigate to={"/landing"} />;
  }

  return (
    <>
      <section className="homePage page">
        <HeroSection />
        <HowItWorks />
        {/* Show PopularCategories only if the user is a Job Seeker */}
        {user?.role === 'Job Seeker' && <PopularCategories />}
      </section>
    </>
  );
};

export default Home;