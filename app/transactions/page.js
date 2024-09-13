"use client";

import { useMinimised } from "@/context/sidebarWidth";
import jsonData from "@/public/assets/data.json";
import Image from "next/image";
import { useState, useEffect } from "react";
import { format, set } from "date-fns";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useMediaQuery } from "react-responsive";
import { Tooltip } from "react-tooltip";
import SmallScreenMenu from "@/components/SmallScreenMenu";
import ReactPaginate from "react-paginate";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

const SORT_OPTIONS = [
  "Latest",
  "Oldest",
  "A to Z",
  "Z to A",
  "Highest",
  "Lowest",
];

const CATEGORIES = [
  "All Transactions",
  "Entertainment",
  "Bills",
  "Groceries",
  "Dining Out",
  "Transportation",
  "Personal Care",
  "Education",
  "Lifestyle",
  "Shopping",
  "General",
];

const Transactions = () => {
  const searchParams = useSearchParams();
  const selectedCategory =
    searchParams.get("selectedCategory") || "All Transactions";

  const { isMinimised } = useMinimised();

  const isDesktop = useMediaQuery({ minWidth: 1280 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [numPages, setNumPages] = useState(
    Math.ceil(jsonData.transactions.length / 10)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(jsonData.transactions);
  const [filteredResults, setFilteredResults] = useState(searchResults);
  const [sortedResults, setSortedResults] = useState(filteredResults);

  const [sortBy, setSortBy] = useState("Latest");
  const [category, setCategory] = useState(selectedCategory);

  const [pagesToShow, setPagesToShow] = useState([]);

  useEffect(() => {
    if (isMobile && (currentPage === 1 || currentPage === numPages)) {
      setPagesToShow([1, "...", numPages]);
    } else if (!isMobile && numPages > 5) {
      setPagesToShow([1, 2, "...", numPages - 1, numPages]);
    } else {
      setPagesToShow(Array.from({ length: numPages }, (_, i) => i + 1));
    }
  }, [currentPage, numPages, isMobile]);

  useEffect(() => {
    setSearchResults(
      jsonData.transactions.filter(
        (result) =>
          result.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          result.amount === +searchTerm
      )
    );
  }, [searchTerm]);

  useEffect(() => {
    if (category === "All Transactions") {
      setFilteredResults(searchResults);
    } else {
      setFilteredResults(
        searchResults.filter((result) => result.category === category)
      );
    }
  }, [searchResults, category, selectedCategory]);

  useEffect(() => {
    setNumPages(Math.ceil(filteredResults.length / 10));

    let sortedArray = [...filteredResults];

    switch (sortBy) {
      case "Latest":
        sortedArray.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "Oldest":
        sortedArray.sort((a, b) => new Date(a.date) - new Date(b.date));
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
        break;
    }

    setSortedResults(sortedArray);
  }, [filteredResults, sortBy]);

  const handleSelectSortBy = (value) => {
    setSortBy(value);
  };

  const handleFilter = (value) => {
    setCategory(value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
      <h1 className="text-grey-900 font-bold text-[2rem] leading-[2.4rem] mb-8 xl:mb-10">
        Transactions
      </h1>
      <section className="w-full bg-white rounded-xl py-6 px-5 md:p-8">
        <div className="flex justify-between items-center mb-9">
          <div className="md:w-40 xl:w-80 h-12 rounded-lg border border-beige-500 flex justify-between items-center px-5">
            <input
              placeholder="Search transactions"
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
            <img
              src="/assets/images/icon-filter-mobile.svg"
              alt="filter icon"
              data-tooltip-id="filter-menu"
              data-event="click"
            />
            <Tooltip
              id="filter-menu"
              place="bottom-start"
              content={
                <SmallScreenMenu options={CATEGORIES} onSelect={handleFilter} />
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
          <div className="hidden md:flex gap-6">
            <div className="flex gap-2 items-center cursor-pointer">
              <label className="text-grey-500 text-sm">Sort by</label>
              <Dropdown
                options={SORT_OPTIONS}
                value={sortBy}
                onChange={(e) => setSortBy(e.value)}
              />
            </div>
            <div className="hidden md:flex gap-2 items-center cursor-pointer">
              <label className="text-grey-500 text-sm">Category</label>
              <Dropdown
                options={CATEGORIES}
                value={category}
                onChange={(e) => setCategory(e.value)}
                className="categoryDropdown"
                menuClassName="categoryDropdown"
              />
            </div>
          </div>
        </div>
        <div
          className="grid-cols-4 mb-6 pb-3 border-b-[1px] border-b-grey-100 hidden md:grid"
          style={{ gridTemplateColumns: "3fr 1fr 1fr 1.5fr" }}
        >
          <p className="text-grey-500 text-[0.75rem] leading-[1.125rem]">
            Recipient / Sender
          </p>
          <p className="text-grey-500 text-[0.75rem] leading-[1.125rem]">
            Category
          </p>
          <p className="text-grey-500 text-[0.75rem] leading-[1.125rem]  md:text-right xl:text-left">
            Transaction Date
          </p>
          <p className="text-right text-grey-500 text-[0.75rem] leading-[1.125rem]">
            Amount
          </p>
        </div>

        {sortedResults
          .slice((currentPage - 1) * 10, currentPage * 10)
          .map((item, index) => (
            <div
              key={index}
              className="flex justify-between md:grid grid-cols-4 items-center py-4  border-b border-b-grey-100 last:border-b-0"
              style={{ gridTemplateColumns: "3fr 1fr 1fr 1.5fr" }}
            >
              <div className="flex gap-4 items-center">
                <img
                  src={item.avatar}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-bold text-grey-900">{item.name}</p>
                  <p className="md:hidden text-[0.75rem] text-grey-500">
                    {item.category}
                  </p>
                </div>
              </div>

              <p className="hidden md:block text-[0.75rem] leading-[1.125rem] text-grey-500">
                {item.category}
              </p>

              <p className="hidden md:block md:text-right xl:text-left text-[0.75rem] leading-[1.125rem] text-grey-500">
                {" "}
                {format(item.date, "d MMM yyyy")}
              </p>
              <div className="flex flex-col justify-between">
                <p
                  className={`text-sm font-bold text-right ${
                    item.amount > 0 ? "text-green" : "text-grey-900"
                  }`}
                >
                  {item.amount < 0
                    ? "-£" + (item.amount * -1).toFixed(2)
                    : "+£" + item.amount.toFixed(2)}
                </p>
                <p className="md:hidden text-[0.75rem] leading-[1.125rem] text-grey-500">
                  {" "}
                  {format(item.date, "d MMM yyyy")}
                </p>
              </div>
            </div>
          ))}
        {/* <ReactPaginate
          onPageChange={handlePageChange}
          pageRangeDisplayed={1}
          marginPagesDisplayed={1}
          pageCount={numPages}
          breakLabel="..."
        /> */}
        <div className="flex justify-between w-full mt-12 items-center">
          <div
            className="w:10 md:w-24 h-10 rounded-lg border border-beige-500 flex justify-between px-4 items-center cursor-pointer"
            onClick={
              currentPage === 1
                ? () => {}
                : () => setCurrentPage((page) => page - 1)
            }
          >
            <img src="/assets/images/icon-caret-left.svg" />
            <p className="hidden md:block text-sm text-grey-900">Prev</p>
          </div>
          <div className="flex gap-2">
            {pagesToShow.map((num) => (
              <>
                <div
                  key={num}
                  className={`w-10 h-10 flex justify-center items-center cursor-pointer border border-beige-500 rounded-lg ${
                    num === currentPage ? "bg-grey-900" : "bg-white"
                  } ${
                    num !== "..." &&
                    num !== 1 &&
                    num !== currentPage &&
                    num !== numPages
                      ? "hidden md:flex"
                      : ""
                  }`}
                  onClick={num === "..." ? () => {} : () => setCurrentPage(num)}
                >
                  <p
                    className={`text-sm ${
                      num === currentPage ? "text-white" : "text-grey-900"
                    }`}
                  >
                    {num}
                  </p>
                </div>
              </>
            ))}
          </div>
          {/* <div className="xl:hidden">
            <MobilePagination
              totalPages={numPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div> */}
          <div
            className="w-10 md:w-24 h-10 rounded-lg border border-beige-500 flex justify-between px-4 items-center cursor-pointer"
            onClick={
              currentPage === numPages
                ? () => {}
                : () => setCurrentPage((page) => page + 1)
            }
          >
            <p className="hidden md:block text-sm text-grey-900">Next</p>
            <img src="/assets/images/icon-caret-right.svg" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Transactions;
