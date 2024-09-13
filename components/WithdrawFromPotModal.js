"use client";

import { addToPot, withdrawFromPot } from "@/store/fundsSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

const WithdrawFromPotModal = ({
  isVisible,
  name,
  target,
  total,
  theme,
  onChangeVisibility,
}) => {
  const [newAmount, setNewAmount] = useState(0);
  const percentageSaved = (total / target) * 100;
  const percentageWithdrawn = (+newAmount / target) * 100;
  const newPercentageSaved = ((total - +newAmount) / target) * 100;

  const dispatch = useDispatch();

  const handleConfirm = () => {
    dispatch(withdrawFromPot({ name, amount: +newAmount }));
    onChangeVisibility(false);
    setNewAmount(0);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#00000090] flex justify-center items-center z-20">
      <div className="w-[35rem] max-w-[90%] bg-white p-5 xl:p-8 flex flex-col gap-5 rounded-xl">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-grey-900 text-[2rem] font-bold">
            Withdraw from &lsquo;{name}&rsquo;
          </h1>
          <img
            src="/assets/images/icon-close-modal.svg"
            alt="close withdraw money window"
            onClick={() => onChangeVisibility(false)}
            className="cursor-pointer"
          />
        </div>
        <p className="text-sm text-grey-500">
          Withdraw from your pot to put money back in your main balance. This
          will reduce the amount you have in this pot.
        </p>
        <div>
          <sdiv className="flex justify-between items-center mb-4">
            <p className="text-grey-500 text-sm">New Amount</p>
            <h2 className="text-grey-900 text-[2rem] font-bold">
              £
              {(total - +newAmount).toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </h2>
          </sdiv>
          <div className="w-full h-3 bg-beige-100 rounded mb-3">
            <div className="flex gap-[2px]">
              <div
                className="h-3 rounded-l"
                style={{
                  width: newPercentageSaved + "%",
                  backgroundColor: "#201F24",
                }}
              />
              <div
                className="h-3 rounded-r bg-red"
                style={{
                  width: percentageWithdrawn + "%",
                }}
              />
            </div>
          </div>
          <div className="flex justify-between items-center mb-10">
            <p className="text-xs font-bold text-red">
              {newPercentageSaved.toFixed(1)}%
            </p>
            <p className="text-grey-500 text-xs">
              Target of £{target.toLocaleString()}
            </p>
          </div>
        </div>
        <div>
          <p className="text-grey-500 text-xs font-bold mb-1">
            Amount to Withdraw
          </p>
          <input
            className="w-full h-[2.8125rem] rounded-lg pl-12 border border-beige-500 relative"
            onChange={(e) => setNewAmount(e.target.value)}
          />
          <p className="relative -top-8 left-5 text-beige-500 text-sm">£</p>
          <button
            className="w-full h-[3.3125rem] bg-grey-900 text-white text-sm font-bold rounded-lg"
            onClick={handleConfirm}
          >
            Confirm Withdrawal
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawFromPotModal;
