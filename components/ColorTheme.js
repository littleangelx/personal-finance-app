import Select from "react-select";

const COLOUR_OPTIONS = [
  {
    value: "#277C78",
    label: (
      <div className="flex gap-2 items-center">
        <div className="w-4 h-4 rounded-full bg-green" />
        <span>Green</span>
      </div>
    ),
  },
  {
    value: "#F2CDAC",
    label: (
      <div className="flex gap-2 items-center">
        <div className="w-4 h-4 rounded-full bg-yellow" />
        <span>Yellow</span>
      </div>
    ),
  },
  {
    value: "#82C9D7",
    label: (
      <div className="flex gap-2 items-center">
        <div className="w-4 h-4 rounded-full bg-cyan" />
        <span>Cyan</span>
      </div>
    ),
  },
  {
    value: "#626070",
    label: (
      <div className="flex gap-2 items-center">
        <div className="w-4 h-4 rounded-full bg-navy" />
        <span>Navy</span>
      </div>
    ),
  },
  {
    value: "#C94736",
    label: (
      <div className="flex gap-2 items-center">
        <div className="w-4 h-4 rounded-full bg-red" />
        <span>Red</span>
      </div>
    ),
  },
  {
    value: "#826CB0",
    label: (
      <div className="flex gap-2 items-center">
        <div className="w-4 h-4 rounded-full bg-purple" />
        <span className="text-sm text-grey-900">Purple</span>
      </div>
    ),
  },
];

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

const ColorTheme = ({ onChangeTheme, currentTheme }) => {
  return (
    <Select
      options={COLOUR_OPTIONS}
      onChange={(e) => onChangeTheme(e)}
      styles={customStyles}
      menuPosition="fixed"
    />
  );
};

export default ColorTheme;
