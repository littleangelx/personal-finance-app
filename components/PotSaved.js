const PotSaved = ({ total, target, theme }) => {
  const percentageSaved = (total / target) * 100;

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <p className="text-grey-500 text-sm">Total Saved</p>
        <h2 className="text-grey-900 text-[2rem] font-bold">
          £{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </h2>
      </div>
      <div className="w-full h-3 bg-beige-100 rounded mb-3">
        <div
          className="h-3 rounded"
          style={{ width: percentageSaved + "%", backgroundColor: theme }}
        />
      </div>
      <div className="flex justify-between items-center mb-10">
        <p className="text-xs text-grey-500 font-bold">
          {percentageSaved.toFixed(1)}%
        </p>
        <p className="text-grey-500 text-xs">
          Target of £{target.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default PotSaved;
