"use client";

const SmallScreenMenu = ({ options, onSelect }) => {
  return (
    <div
      className="flex flex-col gap-6 w-32 py-3 px-5 bg-white "
      style={{ boxShadow: "0 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
    >
      {options.map((option) => (
        <div key={option} onClick={() => onSelect(option)}>
          <p className=" text-grey-900 text-sm border-b-[#f2f2f2] last:border-b-0">
            {option}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SmallScreenMenu;
