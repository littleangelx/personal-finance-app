import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBudget, addPot } from "@/store/fundsSlice";
import Select from "react-select";

const AddNewBudgetModal = ({ isVisible, onChangeVisibility }) => {
  const [category, setCategory] = useState("");
  const [maximum, setMaximum] = useState("");
  const [theme, setTheme] = useState("");

  const dispatch = useDispatch();

  const existingCategories = useSelector(
    (state) => state.fundsReducer.budgets
  ).map((item) => item.category);

  const existingColors = useSelector((state) => state.fundsReducer.budgets).map(
    (item) => item.theme.value
  );

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
      disabled: existingCategories.includes("Entertainment"),
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
      disabled: existingCategories.includes("Bills"),
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
      disabled: existingCategories.includes("Groceries"),
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
      disabled: existingCategories.includes("Dining Out"),
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
      disabled: existingCategories.includes("Transportation"),
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
      disabled: existingCategories.includes("Personal Care"),
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
      disabled: existingCategories.includes("Education"),
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
      disabled: existingCategories.includes("Lifestyle"),
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
      disabled: existingCategories.includes("Shopping"),
    },
  ];

  const COLOUR_OPTIONS = [
    {
      value: "#277C78",
      label: (
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div
              className={`w-4 h-4 rounded-full ${
                existingColors.includes("#277C78") ? "bg-green/25" : "bg-green"
              }`}
            />
            <p
              className={`text-sm ${
                existingColors.includes("#277C78")
                  ? "text-grey-500/50"
                  : "text-grey-900"
              }`}
            >
              Green
            </p>
          </div>
          {existingColors.includes("#277C78") && (
            <p className="text-xs text-grey-500">Already used</p>
          )}
        </div>
      ),
      disabled: existingColors.includes("#277C78"),
    },
    {
      value: "#F2CDAC",
      label: (
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div
              className={`w-4 h-4 rounded-full ${
                existingColors.includes("#F2CDAC")
                  ? "bg-yellow/25"
                  : "bg-yellow"
              }`}
            />
            <p
              className={`text-sm ${
                existingColors.includes("#F2CDAC")
                  ? "text-grey-500/50"
                  : "text-grey-900"
              }`}
            >
              Yellow
            </p>
          </div>
          {existingColors.includes("#F2CDAC") && (
            <p className="text-xs text-grey-500">Already used</p>
          )}
        </div>
      ),
      disabled: existingColors.includes("#F2CDAC"),
    },
    {
      value: "#82C9D7",
      label: (
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div
              className={`w-4 h-4 rounded-full ${
                existingColors.includes("#82C9D7") ? "bg-cyan/25" : "bg-cyan"
              }`}
            />
            <p
              className={`text-sm ${
                existingColors.includes("#82C9D7")
                  ? "text-grey-500/50"
                  : "text-grey-900"
              }`}
            >
              Cyan
            </p>
          </div>
          {existingColors.includes("#82C9D7") && (
            <p className="text-xs text-grey-500">Already used</p>
          )}
        </div>
      ),
      disabled: existingColors.includes("#82C9D7"),
    },
    {
      value: "#626070",
      label: (
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div
              className={`w-4 h-4 rounded-full ${
                existingColors.includes("#626070") ? "bg-navy/25" : "bg-navy"
              }`}
            />
            <p
              className={`text-sm ${
                existingColors.includes("#626070")
                  ? "text-grey-500/50"
                  : "text-grey-900"
              }`}
            >
              Navy
            </p>
          </div>
          {existingColors.includes("#626070") && (
            <p className="text-xs text-grey-500">Already used</p>
          )}
        </div>
      ),
      disabled: existingColors.includes("#626070"),
    },
    {
      value: "#C94736",
      label: (
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div
              className={`w-4 h-4 rounded-full ${
                existingColors.includes("#C94736") ? "bg-red/25" : "bg-red"
              }`}
            />
            <p
              className={`text-sm ${
                existingColors.includes("#C94736")
                  ? "text-grey-500/50"
                  : "text-grey-900"
              }`}
            >
              Red
            </p>
          </div>
          {existingColors.includes("#C94736") && (
            <p className="text-xs text-grey-500">Already used</p>
          )}
        </div>
      ),
      disabled: existingColors.includes("#C94736"),
    },
    {
      value: "#826CB0",
      label: (
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div
              className={`w-4 h-4 rounded-full ${
                existingColors.includes("#826CB0")
                  ? "bg-purple/25"
                  : "bg-purple"
              }`}
            />
            <p
              className={`text-sm ${
                existingColors.includes("#826CB0")
                  ? "text-grey-500/50"
                  : "text-grey-900"
              }`}
            >
              Purple
            </p>
          </div>
          {existingColors.includes("#826CB0") && (
            <p className="text-xs text-grey-500">Already used</p>
          )}
        </div>
      ),
      disabled: existingColors.includes("#826CB0"),
    },
    {
      value: "#597C7C",
      label: (
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div
              className={`w-4 h-4 rounded-full ${
                existingColors.includes("#597C7C")
                  ? "bg-turquoise/25"
                  : "bg-turquoise"
              }`}
            />
            <p
              className={`text-sm ${
                existingColors.includes("#597C7C")
                  ? "text-grey-500/50"
                  : "text-grey-900"
              }`}
            >
              Turquoise
            </p>
          </div>
          {existingColors.includes("#597C7C") && (
            <p className="text-xs text-grey-500">Already used</p>
          )}
        </div>
      ),
      disabled: existingColors.includes("#597C7C"),
    },
    {
      value: "#AF81BA",
      label: (
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div
              className={`w-4 h-4 rounded-full ${
                existingColors.includes("#AF81BA") ? "bg-pink/25" : "bg-pink"
              }`}
            />
            <p
              className={`text-sm ${
                existingColors.includes("#AF81BA")
                  ? "text-grey-500/50"
                  : "text-grey-900"
              }`}
            >
              Pink
            </p>
          </div>
          {existingColors.includes("#AF81BA") && (
            <p className="text-xs text-grey-500">Already used</p>
          )}
        </div>
      ),
      disabled: existingColors.includes("#AF81BA"),
    },
    {
      value: "#BE6C49",
      label: (
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div
              className={`w-4 h-4 rounded-full ${
                existingColors.includes("#BE6C49")
                  ? "bg-orange/25"
                  : "bg-orange"
              }`}
            />
            <p
              className={`text-sm ${
                existingColors.includes("#BE6C49")
                  ? "text-grey-500/50"
                  : "text-grey-900"
              }`}
            >
              Orange
            </p>
          </div>
          {existingColors.includes("#BE6C49") && (
            <p className="text-xs text-grey-500">Already used</p>
          )}
        </div>
      ),
      disabled: existingColors.includes("#BE6C49"),
    },
  ];

  const handleChangeTheme = (e) => {
    setTheme(e);
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

  const handleAddBudget = () => {
    dispatch(addBudget({ category, maximum, theme }));
    setCategory("");
    setMaximum("");
    setTheme("");
    onChangeVisibility(false);
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
          <Select
            options={CATEGORIES}
            styles={customStyles}
            isOptionDisabled={(option) => option.disabled}
            onChange={(e) => setCategory(e.value)}
          />
        </div>
        <div>
          <p className="text-grey-500 text-xs font-bold mb-1">Maximum Spend</p>
          <div className="w-full flex-1 h-[2.8125rem] rounded-lg pl-5 border border-beige-500 relative flex items-center">
            <p className=" text-beige-500 text-sm">£</p>
            <input
              className="outline-none"
              onChange={(e) => setMaximum(+e.target.value)}
            />
          </div>
          <p className="relative -top-8 left-5 text-beige-500 text-sm">£</p>
        </div>
        <div>
          <p className="text-grey-500 text-xs font-bold mb-1">Theme</p>
          <Select
            options={COLOUR_OPTIONS}
            styles={customStyles}
            isOptionDisabled={(option) => option.disabled}
            menuPosition="fixed"
            onChange={(e) => setTheme(e.value)}
          />
        </div>
        <button
          className="mt-5 w-full h-[3.3125rem] bg-grey-900 text-white text-sm font-bold rounded-lg"
          onClick={handleAddBudget}
        >
          Add Budget
        </button>
      </div>
    </div>
  );
};

export default AddNewBudgetModal;
