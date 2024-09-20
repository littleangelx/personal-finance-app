"use client";

import AddNewPotModal from "@/components/AddNewPotModal";
import Pot from "@/components/Pot";
import { useMinimised } from "@/context/sidebarWidth";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

const Pots = () => {
  const { isMinimised } = useMinimised();

  const isDesktop = useMediaQuery({ minWidth: 1280 });

  const pots = useSelector((state) => state.fundsReducer.pots);

  const [addPotVisible, setAddPotVisible] = useState(false);

  const handleAddPotVisible = (value) => {
    setAddPotVisible(value);
  };

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
        <button
          className="p-4 bg-grey-900 text-white rounded-lg"
          onClick={() => handleAddPotVisible(true)}
        >
          + Add New Pot
        </button>
      </div>
      <section className="xl:grid xl:grid-cols-2 flex flex-col gap-6">
        {pots.map((pot) => (
          <Pot key={pot.id} {...pot} />
        ))}
      </section>
      <AddNewPotModal
        isVisible={addPotVisible}
        onChangeVisibility={handleAddPotVisible}
      />
    </div>
  );
};

export default Pots;
