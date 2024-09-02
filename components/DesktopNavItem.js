"use client";

import { usePathname } from "next/navigation";

import { overviewIcon } from "@/public/assets/images/icon-nav-overview";
import { transactionsIcon } from "@/public/assets/images/icon-nav-transactions";
import { budgetsIcon } from "@/public/assets/images/icon-nav-budgets";
import { potsIcon } from "@/public/assets/images/icon-nav-pots";
import { recurringBillsIcon } from "@/public/assets/images/icon-nav-recurring-bills";
import Link from "next/link";
import { useMinimised } from "@/context/sidebarWidth";

const DesktopNavItem = ({ category, name }) => {
  const pathname = usePathname();

  const { isMinimised } = useMinimised();

  let icon;
  switch (category) {
    case "/transactions":
      icon = transactionsIcon;
      break;
    case "/budgets":
      icon = budgetsIcon;
      break;
    case "/pots":
      icon = potsIcon;
      break;
    case "/recurring-bills":
      icon = recurringBillsIcon;
      break;
    default:
      icon = overviewIcon;
      break;
  }

  return (
    <Link
      href={category}
      className={`flex gap-4  h-[3.5rem] pl-8 rounded-r-xl items-center cursor-pointer ${
        pathname === category ? "bg-beige-100" : "transparent"
      } ${isMinimised ? "w-16" : "w-[17.25rem]"}`}
    >
      {pathname === category ? icon(true) : icon(false)}
      {!isMinimised && (
        <p
          className={`font-bold ${
            pathname === category ? "text-grey-900" : "text-grey-300"
          }`}
        >
          {name}
        </p>
      )}
    </Link>
  );
};

export default DesktopNavItem;
