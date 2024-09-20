"use client";

import BalanceItem from "@/components/BalanceItem";
import OverviewBills from "@/components/OverviewBills";
import OverviewBudgets from "@/components/OverviewBudgets";
import OverviewPots from "@/components/OverviewPots";
import OverviewTransactions from "@/components/OverviewTransactions";
import { useMinimised } from "@/context/sidebarWidth";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

export default function Home() {
  const isDesktop = useMediaQuery({ minWidth: 1280 });

  const { isMinimised } = useMinimised();

  const balances = useSelector((state) => state.fundsReducer.balance);

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
      <h1 className="text-grey-900 font-bold text-[2rem] leading-[2.4rem] mb-8 xl:mb-10">
        Overview
      </h1>
      <section>
        <div className="flex flex-col md:grid md:grid-cols-3 gap-3 md:gap-6 mb-8 ">
          <BalanceItem
            title={"Current Balance"}
            amount={balances.current}
            bgColor={"bg-grey-900"}
          />
          <BalanceItem
            title={"Income"}
            amount={balances.income}
            bgColor={"bg-white"}
          />
          <BalanceItem
            title={"Expenses"}
            amount={balances.expenses}
            bgColor={"bg-white"}
          />
        </div>

        <div
          className="flex flex-col xl:grid xl:grid-cols-2 gap-4 md:gap-6 "
          style={{ gridTemplateColumns: isDesktop ? "1.4fr 1fr" : "" }}
        >
          <div className="flex flex-col gap-4 md:gap-6">
            <OverviewPots />
            <OverviewTransactions />
          </div>
          <div className="flex flex-col gap-4 md:gap-6">
            <OverviewBudgets />
            <OverviewBills />
          </div>
        </div>
      </section>
    </div>
  );
}
