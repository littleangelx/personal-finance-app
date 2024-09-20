import Link from "next/link";

import jsonData from "@/public/assets/data.json";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const OverviewBills = () => {
  const [paidBills, setPaidBills] = useState(0);
  const [upcomingBills, setUpcomingBills] = useState(0);
  const [dueBills, setDueBills] = useState(0);

  const data = jsonData.transactions
    .filter((item) => item.recurring === true)
    .map((item) => ({
      ...item,
      date: `Monthly - ${format(item.date, "do")}`,
      dateOrder: format(item.date, "dd"),
      status:
        format(new Date(), "dd") > format(item.date, "dd")
          ? "paid"
          : +format(item.date, "dd") - +format(new Date(), "dd") < 10
          ? "due"
          : "upcoming",
    }));

  useEffect(() => {
    let uniqueData = [];
    data.forEach((item) => {
      const found = uniqueData.find(
        (uniqueDataItem) => uniqueDataItem.name === item.name
      );
      if (found === undefined) {
        uniqueData.push(item);
      }
    });

    setPaidBills(
      uniqueData.reduce((acc, cur) => {
        if (cur.status === "paid") {
          return acc + cur.amount;
        }
        return acc;
      }, 0)
    );

    setUpcomingBills(
      uniqueData.reduce((acc, cur) => {
        if (cur.status !== "paid") {
          return acc + cur.amount;
        }
        return acc;
      }, 0)
    );
    setDueBills(
      uniqueData.reduce((acc, cur) => {
        if (cur.status === "due") {
          return acc + cur.amount;
        }
        return acc;
      }, 0)
    );
  }, []);

  return (
    <div className="w-full bg-white py-6 px-5 md:p-8 flex flex-col gap-5 rounded-xl">
      <div className="flex justify-between items-center">
        <h3 className="text-grey-900 font-bold text-xl">Recurring Bills</h3>
        <Link
          className="flex gap-3 items-center cursor-pointer"
          href={"/recurring-bills"}
        >
          <p className="text-grey-500 text-sm">See Details</p>
          <img
            src={"/assets/images/icon-caret-right.svg"}
            alt="arrow to see all transactions in this category"
          />
        </Link>
      </div>
      <div className="flex flex-col gap-3 xl:mt-7">
        <div className="w-full h-16 flex justify-between items-center bg-beige-100 rounded-lg border-l-4 border-l-green px-4">
          <p className="text-sm text-grey-500">Paid Bills</p>
          <p className="text-sm text-grey-900 font-bold">
            £
            {(-1 * paidBills).toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </p>
        </div>
        <div className="w-full h-16 flex justify-between items-center bg-beige-100 rounded-lg border-l-4 border-l-yellow px-4">
          <p className="text-sm text-grey-500">Total Upcoming</p>
          <p className="text-sm text-grey-900 font-bold">
            £
            {(-1 * upcomingBills).toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </p>
        </div>
        <div className="w-full h-16 flex justify-between items-center bg-beige-100 rounded-lg border-l-4 border-l-blue px-4">
          <p className="text-sm text-grey-500">Due Soon</p>
          <p className="text-sm text-grey-900 font-bold">
            £
            {(-1 * dueBills).toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OverviewBills;
