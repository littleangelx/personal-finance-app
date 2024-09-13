import { useState } from "react";
import ColorTheme from "./ColorTheme";
import { useDispatch } from "react-redux";
import { addPot } from "@/store/fundsSlice";

const AddNewPotModal = ({ isVisible, onChangeVisibility }) => {
  const [potName, setPotName] = useState("");
  const [target, setTarget] = useState("");
  const [theme, setTheme] = useState("");
  const [charactersLeft, setCharactersLeft] = useState(30);

  const dispatch = useDispatch();

  const handleChangeTheme = (e) => {
    setTheme(e);
  };

  const handleAddPot = () => {
    dispatch(addPot({ name: potName, target, theme }));
    onChangeVisibility(false);
    setPotName("");
    setTarget("");
    setTheme("#277C78");
    setCharactersLeft(30);
  };

  if (!isVisible) return null;
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#00000090] flex justify-center items-center z-20 ">
      <div className="w-[35rem] bg-white p-5 md:p-8 flex flex-col rounded-xl max-w-[90%]">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-grey-900 text-[2rem] font-bold">Add New Pot</h1>
          <img
            src="/assets/images/icon-close-modal.svg"
            alt="close add pot window"
            onClick={() => onChangeVisibility(false)}
            className="cursor-pointer"
          />
        </div>
        <p className="text-sm text-grey-500 mb-5">
          Create a pot to set savings targets. These can help keep you on track
          as you save for special purchases.
        </p>
        <div className="flex flex-col gap-1 mb-4">
          <p className="text-grey-500 text-xs font-bold">Pot Name</p>
          <input
            className="w-full h-[2.8125rem] rounded-lg pl-4 border border-beige-500 relative"
            onChange={(e) => {
              setCharactersLeft(30 - e.target.value.length);
              setPotName(e.target.value);
            }}
            maxLength={30}
          />
          <p
            className={`text-xs self-end ${
              charactersLeft === 0 ? "text-red" : "text-grey-500"
            }`}
          >
            {charactersLeft} characters left
          </p>
        </div>
        <div>
          <p className="text-grey-500 text-xs font-bold mb-1">Target</p>
          <input
            className="w-full h-[2.8125rem] rounded-lg pl-12 border border-beige-500 relative"
            onChange={(e) => setTarget(+e.target.value)}
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

export default AddNewPotModal;
