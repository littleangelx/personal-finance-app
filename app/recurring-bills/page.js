"use client";

import SmallScreenMenu from "@/components/SmallScreenMenu";
import { useMinimised } from "@/context/sidebarWidth";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Tooltip } from "react-tooltip";
import jsonData from "@/public/assets/data.json";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { differenceInDays, format } from "date-fns";
import Image from "next/image";

const SORT_OPTIONS = [
  "Date ↑",
  "Date ↓",
  "A to Z",
  "Z to A",
  "Highest",
  "Lowest",
];

const RecurringBillsPage = () => {
  const { isMinimised } = useMinimised();

  const isDesktop = useMediaQuery({ minWidth: 1280 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Date ↑");
  const [sortedResults, setSortedResults] = useState([]);

  const [totalBills, setTotalBills] = useState(0);
  const [paidBills, setPaidBills] = useState(0);
  const [paidBillsCount, setPaidBillsCount] = useState(0);
  const [upcomingBills, setUpcomingBills] = useState(0);
  const [upcomingBillsCount, setUpcomingBillsCount] = useState(0);
  const [dueBills, setDueBills] = useState(0);
  const [dueBillsCount, setDueBillsCount] = useState(0);

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
    let sortedArray = [...uniqueData];

    setTotalBills(uniqueData.reduce((acc, cur) => acc + cur.amount, 0));
    setPaidBills(
      uniqueData.reduce((acc, cur) => {
        if (cur.status === "paid") {
          return acc + cur.amount;
        }
        return acc;
      }, 0)
    );
    setPaidBillsCount(
      uniqueData.filter((item) => item.status === "paid").length
    );
    setUpcomingBills(
      uniqueData.reduce((acc, cur) => {
        if (cur.status !== "paid") {
          return acc + cur.amount;
        }
        return acc;
      }, 0)
    );
    setUpcomingBillsCount(
      uniqueData.filter((item) => item.status !== "paid").length
    );
    setDueBills(
      uniqueData.reduce((acc, cur) => {
        if (cur.status === "due") {
          return acc + cur.amount;
        }
        return acc;
      }, 0)
    );
    setDueBillsCount(uniqueData.filter((item) => item.status === "due").length);

    switch (sortBy) {
      case "Date ↓":
        sortedArray.sort((a, b) => b.dateOrder - a.dateOrder);
        break;
      case "Date ↑":
        sortedArray.sort((a, b) => a.dateOrder - b.dateOrder);
        break;
      case "A to Z":
        sortedArray.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z to A":
        sortedArray.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "Highest":
        sortedArray.sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));
        break;
      case "Lowest":
        sortedArray.sort((a, b) => Math.abs(a.amount) - Math.abs(b.amount));
        break;
      default:
        sortedArray.sort((a, b) => a.dateOrder - b.dateOrder);
    }

    setSortedResults(sortedArray);
  }, [sortBy]);

  const handleSelectSortBy = (value) => {
    setSortBy(value);
  };

  return (
    <div
      className={`overflow-y-scroll py-8 px-4 md:px-8 xl:px-10 pb-16 md:pb-24  ${
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
        Recurring Bills
      </h1>
      <div
        className="xl:grid xl:grid-cols-2 xl:gap-6"
        style={{ gridTemplateColumns: isDesktop ? "1fr 2.5fr" : "" }}
      >
        <div className="flex flex-col md:flex-row xl:flex-col gap-6 mb-6">
          <div className="w-full h-[7.375rem] md:h-[12.75rem] xl:h-[11.875rem] p-6 rounded-xl bg-grey-900 flex md:flex-col items-center md:items-start gap-8 self-start">
            <Image
              src="/assets/images/icon-recurring-bills.svg"
              width={40}
              height={40}
              alt="recurring bills icon"
            />
            <div>
              <p className="mb-[0.6875rem] text-sm text-white">Total Bills</p>
              <p className="text-[2rem] font-bold text-white">
                £{(-1 * totalBills).toFixed(2)}
              </p>
            </div>
          </div>
          <div className="w-full h-[12.75rem] p-6 rounded-xl flex flex-col bg-white self-start">
            <p className="text-grey-900 font-bold mb-5">Summary</p>
            <div className="flex justify-between items-center pb-4 mb-4 border-b-[0.0625rem] border-b-[#69686815]">
              <p className="text-grey-500 text-xs">Paid Bills</p>
              <p className="text-grey-900 text-xs font-bold">
                {paidBillsCount} (£{(-1 * paidBills).toFixed(2)})
              </p>
            </div>
            <div className="flex justify-between items-center pb-4 mb-4 border-b-[0.0625rem] border-b-[#69686815]">
              <p className="text-grey-500 text-xs">Total Upcoming</p>
              <p className="text-grey-900 text-xs font-bold">
                {upcomingBillsCount} (£{(-1 * upcomingBills).toFixed(2)})
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-red text-xs">Due Soon</p>
              <p className="text-red  text-xs font-bold">
                {dueBillsCount} (£{(-1 * dueBills).toFixed(2)})
              </p>
            </div>
          </div>
        </div>
        <section className="w-full bg-white rounded-xl py-6 px-5 md:p-8">
          <div className="flex justify-between items-center mb-9 xl:mb-6">
            <div className="w-64 md:w-40 xl:w-80 h-12 rounded-lg border border-beige-500 flex justify-between items-center px-5">
              <input
                placeholder="Search bills"
                className="placeholder:text-sm placeholder:text-beige-500 outline-none border-none text-sm md:w-24 xl:w-80 md:overflow-ellipsis"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <img src="/assets/images/icon-search.svg" />
            </div>
            <div className="md:hidden flex gap-6">
              <img
                src="/assets/images/icon-sort-mobile.svg"
                alt="sort icon"
                data-tooltip-id="sort-menu"
                data-event="click"
              />
              <Tooltip
                id="sort-menu"
                place="bottom-start"
                content={
                  <SmallScreenMenu
                    options={SORT_OPTIONS}
                    onSelect={handleSelectSortBy}
                  />
                }
                style={{
                  backgroundColor: "#fff",
                  padding: 0,
                }}
                opacity={1}
                clickable
                className="rounded-tooltip"
              />
            </div>
            <div className="hidden md:flex gap-2 items-center cursor-pointer">
              <label className="text-grey-500 text-sm">Sort by</label>
              <Dropdown
                options={SORT_OPTIONS}
                value={sortBy}
                onChange={(e) => setSortBy(e.value)}
              />
            </div>
          </div>
          <div
            className="hidden md:grid grid-cols-3 mb-6"
            style={{ gridTemplateColumns: "2fr 1fr 1fr" }}
          >
            <p className="text-xs text-grey-500">Bill Title</p>
            <p className="text-xs text-grey-500">Due Date</p>
            <p className="text-xs text-grey-500 text-right">Amount</p>
          </div>
          {sortedResults.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:grid grid-cols-3 md:justify-between md:items-center py-4  border-b border-b-grey-100 last:border-b-0"
              style={{ gridTemplateColumns: "2fr 1fr 1fr" }}
            >
              <div className="flex gap-4 items-center mb-2 md:mb-0">
                <img
                  src={item.avatar}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-bold text-grey-900">{item.name}</p>
                </div>
              </div>
              <div className="flex justify-between md:grid grid-cols-2 col-span-2">
                <div className="flex gap-2 items-center">
                  <p
                    className={`md:text-right xl:text-left text-[0.75rem] leading-[1.125rem] ${
                      item.status === "paid" ? "text-green" : "text-grey-500"
                    }`}
                  >
                    {item.date}
                  </p>
                  {item.status === "paid" && (
                    <img src="/assets/images/icon-bill-paid.svg" />
                  )}
                  {item.status === "due" && (
                    <img src="/assets/images/icon-bill-due.svg" />
                  )}
                </div>
                <div className="flex flex-col justify-between">
                  <p
                    className={`text-sm font-bold text-right ${
                      item.status === "due" ? "text-red" : "text-grey-900"
                    }`}
                  >
                    £
                    {item.amount < 0
                      ? (item.amount * -1).toFixed(2)
                      : item.amount.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default RecurringBillsPage;
