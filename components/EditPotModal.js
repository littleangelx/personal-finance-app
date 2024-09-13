import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ColorTheme from "./ColorTheme";
import { editPot } from "@/store/fundsSlice";

const EditPotModal = ({
  id,
  name,
  target,
  theme,
  isVisible,
  onChangeVisibility,
  onChangeShowMenu,
}) => {
  const [potName, setPotName] = useState(name);
  const [newTarget, setNewTarget] = useState(target);
  const [newTheme, setNewTheme] = useState(theme);
  const [charactersLeft, setCharactersLeft] = useState(30 - name.length);

  const dispatch = useDispatch();

  const handleChangeTheme = (e) => {
    setNewTheme(e);
  };

  const handleAddPot = () => {
    dispatch(
      editPot({ id, name: potName, target: newTarget, theme: newTheme })
    );
    onChangeVisibility(false);
    setCharactersLeft(30);
  };
  if (!isVisible) {
    return null;
  } else {
    onChangeShowMenu(false);
  }
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#00000090] flex justify-center items-center z-20">
      <div className="w-[35rem] max-w-[90%] bg-white p-5 md:p-8 flex flex-col gap-5 rounded-xl">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-grey-900 text-[2rem] font-bold">Edit Pot</h1>
          <img
            src="/assets/images/icon-close-modal.svg"
            alt="close add money window"
            onClick={() => onChangeVisibility(false)}
            className="cursor-pointer"
          />
        </div>
        <p className="text-sm text-grey-500">
          If your saving targets change, feel free to update your pots.
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
            value={potName}
          />
          <p
            className={`text-xs self-end ${
              charactersLeft === 0 ? "text-red" : "text-grey-500"
            }`}
          >
            {charactersLeft} out of 30 characters left
          </p>
        </div>
        <div>
          <p className="text-grey-500 text-xs font-bold mb-1">Target</p>
          <input
            className="w-full h-[2.8125rem] rounded-lg pl-12 border border-beige-500 relative"
            onChange={(e) => setNewTarget(+e.target.value)}
            value={newTarget}
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
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditPotModal;
