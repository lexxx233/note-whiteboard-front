import React from 'react'
import {Draggable} from 'react-beautiful-dnd'
import './taskList.scss'
import NoteContent from '../noteContent/NoteContent'

const TaskList = (props) => {
    const {task, index} = props
    return (
        <Draggable 
            draggableId={task.id} 
            index={index}
            isDragDisabled={false}
            >
        {
            (provided, snapshot)=>{
                return(
                <div className={snapshot.isDragging ?"testDrag":"item"}
                {...provided.draggableProps}
                
                ref = {provided.innerRef}
                // isDragging={snapshot.isDragging}
                >
                <div {...provided.dragHandleProps} className="dragHeader" ></div>
                    
                <NoteContent task={task} />
                </div>
            )}
        }
            
        </Draggable>
    )
}

export default TaskList