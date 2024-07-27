import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import Column from "./Column";
import EmptyBoard from "./EmptyBoard";
import AddEditBoardModal from "./Modals/AddEditBoardModal";

function Center() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowSize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowSize);

    return () => {
      window.removeEventListener("resize", handleWindowSize);
    };
  });

  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;

  return (
    <div
      className={
        windowSize[0] >= 768 && isSideBarOpen
          ? " bg-[#f4f7fd] scrollbar-hide h-screen flex dark:bg-[#20212c] overflow-x-scroll gap-6  ml-[261px]"
          : "bg-[#f4f7fd] scrollbar-hide h-screen flex dark:bg-[#20212c] overflow-x-scroll gap-6"
      }
    >
      {windowSize[0] >= 768 && <Sidebar isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen} />}

      {/* Column Section */}
      {columns.length > 0 ? (
        <>
          {columns.map((col, index) => (
            <Column key={index} colIndex={index} />
          ))}

          <div onClick={() => {
            setIsBoardModalOpen(true);
          }} className="h-screen dark:bg-[#2b2c3740] flex justify-center items-center font-bold text-2xl hover:text-[#635FC7] transition duration-300 cursor-pointer bg-[#E9EFFA] scrollbar-hide mb-2   mx-5 pt-[90px] min-w-[280px] text-[#828FA3] mt-[135px] rounded-lg">
            + New Column
          </div>
        </>
      ) : (
        <>
          <EmptyBoard type="edit" />
        </>
      )}
      {isBoardModalOpen && (
        <AddEditBoardModal
          type="edit"
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
}

export default Center;
