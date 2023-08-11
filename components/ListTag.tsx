import React, { useState } from "react";

type Props = {
  heading: string;
  listSetter: Function;
  type: string;
  placeholder: string;
};

const ListTag = (props: Props) => {
  const [list, setList] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim() !== "") {
      setList([...list, inputValue.trim()]);
      props.listSetter([...list, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemove = (index: number) => {
    const updatedList = [...list];
    updatedList.splice(index, 1);
    setList(updatedList);
    props.listSetter(updatedList);
  };

  return (
    <div
      className={`relative flex flex-col w-[95%] md:w-[90%] my-2 mx-auto p-2 bg-blue-50 rounded-lg`}
    >
      {list.length == 0 && (
        <div
          className={`relative flex justify-center items-center align-middle w-full text-center p-2 text-xl font-semibold bg-blue-200 rounded-md`}
        >
          No tags available for the product
        </div>
      )}
      {list && (
        <div
          className={`relative flex flex-col w-full max-h-40 overflow-y-scroll`}
        >
          {list.length > 0 && (
            <h2 className={`text-xl font-semibold`}>List of Product Tags</h2>
          )}
          <ul className={`relative flex flex-col w-full space-y-1`}>
            {list.map((item, index: number) => (
              <li
                key={index}
                className={`relative flex justify-between bg-slate-200 px-3 rounded-xl align-middle items-center`}
              >
                <span className="flex-1 p-1 truncate">{item}</span>
                <button
                  className={`p-2 bg-slate-300 rounded-full`}
                  onClick={() => handleRemove(index)}
                >
                  -
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className={`w-full h-[2px] bg-black my-2`} />
      <div className={`relative flex text-left text-xl font-sans`}>
        {props.heading}
      </div>
      <div className={`relative flex flex-row space-x-1`}>
        <div className={`relative flex flex-col my-1 w-full`}>
          <input
            className={`py-3 px-3 rounded-md border border-gray-400 hover:border-black text-lg w-full`}
            type={props.type}
            name="name"
            placeholder={props.placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div className={`relative my-auto`}>
          <button
            className={`p-2 rounded-lg bg-red-400 text-white mx-auto`}
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListTag;
