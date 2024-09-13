"use client";

import { addToPot } from "@/store/fundsSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

const AddToPotModal = ({
  isVisible,
  name,
  target,
  total,
  theme,
  onChangeVisibility,
}) => {
  const [newAmount, setNewAmount] = useState(0);
  const percentageSaved = (total / target) * 100;
  const extraPercentageSaved = (+newAmount / target) * 100;
  const newPercentageSaved = ((total + +newAmount) / target) * 100;

  const dispatch = useDispatch();

  const handleConfirm = () => {
    dispatch(addToPot({ name, amount: +newAmount }));
    onChangeVisibility(false);
    setNewAmount(0);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#00000090] flex justify-center items-center z-20">
      <div className="w-[35rem] max-w-[90%] bg-white p-5 md:p-8 flex flex-col gap-5 rounded-xl">
        <div className="flex justify-between items-center">
          <h1 className="text-grey-900 text-[2rem] font-bold">
            Add to &lsquo;{name}&rsquo;
          </h1>
          <img
            src="/assets/images/icon-close-modal.svg"
            alt="close add money window"
            onClick={() => onChangeVisibility(false)}
            className="cursor-pointer"
          />
        </div>
        <p className="text-sm text-grey-500">
          Add money to your pot to keep it separate from your main balance. As
          soon as you add this money, it will be deducted from your current
          balance.
        </p>
        <div>
          <sdiv className="flex justify-between items-center mb-4">
            <p className="text-grey-500 text-sm">New Amount</p>
            <h2 className="text-grey-900 text-[2rem] font-bold">
              £
              {(total + +newAmount).toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </h2>
          </sdiv>
          <div className="w-full h-3 bg-beige-100 rounded mb-3">
            <div className="flex gap-[2px]">
              <div
                className="h-3 rounded-l"
                style={{
                  width: percentageSaved + "%",
                  backgroundColor: "#201F24",
                }}
              />
              <div
                className="h-3 rounded-r"
                style={{
                  width: extraPercentageSaved + "%",
                  backgroundColor: theme,
                }}
              />
            </div>
          </div>
          <div className="flex justify-between items-center mb-10">
            <p className="text-xs font-bold" style={{ color: theme }}>
              {newPercentageSaved.toFixed(1)}%
            </p>
            <p className="text-grey-500 text-xs">
              Target of £{target.toLocaleString()}
            </p>
          </div>
        </div>
        <div>
          <p className="text-grey-500 text-xs font-bold mb-1">Amount to Add</p>
          <input
            className="w-full flex-1 h-[2.8125rem] rounded-lg pl-12 border border-beige-500 relative"
            onChange={(e) => setNewAmount(e.target.value)}
          />
          <p className="relative -top-8 left-5 text-beige-500 text-sm">£</p>
          <button
            className="w-full h-[3.3125rem] bg-grey-900 text-white text-sm font-bold rounded-lg"
            onClick={handleConfirm}
          >
            Confirm Addition
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToPotModal;
