import { useState } from "react";

import jsonData from "@/public/assets/data.json";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import EditBudgetModal from "./EditBudgetModal";
import DeleteBudgetModal from "./DeleteBudgetModal";

const BudgetItem = ({ id, category, maximum, theme }) => {
  const router = useRouter();

  const dispatch = useDispatch();

  const [showBudgetMenu, setShowBudgetMenu] = useState(false);
  const [editBudgetVisible, setEditBudgetVisible] = useState(false);
  const [deleteBudgetVisible, setDeleteBudgetVisible] = useState(false);

  const latestTransactions = jsonData.transactions
    .filter((transaction) => transaction.category === category)
    .slice(0, 3);

  const filteredTransactions = jsonData.transactions.filter(
    (transaction) =>
      transaction.category === category &&
      new Date(transaction.date).getMonth() === 7
  );

  const spent =
    -1 * filteredTransactions.reduce((acc, cur) => acc + cur.amount, 0);
  const percentageSpent = (spent / maximum) * 100;

  const handleEditVisible = (value) => {
    setEditBudgetVisible(value);
  };

  const handleDeleteVisible = (value) => {
    setDeleteBudgetVisible(value);
  };

  return (
    <div className="w-full p-6 md:p-8 flex flex-col gap-5 bg-white rounded-xl">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <div
            className={`w-4 h-4 rounded-full`}
            style={{ backgroundColor: theme.value }}
          />
          <h2 className="text-grey-900 font-bold text-xl">{category}</h2>
        </div>
        <div
          className="relative h-10 w-10 flex justify-center items-center cursor-pointer"
          onClick={() => setShowBudgetMenu((show) => !show)}
        >
          <img
            src="/assets/images/icon-ellipsis.svg"
            className="cursor-pointer absolute z-10"
          />
          {showBudgetMenu && (
            <div
              className="flex flex-col gap-3 py-3 px-5 bg-white absolute right-6 top-8 rounded-lg w-44"
              style={{ boxShadow: "0px 4px 24px 0px rgba(0, 0, 0, 0.25)" }}
            >
              <p
                className="text-grey-900 text-sm cursor-pointer"
                onClick={() => handleEditVisible(true)}
              >
                Edit Budget
              </p>
              <p
                className="text-red text-sm cursor-pointer"
                onClick={() => handleDeleteVisible(true)}
              >
                Delete Budget
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-grey-500 text-sm">
          Maximum of £{maximum.toFixed(2)}
        </p>
        <div className="w-full h-8 bg-beige-100 rounded">
          <div
            className="max-w-full h-8 rounded"
            style={{
              width: percentageSpent + "%",
              backgroundColor: theme.value,
            }}
          />
        </div>
        <div className="w-full grid grid-cols-2">
          <div className="flex gap-4">
            <div
              className="w-1 h-[2.6875rem] rounded-lg"
              style={{ backgroundColor: theme.value }}
            />
            <div className="flex flex-col justify-between">
              <p className="text-grey-500 text-xs">Spent</p>
              <p className="text-grey-900 text-sm font-bold">
                £{spent.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1 h-[2.6875rem] rounded-lg bg-beige-100" />
            <div className="flex flex-col justify-between">
              <p
                className={`text-xs ${
                  maximum - spent < 0 ? "text-red" : "text-grey-500"
                } `}
              >
                Remaining
              </p>
              <p
                className={`text-sm font-bold ${
                  maximum - spent < 0 ? "text-red" : "text-grey-900"
                }`}
              >
                {maximum - spent < 0 ? "-" : ""}£
                {(maximum - spent < 0
                  ? -1 * (maximum - spent)
                  : maximum - spent
                ).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 p-5 rounded-xl bg-beige-100">
          <div className="flex justify-between items-center">
            <h3 className="text-grey-900 font-bold">Latest Transactions</h3>
            <Link
              className="flex gap-3 items-center cursor-pointer"
              href={`/transactions?selectedCategory=${category}`}
            >
              <p className="text-grey-500 text-sm">See All</p>
              <img
                src={"/assets/images/icon-caret-right.svg"}
                alt="arrow to see all transactions in this category"
              />
            </Link>
          </div>
          {latestTransactions.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b-[0.0625rem] border-b-grey-500/15 last:border-0 pb-3 last:pb-0"
            >
              <div className="flex gap-4 items-center">
                <img
                  src={item.avatar}
                  className="hidden md:flex w-8 h-8 rounded-full"
                  alt="avatar of payee"
                />
                <p className="text-grey-900 text-xs font-bold">{item.name}</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-grey-900 text-xs font-bold text-right">
                  {item.amount < 0 ? "-" : "+"}£
                  {(item.amount < 0 ? -1 * item.amount : item.amount).toFixed(
                    2
                  )}
                </p>
                <p className="text-grey-500 text-xs text-right">
                  {format(item.date, "d MMM yyyy")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <EditBudgetModal
        isVisible={editBudgetVisible}
        onChangeVisibility={handleEditVisible}
        maximum={maximum}
        id={id}
        theme={theme}
        category={category}
      />
      <DeleteBudgetModal
        isVisible={deleteBudgetVisible}
        onChangeVisibility={handleDeleteVisible}
        category={category}
        id={id}
      />
    </div>
  );
};

export default BudgetItem;
