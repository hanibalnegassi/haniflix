import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetGenresQuery } from "../store/rtk-query/genresApi";
import { addClassNames } from "../store/utils/functions";
import { MdOutlineArrowDropDown } from "react-icons/md";
import useResponsive from "../hooks/useResponsive";

function GenresDropdown() {
  const {
    data: genresData,
    isLoading,
    error,
  } = useGetGenresQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const [isOpen, setIsOpen] = useState(false);

  const dropdownContentRef = useRef(null);
  const dropdownButtonRef = useRef(null);

  const { isMobile } = useResponsive();

  const genres = genresData?.genres;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        event.target !== dropdownButtonRef.current &&
        !dropdownContentRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  let numOfGridRows = Math.ceil(genres?.length / 3);
  if (isMobile) {
    numOfGridRows = Math.ceil(genres?.length / 2);
  }

  return (
    <div className="relative w-[fit-content] z-50">
      <button
        ref={dropdownButtonRef}
        className={addClassNames(
          "relative border h-[40px] flex items-center justify-center",
          "border-[grey] px-3 gap-1 z-50"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>Genres</div>
        <div>
          <MdOutlineArrowDropDown className="text-white" />
        </div>
      </button>
      <div
        ref={dropdownContentRef}
        className="relative dropdownAlignment"
        style={{ transform: "translateZ(0)" }}
      >
        {isOpen && numOfGridRows !== undefined && (
          <ul
            style={{
              ...(numOfGridRows && {
                gridTemplateRows: `repeat(${numOfGridRows}, auto)`,
              }),
            }}
            className={addClassNames(
              "absolute grid z-50",
              ` grid-flow-row md:grid-flow-col`,
              "bg-slate-950/[.9] w-[52vw] sm:w-[270px] md:w-[800px]",
              "p-4 gap-y-2 sm:gap-y-[0px]"
            )}
          >
            {genres?.map((genre) => (
              <li
                className="hover:underline h-[35px] capitalize"
                key={genre._id}
              >
                <Link to={`/genre/${genre._id}`}>{genre.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default GenresDropdown;
