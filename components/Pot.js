import { useState } from "react";

import PotSaved from "./PotSaved";
import AddToPotModal from "./AddToPotModal";
import WithdrawFromPotModal from "./WithdrawFromPotModal";
import EditPotModal from "./EditPotModal";
import DeletePotModal from "./DeletePotModal";

const Pot = ({ id, name, target, total, theme }) => {
  const [addToPotVisible, setAddToPotVisible] = useState(false);
  const [withdrawFromPotVisible, setWithdrawFromPotVisible] = useState(false);
  const [editPotVisible, setEditPotVisible] = useState(false);
  const [deletePotVisible, setDeletePotVisible] = useState(false);
  const [showPotMenu, setShowPotMenu] = useState(false);

  console.log(theme);

  const handleAddToPotVisible = (value) => {
    setAddToPotVisible(value);
  };

  const handleWithdrawFromPotVisible = (value) => {
    setWithdrawFromPotVisible(value);
  };

  const handleEditPotVisible = (value) => {
    setEditPotVisible(value);
  };

  const handleDeletePotVisible = (value) => {
    setDeletePotVisible(value);
  };

  const handleShowPotMenu = (value) => {
    setShowPotMenu(value);
  };

  return (
    <div className="w-full flex flex-col gap-8 p-6 bg-white rounded-xl">
      <div className="w-full flex justify-between">
        <div className="flex gap-4 items-center">
          <div
            className={`w-4 h-4 rounded-full`}
            style={{ backgroundColor: theme.value }}
          />
          <h3 className="text-grey-900 text-xl font-bold">{name}</h3>
        </div>
        <div
          className="relative h-10 w-10 flex justify-center items-center cursor-pointer"
          onClick={() => setShowPotMenu((show) => !show)}
        >
          <img
            src="/assets/images/icon-ellipsis.svg"
            className="cursor-pointer absolute z-10"
          />
          {showPotMenu && (
            <div
              className="flex flex-col gap-3 py-3 px-5 bg-white absolute right-6 top-8 rounded-lg w-32"
              style={{ boxShadow: "0px 4px 24px 0px rgba(0, 0, 0, 0.25)" }}
            >
              <p
                className="text-grey-900 text-sm cursor-pointer"
                onClick={() => {
                  handleEditPotVisible(true);
                  handleShowPotMenu(false);
                }}
              >
                Edit Pot
              </p>
              <p
                className="text-red text-sm cursor-pointer"
                onClick={() => {
                  handleDeletePotVisible(true);
                  handleShowPotMenu(false);
                }}
              >
                Delete Pot
              </p>
            </div>
          )}
        </div>
      </div>
      <PotSaved total={total} target={target} theme={theme.value} />
      <div className="grid grid-cols-2 gap-4">
        <button
          className="bg-beige-100 rounded-lg text-grey-900 text-sm font-bold h-[3.3125rem]"
          onClick={() => handleAddToPotVisible(true)}
        >
          + Add Money
        </button>
        <button
          className="bg-beige-100 rounded-lg text-grey-900 text-sm font-bold h-[3.3125rem]"
          onClick={() => handleWithdrawFromPotVisible(true)}
        >
          Withdraw
        </button>
      </div>
      <AddToPotModal
        isVisible={addToPotVisible}
        name={name}
        target={target}
        total={total}
        theme={theme}
        onChangeVisibility={handleAddToPotVisible}
      />
      <WithdrawFromPotModal
        isVisible={withdrawFromPotVisible}
        name={name}
        target={target}
        total={total}
        theme={theme}
        onChangeVisibility={handleWithdrawFromPotVisible}
      />
      <EditPotModal
        isVisible={editPotVisible}
        id={id}
        name={name}
        target={target}
        theme={theme}
        onChangeVisibility={handleEditPotVisible}
        onChangeShowMenu={handleShowPotMenu}
      />
      <DeletePotModal
        isVisible={deletePotVisible}
        id={id}
        name={name}
        onChangeVisibility={handleDeletePotVisible}
        onChangeShowMenu={handleShowPotMenu}
      />
    </div>
  );
};

export default Pot;
