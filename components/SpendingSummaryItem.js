import jsonData from "@/public/assets/data.json";

const SpendingSummaryItem = ({ category, maximum, theme }) => {
  const filteredTransactions = jsonData.transactions.filter(
    (transaction) =>
      transaction.category === category &&
      new Date(transaction.date).getMonth() === 7
  );

  const spent =
    -1 * filteredTransactions.reduce((acc, cur) => acc + cur.amount, 0);

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <div
          className="w-1 h-[1.31rem] rounded-lg"
          style={{ backgroundColor: theme.value }}
        />
        <p className="text-grey-500 text-sm">{category}</p>
      </div>
      <p className="text-grey-500 text-xs">
        <span className="text-base font-bold text-grey-900">
          £{spent.toFixed(2)}
        </span>
        {"   "}
        of £{maximum.toFixed(2)}
      </p>
    </div>
  );
};

export default SpendingSummaryItem;
