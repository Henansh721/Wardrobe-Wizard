import React from "react";

type Props = {
  headerText: string;
  tileText: any;
  descriptionText: string;
  placeHolderText: string;
  inputType: string;
  setter: Function;
};

export default function InfoTile(props: Props) {
  const [editBtn, setEditBtn] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>(props.tileText);

  return (
    <React.Fragment>
      <div
        className={`relative flex flex-col w-[95%] md:w-[90%] p-4 rounded-lg bg-blue-50 mx-auto`}
      >
        <div
          className={`realtive flex flex-row justify-between mb-1 align-middle `}
        >
          <div
            className={`relative flex justify-center align-middle items-center text-left text-xl font-sans`}
          >
            {props.headerText}
          </div>
          <div
            onClick={() => {
              if (editBtn) {
                setInputValue(props.tileText);
                props.setter(props.tileText);
              }
              setEditBtn(!editBtn);
            }}
            className={`relative flex items-center p-1 rounded-3xl bg-slate-400 ${
              editBtn ? `px-3` : "px-5"
            } py-1 text-white cursor-pointer text-sm font-medium`}
          >
            {editBtn ? "Cancel" : inputValue.length === 0 ? "Add" : "Edit"}
          </div>
        </div>
        {!editBtn && (
          <div className={`text-lg text-gray-500`}>
            {inputValue.length === 0 ? "✹ Not provided ✹" : inputValue}
          </div>
        )}
        {editBtn && (
          <div className={`relative flex flex-col w-full`}>
            <div className={`relative flex text-md text-gray-500 font-light`}>
              {props.descriptionText}
            </div>
            <div className={`relative flex my-6`}>
              <input
                className={`py-4 px-3 rounded-lg border border-gray-400 text-lg w-full md:w-[80%] xl:[60%]`}
                type={props.inputType}
                name="email"
                placeholder={props.placeHolderText}
                value={inputValue}
                onChange={(val) => {
                  setInputValue(val.target.value);
                  props.setter(val.target.value);
                }}
              />
            </div>
            <div
              onClick={() => {
                setEditBtn(false);
              }}
              className={`relative flex w-fit py-2 px-7 rounded-lg bg-black text-white font-medium text-lg cursor-pointer`}
            >
              Save
            </div>
          </div>
        )}
        {/* <div className={`mt-8 border-[1px] bg-gray-300`} /> */}
      </div>
    </React.Fragment>
  );
}
