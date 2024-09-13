import { useState } from "react";
import ColorTheme from "./ColorTheme";
import { useDispatch, useSelector } from "react-redux";
import { addPot } from "@/store/fundsSlice";
import Select from "react-select";

const AddNewBudgetModal = ({ isVisible, onChangeVisibility }) => {
  const [category, setCategory] = useState("");
  const [maximum, setMaximum] = useState("");
  const [theme, setTheme] = useState("");

  const dispatch = useDispatch();

  const existingCategories = useSelector(
    (state) => state.fundsReducer.budgets
  ).map((item) => item.category);

  const CATEGORIES = [
    {
      value: "Entertainment",
      label: (
        <div className="flex justify-between items-center">
          <p
            className={`text-sm ${
              existingCategories.includes("Entertainment")
                ? "text-grey-500/50"
                : "text-grey-900"
            }`}
          >
            Entertainment
          </p>
          {existingCategories.includes("Entertainment") && (
            <p className="text-xs text-grey-500">Already used</p>
          )}
        </div>
      ),
    },
    {
      value: "Bills",
      label: (
        <div className="flex justify-between items-center">
          <p
            className={`text-sm ${
              existingCategories.includes("Bills")
                ? "text-grey-500/50"
                : "text-grey-900"
            }`}
          >
            Bills
          </p>
          {existingCategories.includes("Bills") && (
            <p className="text-xs text-grey-500">Already used</p>
          )}
        </div>
      ),
    },
    {
      value: "Groceries",
      label: (
        <div className="flex justify-between items-center">
          <p
            className={`text-sm ${
              existingCategories.includes("Groceries")
                ? "text-grey-500/50"
                : "text-grey-900"
            }`}
          >
            Groceries
          </p>
          {existingCategories.includes("Groceries") && (
            <p className="text-xs text-grey-500">Already used</p>
          )}
        </div>
      ),
    },
    {
      value: "Dining Out",
      label: (
        <div className="flex justify-between items-center">
          <p
            className={`text-sm ${
              existingCategories.includes("Dining Out")
                ? "text-grey-500/50"
                : "text-grey-900"
            }`}
          >
            Dining Out
          </p>
          {existingCategories.includes("Dining Out") && (
            <p className="text-xs text-grey-500">Already used</p>
          )}
        </div>
      ),
    },
    {
      value: "Transportation",
      label: (
        <div className="flex justify-between items-center">
          <p
            className={`text-sm ${
              existingCategories.includes("Transportation")
                ? "text-grey-500/50"
                : "text-grey-900"
            }`}
          >
            Transportation
          </p>
          {existingCategories.includes("Transportation") && (
            <p className="text-xs text-grey-500">Already used</p>
          )}
        </div>
      ),
    },
    {
      value: "Personal Care",
      label: (
        <div className="flex justify-between items-center">
          <p
            className={`text-sm ${
              existingCategories.includes("Personal Care")
                ? "text-grey-500/50"
                : "text-grey-900"
            }`}
          >
            Personal Care
          </p>
          {existingCategories.includes("Personal Care") && (
            <p className="text-xs text-grey-500">Already used</p>
          )}
        </div>
      ),
    },
    {
      value: "Education",
      label: (
        <div className="flex justify-between items-center">
          <p
            className={`text-sm ${
              existingCategories.includes("Education")
                ? "text-grey-500/50"
                : "text-grey-900"
            }`}
          >
            Education
          </p>
          {existingCategories.includes("Education") && (
            <p className="text-xs text-grey-500">Already used</p>
          )}
        </div>
      ),
    },
    {
      value: "Lifestyle",
      label: (
        <div className="flex justify-between items-center">
          <p
            className={`text-sm ${
              existingCategories.includes("Lifestyle")
                ? "text-grey-500/50"
                : "text-grey-900"
            }`}
          >
            Lifestyle
          </p>
          {existingCategories.includes("Lifestyle") && (
            <p className="text-xs text-grey-500">Already used</p>
          )}
        </div>
      ),
    },
    {
      value: "Shopping",
      label: (
        <div className="flex justify-between items-center">
          <p
            className={`text-sm ${
              existingCategories.includes("Shopping")
                ? "text-grey-500/50"
                : "text-grey-900"
            }`}
          >
            Shopping
          </p>
          {existingCategories.includes("Shopping") && (
            <p className="text-xs text-grey-500">Already used</p>
          )}
        </div>
      ),
    },
  ];

  const handleChangeTheme = (e) => {
    setTheme(e);
  };

  const handleAddPot = () => {
    dispatch(addPot({ name: potName, target, theme }));
    onChangeVisibility(false);
    setPotName("");
    setTarget("");
    setTheme("#277C78");
  };

  const handleChooseCategory = (value) => {
    setCategory(value);
  };

  const customStyles = {
    control: (styles) => ({
      ...styles,
      height: "2.8125rem",
      borderRadius: "0.5rem",
      borderColor: "#98908B",
      borderWidth: 1,
      paddingLeft: "1rem",
    }),
    menu: (styles) => ({
      ...styles,
    }),
  };

  if (!isVisible) return null;
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#00000090] flex justify-center items-center z-20 ">
      <div className="w-[35rem] bg-white p-5 md:p-8 flex flex-col rounded-xl max-w-[90%]">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-grey-900 text-[2rem] font-bold">
            Add New Budget
          </h1>
          <img
            src="/assets/images/icon-close-modal.svg"
            alt="close add pot window"
            onClick={() => onChangeVisibility(false)}
            className="cursor-pointer"
          />
        </div>
        <p className="text-sm text-grey-500 mb-5">
          Choose a category to set a spending budget. These categories can help
          you monitor spending.
        </p>
        <div className="flex flex-col gap-1 mb-4">
          <p className="text-grey-500 text-xs font-bold">Budget Category</p>
          <Select options={CATEGORIES} styles={customStyles} />
        </div>
        <div>
          <p className="text-grey-500 text-xs font-bold mb-1">Maximum Spend</p>
          <input
            className="w-full h-[2.8125rem] rounded-lg pl-12 border border-beige-500 relative"
            onChange={(e) => setMaximum(+e.target.value)}
          />
          <p className="relative -top-8 left-5 text-beige-500 text-sm">£</p>
        </div>
        <div>
          <p className="text-grey-500 text-xs font-bold mb-1">Theme</p>
          <ColorTheme onChangeTheme={handleChangeTheme} currentTheme={theme} />
        </div>
        <button
          className="mt-5 w-full h-[3.3125rem] bg-grey-900 text-white text-sm font-bold rounded-lg"
          onClick={handleAddPot}
        >
          Add Pot
        </button>
      </div>
    </div>
  );
};

export default AddNewBudgetModal;
