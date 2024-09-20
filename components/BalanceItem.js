const BalanceItem = ({ bgColor, amount, title }) => {
  return (
    <div
      className={`w-full flex flex-col gap-3 p-5 md:p-6 rounded-xl ${bgColor}`}
    >
      <p
        className={`text-sm ${
          bgColor === "bg-white" ? "text-grey-900" : "text-white"
        }`}
      >
        {title}
      </p>

      <h2
        className={`text-[2rem] font-bold ${
          bgColor === "bg-white" ? "text-grey-900" : "text-white"
        }`}
      >
        £{amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </h2>
    </div>
  );
};

export default BalanceItem;
