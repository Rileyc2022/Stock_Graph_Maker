import React from 'react';


function ExportButton({callback, color}){
    const handleClick = () => {
        // callback is the "setShouldExport" hook setter function from the Editor component
        // (ExportButton's parent)
        callback(true)
    }
    return(
        <div className="flex items-center justify-center m-5">
        <button className="export shadow font-medium w-60 leading-normal p-2 text-lg rounded-lg text-white" style={{backgroundColor: color}} onClick={handleClick}>Export</button>
        </div>
    )
}

export default ExportButton;