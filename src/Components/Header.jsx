import React, { useState } from "react";
import Logo from "../assets/logo-mobile.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import iconDown from "../assets/icon-chevron-down.svg";
import ellipsis from "../assets/icon-vertical-ellipsis.svg";
import HeaderDropDown from "./HeaderDropDown";
import AddEditBoardModal from "./Modals/AddEditBoardModal";
import { useDispatch, useSelector } from "react-redux";
import AddEditTaskModal from "./Modals/AddEditTaskModal";
import ElipsisMenu from "./ElipsisMenu";
import DeleteModal from "./Modals/DeleteModal";
import { deleteBoard, setBoardActive } from "../Redux/boardsSlice";

function Header({ setIsBoardModalOpen, isBoardModalOpen }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [boardType, setBoardType] = useState("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

  const onDropdownClick = () => {
    setOpenDropdown((state) => !state);
    setIsElipsisMenuOpen(false);
    setBoardType("add");
  };

  const setOpenEditModal = () => {
    setIsBoardModalOpen(true);
    setIsElipsisMenuOpen(false);
  };
  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      dispatch(deleteBoard());
      dispatch(setBoardActive({ index: 0 }));
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="p-4 fixed left-0 right-0 z-50 bg-white dark:bg-[#2b2c37]">
      <header className="flex items-center justify-between dark:text-white">
        {/* left side */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <img src={Logo} alt="Logo" className="w-6 h-6" />
          <h3 className="hidden md:inline-block font-bold font-sans md:text-2xl">
            Kanban
          </h3>
          <div className="flex items-center">
            <h3 className="truncate text-2xl font-bold font-sans max-w-[200px] md:ml-20">
              {board.name}
            </h3>
            <img
              onClick={onDropdownClick}
              src={openDropdown ? iconUp : iconDown}
              alt="Dropdown Icon"
              className="w-3 ml-2 md:hidden"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <button
            className=" button hidden md:block "
            onClick={() => {
              setIsTaskModalOpen((prevState) => !prevState);
            }}
          >
            + Add New Task
          </button>
          <button
            onClick={() => {
              setIsTaskModalOpen((prevState) => !prevState);
            }}
            className=" button py-1 px-3 md:hidden "
          >
            +
          </button>
          <img
            onClick={() => {
              setBoardType("edit");
              setOpenDropdown(false);
              setIsElipsisMenuOpen((prevState) => !prevState);
            }}
            src={ellipsis}
            alt="Ellipsis"
            className="cursor-pointer h-4"
          />
        </div>
      </header>

      {/* Elipsis Icon Menu */}
      {isElipsisMenuOpen && (
        <ElipsisMenu
          setOpenEditModal={setOpenEditModal}
          setOpenDeleteModal={setOpenDeleteModal}
          type="Boards"
        />
      )}

      {/* Dropdown */}
      {openDropdown && (
        <HeaderDropDown
          setOpenDropdown={setOpenDropdown}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}

      {/* Board Modal */}
      {isBoardModalOpen && (
        <AddEditBoardModal
          type={boardType}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}

      {/* Task Modal */}
      {isTaskModalOpen && (
        <AddEditTaskModal
          setIsTaskModalOpen={setIsTaskModalOpen}
          type="add"
          device="mobile"
        />
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          type="board"
          title={board.name}
          onDeleteBtnClick={onDeleteBtnClick}
        />
      )}
    </div>
  );
}

export default Header;
