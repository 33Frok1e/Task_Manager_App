import React, { useState } from 'react'
import Header from './Components/Header'
import Center from './Components/Center'
import { useDispatch, useSelector } from 'react-redux'
import { setBoardActive } from './Redux/boardsSlice'
import EmptyBoard from './Components/EmptyBoard'

function App() {

  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false)

  const dispatch = useDispatch()
  const boards = useSelector(state => state.boards)
  const activeBoard = boards.find(board => board.isActive)
  if(!activeBoard && boards.length > 0) {
    dispatch(setBoardActive({index: 0}))
  }

  return (
    <>
    
    {boards.length > 0 ? (
      <div>
        {/* Header Section */}
        <Header isBoardModalOpen={isBoardModalOpen} setIsBoardModalOpen={setIsBoardModalOpen} />

        {/* Center Section */}
        <Center />
      </div>
    ) : (<EmptyBoard type='add' />) }
    
    </>
  )
}

export default App