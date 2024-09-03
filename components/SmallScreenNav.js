import SmallScreenNavItem from "./SmallScreenNavItem";

const SmallScreenNav = () => {
  return (
    <nav
      className="fixed bottom-0 w-screen pt-2 px-4 md:px-10 h-[3.25rem]
  md:h-[4.625rem] bg-grey-900 rounded-t-lg flex justify-between"
    >
      <SmallScreenNavItem category="/" name="Overview" />
      <SmallScreenNavItem category="/transactions" name="Transactions" />
      <SmallScreenNavItem category="/budgets" name="Budgets" />
      <SmallScreenNavItem category="/pots" name="Pots" />
      <SmallScreenNavItem category="/recurring-bills" name="Recurring bills" />
    </nav>
  );
};

export default SmallScreenNav;
