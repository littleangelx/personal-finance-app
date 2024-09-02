"use client";

import { useMinimised } from "@/context/sidebarWidth";
import jsonData from "@/public/assets/data.json";
import Image from "next/image";
import { useState, useEffect } from "react";
import { format } from "date-fns";

const Transactions = () => {
  const { isMinimised } = useMinimised();

  const [numPages, setNumPages] = useState(
    Math.ceil(jsonData.transactions.length / 10)
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState(jsonData.transactions);

  useEffect(() => {
    setResults(
      jsonData.transactions.filter(
        (result) =>
          result.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          result.amount === +searchTerm
      )
    );
    setNumPages(Math.ceil(results.length / 10));
  }, [searchTerm, results.length]);

  return (
    <div
      className={`overflow-y-scroll py-8 px-10 ${
        isMinimised ? "ml-[5.5rem]" : "ml-[18.8rem]"
      }`}
      style={{
        width: isMinimised ? "calc(100vw - 5.5rem)" : "calc(100vw - 18.8rem)",
      }}
    >
      <h1 className="text-grey-900 font-bold text-[2rem] leading-[2.4rem] mb-10">
        Transactions
      </h1>
      <section className="w-full bg-white rounded-xl p-8">
        <div className="flex justify-between items-center mb-9">
          <div className="w-80 h-12 rounded-lg border border-beige-500 flex justify-between items-center px-5">
            <input
              placeholder="Search transactions"
              className="placeholder:text-sm placeholder:text-beige-500 outline-none border-none text-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img src="/assets/images/icon-search.svg" />
          </div>
        </div>
        <div
          className="grid grid-cols-4 mb-6 pb-3 border-b-[1px] border-b-grey-100"
          style={{ gridTemplateColumns: "3fr 1fr 1fr 1.5fr" }}
        >
          <p className="text-grey-500 text-[0.75rem] leading-[1.125rem]">
            Recipient / Sender
          </p>
          <p className="text-grey-500 text-[0.75rem] leading-[1.125rem]">
            Category
          </p>
          <p className="text-grey-500 text-[0.75rem] leading-[1.125rem]">
            Transaction Date
          </p>
          <p className="text-right text-grey-500 text-[0.75rem] leading-[1.125rem]">
            Amount
          </p>
        </div>

        {results
          .slice((currentPage - 1) * 10, currentPage * 10)
          .map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-4 items-center py-4  border-b border-b-grey-100 last:border-b-0"
              style={{ gridTemplateColumns: "3fr 1fr 1fr 1.5fr" }}
            >
              <div className="flex gap-4 items-center">
                <img src={item.avatar} className="w-10 h-10 rounded-full" />
                <p className="text-sm font-bold text-grey-900">{item.name}</p>
              </div>
              <p className="text-[0.75rem] leading-[1.125rem] text-grey-500">
                {item.category}
              </p>
              <p className="text-[0.75rem] leading-[1.125rem] text-grey-500">
                {" "}
                {format(item.date, "d MMM yyyy")}
              </p>
              <p
                className={`text-sm font-bold text-right ${
                  item.amount > 0 ? "text-green" : "text-grey-900"
                }`}
              >
                {item.amount < 0
                  ? "-£" + (item.amount * -1).toFixed(2)
                  : "+£" + item.amount.toFixed(2)}
              </p>
            </div>
          ))}
        <div className="flex justify-between w-full mt-12 items-center">
          <div
            className="w-24 h-10 rounded-lg border border-beige-500 flex justify-between px-4 items-center cursor-pointer"
            onClick={
              currentPage === 1
                ? () => {}
                : () => setCurrentPage((page) => page - 1)
            }
          >
            <img src="/assets/images/icon-caret-left.svg" />
            <p className="text-sm text-grey-900">Prev</p>
          </div>
          <div className="flex gap-2">
            {Array.from({ length: numPages }, (_, i) => i + 1).map((num) => (
              <div
                key={num}
                className={`w-10 h-10 flex justify-center items-center cursor-pointer border border-beige-500 rounded-lg ${
                  num === currentPage ? "bg-grey-900" : "bg-white"
                }`}
                onClick={() => setCurrentPage(num)}
              >
                <p
                  className={`text-sm ${
                    num === currentPage ? "text-white" : "text-grey-900"
                  }`}
                >
                  {num}
                </p>
              </div>
            ))}
          </div>
          <div
            className="w-24 h-10 rounded-lg border border-beige-500 flex justify-between px-4 items-center cursor-pointer"
            onClick={
              currentPage === numPages
                ? () => {}
                : () => setCurrentPage((page) => page + 1)
            }
          >
            <p className="text-sm text-grey-900">Next</p>
            <img src="/assets/images/icon-caret-right.svg" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Transactions;
