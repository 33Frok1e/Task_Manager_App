import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import boardIcon from "../assets/icon-board.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import darkIcon from "../assets/icon-dark-theme.svg";
import { Switch } from "@headlessui/react";
import useDarkMode from '../Hooks/useDarkMode';
import boardsSlice, { setBoardActive } from '../Redux/boardsSlice'

function HeaderDropDown({ setOpenDropdown, setIsBoardModalOpen }) {

  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  const dispatch = useDispatch()
  const boards = useSelector((state) => state.boards);

  const handleCloseDropdown = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    setOpenDropdown(false);
  };

  return (
    <div
      onClick={handleCloseDropdown}
      className="py-10 px-6 absolute left-0 right-0 bottom-[-100vh] top-16 bg-[#00000080]"
    >
      <div className="bg-white dark:bg-[#2b2c37] shadow-md shadow-[#364e7e1a] w-full py-4 rounded-xl">
        <h3 className="text-gray-600 dark:text-gray-300 font-semibold mx-4 mb-8">
          All Boards ({boards?.length})
        </h3>

        {boards.map((board, index) => (
          <div
            onClick={() => {
              dispatch(setBoardActive({ index }));
            }}
            key={index}
            className={`flex items-baseline cursor-pointer dark:text-white space-x-2 px-5 py-4 ${
              board.isActive && "bg-[#635fc7] rounded-r-full mr-8 text-white"
            }`}
          >
            <img src={boardIcon} className="h-4" />
            <p className="font-bold text-lg">{board.name}</p>
          </div>
        ))}

        <div 
          className="flex items-baseline cursor-pointer space-x-2 py-4 px-5 text-[#635fc7]"
          onClick={() => {
            setIsBoardModalOpen(true);
            setOpenDropdown(false);
          }}
        >
          <img src={boardIcon} className="h-4" />
          <p className="font-bold text-lg">Create New Board</p>
        </div>

        <div className="mx-2 p-4 space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg">
          <img src={lightIcon} alt="" />

          <Switch
            checked={darkSide}
            onChange={toggleDarkMode}
            className={`${
              darkSide ? "bg-[#635fc7]" : "bg-gray-200"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Enable notifications</span>
            <span
              className={`${
                darkSide ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>

          <img src={darkIcon} alt="" />
        </div>
      </div>
    </div>
  );
}

export default HeaderDropDown;
