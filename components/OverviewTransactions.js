import Link from "next/link";

import jsonData from "@/public/assets/data.json";
import { format } from "date-fns";

const OverviewTransactions = () => {
  const topTransactions = jsonData.transactions.slice(0, 5);
  return (
    <div className="w-full bg-white py-6 px-5 md:p-8 flex flex-col gap-5 rounded-xl">
      <div className="flex justify-between items-center">
        <h3 className="text-grey-900 font-bold text-xl">Transactions</h3>
        <Link
          className="flex gap-3 items-center cursor-pointer"
          href={"/transactions"}
        >
          <p className="text-grey-500 text-sm">View All</p>
          <img
            src={"/assets/images/icon-caret-right.svg"}
            alt="arrow to see all transactions in this category"
          />
        </Link>
      </div>
      <div className="">
        {topTransactions.map((transaction, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-5 border-b-[0.0625rem] border-b-grey-100 last:border-b-0"
          >
            <div className="flex gap-4 items-center">
              <img
                src={transaction.avatar}
                className="w-8 h-8 md:w-10 md:h-10 rounded-full"
              />
              <p className="text-sm font-bold text-grey-900">
                {transaction.name}
              </p>
            </div>
            <div className="flex flex-col gap-3 items-end">
              <p
                className={`text-sm font-bold text-right ${
                  transaction.amount > 0 ? "text-green" : "text-grey-900"
                }`}
              >
                {transaction.amount < 0
                  ? "-£" + (transaction.amount * -1).toFixed(2)
                  : "+£" + transaction.amount.toFixed(2)}
              </p>
              <p className="text-[0.75rem] leading-[1.125rem] text-grey-500">
                {" "}
                {format(transaction.date, "d MMM yyyy")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewTransactions;
