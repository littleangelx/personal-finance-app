import Link from "next/link";
import { useSelector } from "react-redux";

import jsonData from "@/public/assets/data.json";
import DonutChart from "./DonutChart";

const OverviewBudgets = () => {
  const budgets = useSelector((state) => state.fundsReducer.budgets);

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

  return (
    <div className="w-full bg-white py-6 px-5 md:p-8 flex flex-col gap-5 rounded-xl">
      <div className="flex justify-between items-center">
        <h3 className="text-grey-900 font-bold text-xl">Budgets</h3>
        <Link
          className="flex gap-3 items-center cursor-pointer"
          href={"/budgets"}
        >
          <p className="text-grey-500 text-sm">See Details</p>
          <img
            src={"/assets/images/icon-caret-right.svg"}
            alt="arrow to see all transactions in this category"
          />
        </Link>
      </div>
      <div className="w-full flex flex-col md:flex-row items-center gap-10 ">
        <DonutChart data={dataForCharts} />

        <div className="max-sm:w-full  grid grid-cols-2 md:flex md:flex-col gap-4 xl:my-16">
          {budgets.slice(0, 4).map((budget) => (
            <div key={budget.id} className="flex gap-4">
              <div
                className="w-1 rounded-lg"
                style={{ backgroundColor: budget.theme.value }}
              />
              <div className="flex flex-col justify-between">
                <p className="text-xs text-grey-500">{budget.category}</p>
                <p className="text-sm font-bold text-grey-900">
                  £{Math.round(budget.maximum)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewBudgets;
