import React, {useState, useContext} from 'react'
import './modal.scss';
import { CategoriesContext } from '../../context/index';

const CategoriesModal = (props) => {
    const {setIsOpen} = props
    const { boards, setBoards,creatyCategory } = useContext(CategoriesContext);
    const [category, setCategory] = useState('')


    const inputHandler=(e)=>{
        setCategory(e.target.value)
    }

    
    const submitHanlder = async(e)=>{
        e.preventDefault();
    
        
        try{
            const newState = boards;
            const data = {
                title:category
            }
            const res = await creatyCategory(data);
            const newColumn = 'column-'+(boards.columnOrder.length + 1)
            const newColumns = {
                id: newColumn, title:'test', taskIds:[]
            }
            newState.columns[newColumn] = newColumns;
            newState.columnOrder.push(newColumn);
            setBoards(newState);
            setIsOpen(false);
            return;
          } catch (error) {
          }
         
    }
    return (
        <div className="modalApp">
            
            <div id="form-section">
            <h4>Create new categories</h4>

                <form onSubmit={submitHanlder}>
                <div className="input-field mb-1">
                    <input placeholder="categories" name="category"  onChange={inputHandler}/>
                </div>
                <div className="button-group">
                    <button type="submit" >Create</button>
                    <button className="button-close" onClick={()=>setIsOpen(false)}>Close</button>
                </div>
                </form>
            </div>
        </div>
    )
}

export default CategoriesModal