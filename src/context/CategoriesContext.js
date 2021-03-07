/* eslint-disable import/extensions */
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CategoriesContext = createContext();

export const CategoriesContextProvider = (props) => {
    const [boards, setBoards] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const creatyCategory = async (data) => {
        const response = await axios.post(`${process.env.REACT_APP_API_URI}/category`, {
            ...data,
          });
          if (response) {
              getBoards()
          }
      };
      const editCategory = async(data) =>{
          const response = await axios.put(`${process.env.REACT_APP_API_URI}/category`, {
              ...data,
            });
            if (response) {
                getBoards()
            }
        }
        
        const getBoards = async()=>{
            const response = await axios.get(
                `${process.env.REACT_APP_API_URI}/category`);
                if (response) {
                    setBoards(response.data);
                    
                    return response;
                }
            }
            
            const createNote = async(data)=>{
                const response = await axios.post(`${process.env.REACT_APP_API_URI}/note`, {
                    ...data,
                });
                if (response) {
                    //   const note = response.data
                    getBoards()
                    return response.data;
                }
            }
            
            const editNote = async(data)=>{
                try{                    
                    const response = await axios.put(`${process.env.REACT_APP_API_URI}/note`, {
                        ...data,
                });
                if (data.isEdit){
                    return;
                }
                await getBoards()
            } catch(err){
                return;
            }
      }

      const deleteNote = async ( id) => {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_URI}/note/${id}`
        );
        if (response) {
            await getBoards()
          
        }

      };

      const columnDelete =async(id, columnId)=>{
        const response = await axios.delete(
            `${process.env.REACT_APP_API_URI}/category/${id}`
          );
          if (response){
            await getBoards()

          }

      }

 
      return (
        <CategoriesContext.Provider
          value={{
            boards,
            setBoards,
            creatyCategory,
            getBoards,
            createNote,
            editNote,
            deleteNote,
            columnDelete,
            editCategory,
            isOpen, 
            setIsOpen
          }}
        >
          {props.children}
        </CategoriesContext.Provider>
      );
}

