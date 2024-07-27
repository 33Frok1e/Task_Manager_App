import React, { useState } from 'react'
import { v4 as uuidv4} from 'uuid'
import crossIcon from '../../assets/icon-cross.svg'
import { useDispatch, useSelector } from 'react-redux';
// import boardsSlice from '../../Redux/boardsSlice'
import { addBoard, editBoard } from '../../Redux/boardsSlice';

function AddEditBoardModal({setIsBoardModalOpen, type}) {

  const [name, setName] = useState('')
  const [newColumns, setNewColumns] = useState([
    {name: 'To Do', tasks: [], id: uuidv4()},
    {name: 'Doing', tasks: [], id: uuidv4()}
  ])
  const [isValid, setIsValid] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const dispatch = useDispatch();
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );

  if (type === "edit" && isFirstLoad) {
    setNewColumns(
      board.columns.map((col) => {
        return { ...col, id: uuidv4() };
      })
    );
    setName(board.name);
    setIsFirstLoad(false);
  }

  const onChange = (id, newValue) => {
    setNewColumns((prevState) => {
      const newState = [...prevState];
      const column = newState.find((col) => col.id === id);
      column.name = newValue;
      return newState;
    });
  };

  const onDelete = (id) => {
    setNewColumns((prevState) => prevState.filter((el) => el.id !== id));
  }

  const validate = () => {
    setIsValid(false);
    if (!name.trim()) {
      return false;
    }
    for (let i = 0 ; i < newColumns.length ; i++) {
      if (!newColumns[i].name.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  const onSubmit = (type) => {
    setIsBoardModalOpen(false);
    if (type === "add") {
      dispatch(addBoard({ name, newColumns }));
    } else {
      dispatch(editBoard({ name, newColumns }));
    }
  };


  return (
    <div 
      className='fixed right-0 left-0 bottom-0 top-0 px-2 py-4 scrollbar-hide overflow-scroll flex justify-center items-center z-50 bg-[#00000080]'
      onClick={(e) => {
        if(e.target !== e.currentTarget) return;
        setIsBoardModalOpen(false);
      }}
    >
      {/* Modal Section */}
      <div className='scrollbar-hide overflow-y-scroll max-h-[95vh]  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold
      shadow-md shadow-[#364e7e1a] max-w-md mx-auto my-auto w-full px-8  py-8 rounded-xl'>
        <h3 className='text-lg'>{type === 'edit' ? 'Edit' : 'Add New'} Board</h3>

        {/* Task Name */}
        <div className='mt-8 flex flex-col space-y-3'>
          <label className='text-sm dark:text-white text-gray-500' >Board Name</label>
          <input type="text" id='board-name-input' placeholder='e.g FrontEnd Developer' className='bg-transparent  px-4 py-2 outline-none focus:border-0 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0'
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Board Column */}
        <div className='mt-8 flex flex-col space-y-3'>
          <label className='text-sm dark:text-white text-gray-600'>Board Column</label>
          {
            newColumns.map((column, index) => (
              <div key={column.id} className='flex items-center w-full'>

                <input type="text" className=' bg-transparent outline-none focus:border-0 flex-grow px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px]'
                value={column.name}
                onChange={(e) => onChange(column.id, e.target.value)}
                />
                <img src={crossIcon} className='cursor-pointer m-4' onClick={() => onDelete(column.id)} />

              </div>
            ))
          }
        </div>

        {/* Add columns */}
        <div>
          <button 
          onClick={() => {
            setNewColumns((state) => [
              ...state,
              {name: '', tasks: [], id: uuidv4()}
            ]);
          }}
          className='w-full items-center hover:opacity-75 dark:text-[#635fc7] dark:bg-white text-white bg-[#635fc7] mt-2 py-2 rounded-full'>
            + Add New Column
          </button>

          <button
          onClick={() => {
            const isValid = validate();
            if (isValid === true) onSubmit(type);
          }}
          className='w-full items-center mt-8 relative hover:opacity-75 dark:bg-[#635fc7] dark:text-white text-white bg-[#635fc7] py-2 rounded-full'
          >
            {type === 'add' ? 'Create New Board' : 'Save Changes'}
          </button>

        </div>
        
      </div>

    </div>
  )
}

export default AddEditBoardModal