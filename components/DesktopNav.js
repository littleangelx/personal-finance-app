"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import DesktopNavItem from "./DesktopNavItem";
import { useMinimised } from "@/context/sidebarWidth";

const DesktopNav = () => {
  const { isMinimised, toggleMinimised } = useMinimised();

  return (
    <div
      className={`${
        isMinimised ? "w-[5.5rem]" : "w-[18.8rem]"
      } h-screen overflow-hidden bg-grey-900 rounded-r-2xl flex flex-col justify-between pb-10 fixed`}
    >
      <div>
        <img
          src={
            isMinimised
              ? "/assets/images/logo-small.svg"
              : "/assets/images/logo-large.svg"
          }
          alt="company logo"
          className={`h-auto aspect-auto my-10 ml-8 ${
            isMinimised ? "w-[0.78rem]" : "w-32"
          }`}
        />
        <nav className="mt-16">
          <DesktopNavItem category="/" name="Overview" />
          <DesktopNavItem category="/transactions" name="Transactions" />
          <DesktopNavItem category="/budgets" name="Budgets" />
          <DesktopNavItem category="/pots" name="Pots" />
          <DesktopNavItem category="/recurring-bills" name="Recurring bills" />
        </nav>
      </div>
      <div className="flex gap-4 cursor-pointer" onClick={toggleMinimised}>
        <img
          src="/assets/images/icon-minimize-menu.svg"
          className={`ml-8 ${isMinimised ? "rotate-180" : ""}`}
        />
        {!isMinimised && (
          <p className="font-bold text-grey-300">Minimise menu</p>
        )}
      </div>
    </div>
  );
};

export default DesktopNav;
