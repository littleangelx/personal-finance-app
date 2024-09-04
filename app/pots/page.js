"use client";

import Pot from "@/components/Pot";
import { useMinimised } from "@/context/sidebarWidth";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

const Pots = () => {
  const { isMinimised } = useMinimised();

  const isDesktop = useMediaQuery({ minWidth: 1280 });

  const pots = useSelector((state) => state.fundsReducer.pots);

  return (
    <div
      className={`overflow-y-scroll py-8 px-4 md:px-8 xl:px-10 pb-16 md:pb-24 ${
        isMinimised ? "xl:ml-[5.5rem]" : "xl:ml-[18.8rem]"
      }`}
      style={{
        width: isDesktop
          ? isMinimised
            ? "calc(100vw - 5.5rem)"
            : "calc(100vw - 18.8rem)"
          : "100%",
      }}
    >
      <div className="w-full mb-8 xl:mb-10 flex justify-between items-center">
        <h1 className="text-grey-900 font-bold text-[2rem] leading-[2.4rem]">
          Pots
        </h1>
        <button className="p-4 bg-grey-900 text-white rounded-lg">
          + Add New Pot
        </button>
      </div>
      <section className="xl:grid xl:grid-cols-2 xl:gap-6">
        {pots.map((pot, index) => (
          <Pot key={index} {...pot} />
        ))}
      </section>
    </div>
  );
};

export default Pots;
