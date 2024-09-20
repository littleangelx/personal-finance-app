import Link from "next/link";
import { useSelector } from "react-redux";

const OverviewPots = () => {
  const pots = useSelector((state) => state.fundsReducer.pots);
  const total = pots.reduce((acc, cur) => acc + cur.total, 0);
  return (
    <div className="w-full bg-white py-6 px-5 md:p-8 flex flex-col gap-5 rounded-xl">
      <div className="flex justify-between items-center">
        <h3 className="text-grey-900 font-bold text-xl">Pots</h3>
        <Link className="flex gap-3 items-center cursor-pointer" href={"/pots"}>
          <p className="text-grey-500 text-sm">See Details</p>
          <img
            src={"/assets/images/icon-caret-right.svg"}
            alt="arrow to see all transactions in this category"
          />
        </Link>
      </div>
      <div className="flex flex-col gap-5 md:grid md:grid-cols-2">
        <div className="p-4 flex gap-4 items-center rounded-xl bg-beige-100">
          <img src="/assets/images/icon-pot.svg" />
          <div className="flex flex-col gap-3">
            <p className="text-sm text-grey-500">Total Saved</p>
            <p className="text-[2rem] font-bold text-grey-900">
              £{Math.round(total)}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {pots.slice(0, 4).map((pot) => (
            <div key={pot.id} className="flex gap-4">
              <div
                className="w-1 rounded-lg"
                style={{ backgroundColor: pot.theme.value }}
              />
              <div className="flex flex-col justify-between">
                <p className="text-xs text-grey-500">{pot.name}</p>
                <p className="text-sm font-bold text-grey-900">
                  £{Math.round(pot.total)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewPots;
