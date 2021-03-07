import React from 'react'
import {saveAs} from 'file-saver'
import axios from 'axios'

const ExportCategories = () => {

    const  createAndDownloadPdf = async() => {
        try{
            const result = await axios.get(`${process.env.REACT_APP_API_URI}/generateReport`)
            if (result){
               const pdf = await axios.get(`${process.env.REACT_APP_API_URI}/fetch-pdf`, { responseType: 'blob' })
               const pdfBlob = new Blob([pdf.data], { type: 'application/pdf' });
              saveAs(pdfBlob, 'newPdf.pdf');
            }
        } catch(err){
            return;
        }
       
      }

    return (
        <div>

        <button 
        onClick={createAndDownloadPdf}
        className="waves-effect waves-light btn-small red">
            export
        </button>
            
        </div>

    )
}

export default ExportCategories