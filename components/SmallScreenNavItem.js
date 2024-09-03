"use client";

import { usePathname } from "next/navigation";

import { overviewIcon } from "@/public/assets/images/icon-nav-overview";
import { transactionsIcon } from "@/public/assets/images/icon-nav-transactions";
import { budgetsIcon } from "@/public/assets/images/icon-nav-budgets";
import { potsIcon } from "@/public/assets/images/icon-nav-pots";
import { recurringBillsIcon } from "@/public/assets/images/icon-nav-recurring-bills";
import Link from "next/link";

const SmallScreenNavItem = ({ category, name }) => {
  const pathname = usePathname();

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
      className={`flex flex-col gap-4 w-[4.2875rem] md:w-[6.5rem] h-[2.75rem] md:h-[4.125rem] justify-center rounded-t-lg items-center cursor-pointer ${
        pathname === category ? "bg-beige-100" : "transparent"
      } `}
    >
      {pathname === category ? icon(true) : icon(false)}
      <p
        className={`hidden md:block text-xs ${
          pathname === category ? "text-grey-900" : "text-grey-300"
        }`}
      >
        {name}
      </p>
    </Link>
  );
};

export default SmallScreenNavItem;
