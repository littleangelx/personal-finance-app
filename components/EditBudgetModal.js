import { useState } from "react";
import ColorTheme from "./ColorTheme";
import { useDispatch, useSelector } from "react-redux";
import { addBudget, addPot, editBudget } from "@/store/fundsSlice";
import Select from "react-select";

const EditBudgetModal = ({
  isVisible,
  onChangeVisibility,
  id,
  category,
  maximum,
  theme,
}) => {
  const [newMaximum, setNewMaximum] = useState(maximum);
  const [newTheme, setNewTheme] = useState(theme);

  const dispatch = useDispatch();

  const existingColors = useSelector((state) => state.fundsReducer.budgets).map(
    (item) => item.theme.value
  );

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

  const handleEditBudget = () => {
    dispatch(editBudget({ id, maximum: newMaximum, theme: newTheme }));
    onChangeVisibility(false);
  };

  if (!isVisible) return null;
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#00000090] flex justify-center items-center z-20 ">
      <div className="w-[35rem] bg-white p-5 md:p-8 flex flex-col rounded-xl max-w-[90%]">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-grey-900 text-[2rem] font-bold">
            Edit {category} Budget
          </h1>
          <img
            src="/assets/images/icon-close-modal.svg"
            alt="close add pot window"
            onClick={() => onChangeVisibility(false)}
            className="cursor-pointer"
          />
        </div>
        <p className="text-sm text-grey-500 mb-5">
          As your budgets change, feel free to update your spending limits.
        </p>

        <div>
          <p className="text-grey-500 text-xs font-bold mb-1">Maximum Spend</p>
          <input
            className="w-full h-[2.8125rem] rounded-lg pl-12 border border-beige-500 relative"
            onChange={(e) => setNewMaximum(+e.target.value)}
            defaultValue={newMaximum.toFixed(2)}
          />
          <p className="relative -top-8 left-5 text-beige-500 text-sm">£</p>
        </div>
        <div>
          <p className="text-grey-500 text-xs font-bold mb-1">Theme</p>
          <Select
            options={COLOUR_OPTIONS}
            styles={customStyles}
            isOptionDisabled={(option) => option.disabled}
            menuPosition="fixed"
            onChange={(e) => setNewTheme(e.value)}
          />
        </div>
        <button
          className="mt-5 w-full h-[3.3125rem] bg-grey-900 text-white text-sm font-bold rounded-lg"
          onClick={handleEditBudget}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditBudgetModal;
