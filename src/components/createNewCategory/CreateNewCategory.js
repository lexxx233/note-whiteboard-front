import React from 'react'

const CreateNewCategory = (props) => {
    const {setIsOpen} = props
    return (
        <button style={{marginRight:'1.5em'}}
         className="waves-effect waves-light btn-small red" 
         onClick={()=>setIsOpen(true)}>
         Create new category</button>
    )
}

export default CreateNewCategory