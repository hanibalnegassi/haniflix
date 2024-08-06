import React from "react";
import { useNavigate } from "react-router-dom";

import styles from './welcome.module.scss'

const TopSection: React.FC = () => {
  const navigate = useNavigate();

  const onSignUp = () => {
    navigate(`/register`);
  };

  return (
    <div className={styles["top-section-container"]}>
      <div className="flex items-center justify-center">
        <div className="h-[72px] w-[72px]">
          <img alt="" src="/images/popcorn.png" />
        </div>
        <div className="">
          <h1 className="text-base sm:text-xl">
            The Haniflix you love for only $4.99/month.
          </h1>
          <p className="text-sm sm:text-base sm:text-xl">
            Get our affordable and ad-free plan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
