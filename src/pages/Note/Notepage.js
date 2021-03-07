import React, {useState, useContext, useEffect} from 'react'
import {DragDropContext, Droppable } from 'react-beautiful-dnd'
import './notespage.scss';
import Column from '../../components/column/Column'
import CategoriesModal from '../../components/categoriesModal/CategoriesModal'
import Modal from 'react-modal'
import { CategoriesContext } from '../../context/index';
import CreateNewCategory from "../../components/createNewCategory/CreateNewCategory";
import ExportCategories from "../../components/exportCategories/ExportCategories";
import {customStyles} from '../../helpers/modalStyles'

  
const NotePage = () => {
    const { boards, setBoards,getBoards, isOpen, setIsOpen} = useContext(CategoriesContext);

    useEffect(()=>{
        const fetchData = async () => {
            await getBoards();
          };
          fetchData();
        if (!boards){

            
        }
    },[])

    const onDragEnd = (result)=>{
        const {destination, source, draggableId, type} = result
        if(!destination){
            return;
        }

        if (destination.droppableId === source.droppableId 
            && destination.inde === source.index
            ) {
                return;
            }

        if (type === "column"){
            const newColumnOrder = Array.from(boards.columnOrder)
            newColumnOrder.splice(source.index, 1)
            newColumnOrder.splice(destination.index, 0, draggableId)

            const newState = {
                ...boards,
                columnOrder: newColumnOrder
            };
            setBoards(newState)
            return;
        }
        
            const start = boards.columns[source.droppableId];
            const finish = boards.columns[destination.droppableId];
            
            if (start === finish){
                const newTaskIds = Array.from(start.taskIds)
                newTaskIds.splice(source.index, 1);
                newTaskIds.splice(destination.index, 0, draggableId);

                const newColumn = {
                    ...start,
                    taskIds: newTaskIds, 
                }

                const newState = {
                    ...boards,
                    columns:{
                        ...boards.columns,
                        [newColumn.id]: newColumn
                    }
                }
                setBoards(newState);

                return;
            }

            const startTaskIds = Array.from(start.taskIds);
            startTaskIds.splice(source.index, 1);
            const newStart = {
                ...start,
                taskIds: startTaskIds
            }
            const finishTaskIds = Array.from(finish.taskIds);
            finishTaskIds.splice(destination.index, 0, draggableId);
            const newFinish = {
                ...finish,
                taskIds: finishTaskIds
            }  
            
            const newState = {
                ...boards,
                columns:{
                    ...boards.columns,
                    [newStart.id]: newStart,
                    [newFinish.id]: newFinish
                }
            }
            setBoards(newState);
            return;

            
        }
        return (
            <div className="app">
        <div className="container">
        {!isOpen?(
        <div className="app-button">
        <CreateNewCategory setIsOpen={setIsOpen} />
        <ExportCategories />
        </div>

        ):(null)}
            </div>

      {boards && !isOpen?(
        <div >

        <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-columns" isDropDisabled={true}  type="column" direction="horizontal">
            {
                (provided)=>{
                    return(
                    <div
                     className="container scroll" 
                     id="scroll-2"
                     
                 
                        ref = {provided.innerRef}
                        {...provided.droppableProps}    
                    >
                    {
                        boards.columnOrder.map((columnId, index)=> {
                        const column = boards.columns[columnId]
                        const tasks = column.taskIds && column.taskIds.map(taskId => boards.tasks[taskId])
                        return (<Column key={column.id} column={column} tasks={tasks} index={index} />)
                    }
            )}
                    {provided.placeholder}
                    </div>
                   
                )}
            }


        </Droppable>
        </DragDropContext>
        </div>
      ):(null)}
        <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles} onRequestClose={()=> setIsOpen(false)} >
            <CategoriesModal setIsOpen={setIsOpen} />
        </Modal>
    </div>
    )
}

export default NotePage