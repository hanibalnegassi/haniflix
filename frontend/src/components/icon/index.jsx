import React from "react";
import { IconsList } from "./icons";
import CircularProgress from "@mui/material-next/CircularProgress";

export default function Icon({ name, size = "L", hovered = false }) {
  let width, height;

  if (size === "M") {
    width = "w-[34px] xl:w-[34px]";
    height = "h-[34px] xl:h-[34px]";
  } else if (size === "S") {
    width = "w-[14px] xl:w-[16px]";
    height = "h-[14px] xl:h-[16px]";
  } else {
    width = "w-[22px] xl:w-[26px]";
    height = "h-[22px] xl:h-[26px]";
  }

  const iconClasses = "object-contain transition-all duration-300";
  const Opacity1 = hovered ? "opacity-0" : "opacity-1";
  const Opacity2 = hovered ? "opacity-1" : "opacity-0";

  if (name === "Loading") {
    return (
      <div className={`${width} ${height} flex justify-center items-center`}>
        <CircularProgress color="inherit" size={10} />
      </div>
    );
  }
  return (
    <div className={`${width} ${height} flex relative group`}>
      <img
        src={IconsList[name]?.[0]}
        alt=""
        className={`w-full h-full ${iconClasses} ${Opacity1} group-hover:opacity-0`}
      />
      <img
        src={IconsList[name]?.[1]}
        alt=""
        className={`w-full h-full ${iconClasses} ${Opacity2} absolute group-hover:opacity-100`}
        style={{
          filter: "drop-shadow(0px 0px 5px #13B8A6)",
        }}
      />
    </div>
  );
}
