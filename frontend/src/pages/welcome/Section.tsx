import React from "react";
import styles from "./welcome.module.scss";

import gradientStar from "../../Assets/Images/gradientStar.png";

interface SectionProps {
  title: string;
  description: string;
  imageUrl: string;
  imagePosition: "left" | "right";
  contentWrapperStyle?: React.CSSProperties;
  imageWrapperStyle?: React.CSSProperties;
  icon: any;
}

const Section: React.FC<SectionProps> = ({
  title,
  description,
  imageUrl,
  imagePosition,
  contentWrapperStyle,
  imageWrapperStyle,
  icon,
}) => {
  const flexDirection = imagePosition === "right" ? "row" : "row-reverse";

  return (
    <div
      className={styles["section"]}
      style={{ display: "flex", flexDirection }}
    >
      <div style={{ flex: "1", ...contentWrapperStyle }}>
        <div className="h-[56px] w-[56px] mb-[25px]">{icon}</div>
        <h1 className="font-[600] !text-[36px] leading-[56px] mb-3">{title}</h1>
        <p className="">{description}</p>
      </div>
      <div
        className="h-[450px]"
        style={{ flex: "1", padding: "20px", ...imageWrapperStyle }}
      >
        <img alt="section image" src={imageUrl} />
      </div>
    </div>
  );
};

export default Section;
