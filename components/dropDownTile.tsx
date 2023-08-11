import { Fragment, useState } from "react";

type Props = {
  header: string;
  optionList: string[];
  setter: Function;
};

export default function DropDownTile(props: Props) {
  const [selectedColor, setSelectedColor] = useState("");

  const handleColorChange = (event: any) => {
    setSelectedColor(event.target.value);
    props.setter(event.target.value);
  };
  return (
    <div
      className={`relative flex flex-col w-[95%] md:w-[90%] p-4 rounded-lg bg-blue-50 mx-auto`}
    >
      <div
        className={`relative flex justify-center align-middle items-center text-left text-xl font-sans`}
      >
        {props.header}
      </div>
      <select value={selectedColor} onChange={handleColorChange}>
        <option value="">-- {props.header} --</option>
        {props.optionList.map((val: string, index: number) => (
          <option key={index} value={val}>
            {val}
          </option>
        ))}
      </select>
      {selectedColor && (
        <p className={`relative w-full p-2 rounded-md bg-blue-100 mt-3`}>
          You selected:{" "}
          <p className={`text-xl font-semibold`}> {selectedColor}</p>
        </p>
      )}
    </div>
  );
}
