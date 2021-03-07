import React, {useState, useContext} from 'react'
import { CategoriesContext } from '../../context/index';
import InnerList from '../innerList/InnerList'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import './column.scss'

const Column = (props) => {
    const {column, tasks, index} = props

    return (
        <Draggable
            isDragDisabled={true}
            draggableId={column.id} 
            index={index}
            
        >
        {
            (provided)=>(
                <div
                    {...provided.draggableProps}
                   
                    ref = {provided.innerRef}
                >

<div className="board" id="scroll-1" 
// style={{maxHeight:'800px'
// // , overflowY:'auto'
// }}
>
    <div className="board__title"
         {...provided.dragHandleProps}
    >
    <div className='long-text'>

        {column.title}
    </div>
    
    </div>
    <Droppable droppableId={column.id} type="task">{
        (provided)=>{
            return(
            <div className="taskList"
            ref = {provided.innerRef}
            {...provided.droppableProps}
            >
                <InnerList tasks={tasks} column={column} />
                {provided.placeholder}
            </div>
        )}
    }
    </Droppable>
    
</div>
</div>
            )
        }
       
        </Draggable>
    )
}

export default Column