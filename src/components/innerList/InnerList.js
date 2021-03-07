import React, {useContext} from 'react'
import TaskList from '../taskList/TaskList'
import { CategoriesContext } from '../../context/index';
import './innerList.scss'
import ReactTooltip from 'react-tooltip'


const InnerList = (props) => {
    const {tasks, column} = props
    const { boards, setBoards,createNote, columnDelete } = useContext(CategoriesContext);

    const addHandler = async(e)=>{

        const categoryId = {
            CategoryId: column.id.split('CategoryId')[1],
            path:''
        }
        try{
             await createNote(categoryId)


        } catch(err){
            return;
        }
    }

    const deleteHandler = async()=>{
        try{

            const newId =  column.id.split('CategoryId')[1]
            await columnDelete(newId, column.id)
        } catch(err){
            return;
        }
    }
    return (
        <div>

        <div>
             {tasks.map((task,index) => <TaskList key={task.id} task={task} index={index} />)}
        </div>
        <div className="line" />
            <div className="button-container">

            <button 
            onClick={addHandler}
            style={{margin:"5px 0 5px 10px"}}
            className="btn-floating btn-large waves-effect waves-light blue small list-button">
                <i 
                className="material-icons"
                data-tip="Add a new note">

                add</i>
            </button>
            <button 
            data-tip="Delete this category"
            onClick={deleteHandler}
            style={{margin:"5px 10px 5px 0"}}
            className="btn-floating btn-large waves-effect waves-light red small list-button">
                <i className="material-icons">delete</i>
            </button>
            </div>
            <ReactTooltip />

        </div>
    )
}

export default InnerList