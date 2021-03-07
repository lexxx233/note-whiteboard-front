import React, {useState , useContext, useRef,useEffect} from 'react'
import { Whiteboard, EventStream, EventStore } from '@ohtomi/react-whiteboard'
import './content.scss'
import ReactTooltip from 'react-tooltip'
import { CategoriesContext } from '../../context/index';


const NoteContent = (props) => {
  const {task} = props
  const whiteboardContainer = useRef(null)
  const { boards, deleteNote,createNote, editNote } = useContext(CategoriesContext);
  const [more, setMore] = useState(false)
  let coords
  const [strDraw, setStrDraw] = useState((task&&task.path)||[])
  const [draw,setDraw] = useState({
    events: new EventStream(),
    eventStore: new EventStore(),
    width: 280,
    height: 150,
    style: {
      backgroundColor: 'lightyellow',
      cursor: 'pointer'
    }
  })
  
    const drawBoards = (task) =>{

      for (let i = 0; i < task.path.length / 2 ;i+=2 ){
        draw.events.pushPoint(task.path[i], [task.path[i+1]])
      }
      return;
    }
    useEffect(() => {
      if(task && task.path){
        const a = whiteboardContainer.current.querySelector('svg')
        a.innerHTML = task.path

      }

      // if (task && task.path && task.path.length > 0){
      //    drawBoards(task)
      
      // }
    }, [])
        
    const copyHandler = async()=>{
      const a = whiteboardContainer.current.querySelector('svg')
      const svg = a.innerHTML
      const newContent = {
        CategoryId: task.CategoryId,
        path: svg
    }
    await createNote(newContent)
    }
    const getPointsFromStore = (points) =>{
      const newPoints = []
      points.forEach((point)=>{
        if (point && point.point){
          newPoints.push(Math.ceil(point.point['x']), Math.ceil(point.point['y']))
        }
      } 
      )
      return newPoints
    }
      const saveHandler = async()=>{
       const a = whiteboardContainer.current.querySelector('svg')
        const svg = a.innerHTML
          const newData = {
            id: +task.id,
            path:svg,
            CategoryId: task.CategoryId
          }
        await editNote(newData)

      }
    const deleteHandler = async()=>{
      try{
        

        const id = +task.id
        await deleteNote(id)
      } catch(err){
        return;
      }

    }

    useEffect(()=>{
      coords = []
      draw.events.on("push",({x,y})=>{
        coords.push(x,y)
      })
    },[])


    

    return (
        <div ref={whiteboardContainer}>
        
        <div >

        <div className="action-btn" >

    <ul className="button-list">
<li><button className="btn-floating blue" onClick={saveHandler}><i data-tip="Save" className="material-icons">save</i></button></li>
<li><button className="btn-floating green" onClick={copyHandler}><i data-tip="Copy" className="material-icons">content_copy</i></button></li>
<li><button className="btn-floating red" onClick={deleteHandler}><i  data-tip="Delete" className="material-icons">delete</i></button></li>
</ul>
</div>

        </div>
            <Whiteboard
             events={draw.events} 
             width={draw.width} height={draw.height}
             style={draw.style}
             eventStore={draw.eventStore}
            

         />
         <ReactTooltip />
        </div>
         )
     }
    
export default NoteContent