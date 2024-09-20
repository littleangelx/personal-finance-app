"use client";

import BudgetItem from "@/components/BudgetItem";
import DonutChart from "@/components/DonutChart";
import SpendingSummaryItem from "@/components/SpendingSummaryItem";
import { useMinimised } from "@/context/sidebarWidth";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import jsonData from "@/public/assets/data.json";
import { useState } from "react";
import AddNewBudgetModal from "@/components/AddNewBudgetModal";

const Budgets = () => {
  const { isMinimised } = useMinimised();

  const isDesktop = useMediaQuery({ minWidth: 1280 });

  const budgets = useSelector((state) => state.fundsReducer.budgets);
  console.log(budgets);

  const dataForCharts = budgets.map((budget) => ({
    name: budget.category,
    value:
      -1 *
      jsonData.transactions.reduce((acc, cur) => {
        if (
          cur.category === budget.category &&
          new Date(cur.date).getMonth() === 7
        ) {
          return acc + cur.amount;
        }
        return acc;
      }, 0),
    color: budget.theme.value,
    maximum: budget.maximum,
  }));

  const [addBudgetVisible, setAddBudgetVisible] = useState(false);

  const handleAddNewVisible = (value) => {
    setAddBudgetVisible(value);
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
          Budgets
        </h1>
        <button
          className="p-4 bg-grey-900 text-white rounded-lg"
          onClick={() => handleAddNewVisible(true)}
        >
          + Add New Budget
        </button>
      </div>
      <div
        className="xl:grid grid-cols-2 gap-6"
        style={{ gridTemplateColumns: "1fr 1.4fr" }}
      >
        <div className="w-full p-8 flex flex-col md:grid md:grid-cols-2   xl:flex xl:flex-col gap-8 xl:gap-8 rounded-xl bg-white self-start mb-6">
          <DonutChart data={dataForCharts} />
          <div className="flex flex-col gap-8">
            <h2 className="text-grey-900 text-xl font-bold">
              Spending Summary
            </h2>
            {budgets.map((item) => (
              <SpendingSummaryItem key={item.id} {...item} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {budgets.map((item) => (
            <BudgetItem key={item.id} {...item} />
          ))}
        </div>
      </div>
      <AddNewBudgetModal
        isVisible={addBudgetVisible}
        onChangeVisibility={handleAddNewVisible}
      />
    </div>
  );
};

export default Budgets;
