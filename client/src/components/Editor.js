import React, {useEffect, useState} from 'react';
import Render from './Render';
import ColorPicker from './ColorPicker'
import FontPicker from './FontPicker'
import ExportButton from "./ExportButton";

// Editor component
// graphData prop path is Search -> App -> Editor -> Render -> Chart
function Editor({graphData}){

    // shouldExport gets switched by ExportButton
    // and switched off my Render
    const [shouldExport, setShouldExport] = useState(false)

    // Editor holds state of customizations
    const [borderColor, setBorderColor] = useState("#55E27C")
    const [backgroundColor, setBackgroundColor] = useState("white")
    const [graphColor, setGraphColor] = useState("#55E27C")
    const [largeTextColor, setLargeTextColor] = useState("#000000")
    const [smallTextColor, setSmallTextColor] = useState("#808080")

    // Editor also holds the small text font so it can accessed by both the 2nd fontpicker, and Charts
    // Chart uses smallTextFont for the axis labels
    const [smallTextFont, setSmallTextFont] = useState("Open Sans")
    const [renderSize, setRenderSize] = useState("4x")
    const [fileFormat, setFileFormat] = useState("PNG")


    // Callback function passed from Editor -> ColorPicker
    function getData(val){
        // Switch is used to determine what the color picker is responsible for
        // and set hook accordingly
        switch(val.name){
            case "Graph":
                console.log("set stroke")
                setGraphColor(val.color)
                break;
            case "Border":
                console.log("set border")
                setBorderColor(val.color)
                break;
            case "Background":
                console.log("set bg")
                setBackgroundColor(val.color)
                break;
            case "Large Text":
                console.log("set lg text color")
                setLargeTextColor(val.color)
                break;
            case "Small Text":
                console.log("set sm text color")
                setSmallTextColor(val.color)
                break;
        }
    }
        // Arrays used for mapping/templating (see jsx below)
        const leftColumnTools_Font = ["Large Text", "Small Text"]
        const leftColumnTools_Color = ["Border", "Background", "Graph", "Large Text", "Small Text"]
        const fileFormats = ["PNG", "JPG", "SVG"];
        const renderSizes = ["1x", "2x", "4x"]

        // App.css is used to customize FontPicker's color (it's an imported component)
        // therefore, it gets its color through a dynamic CSS variable
        useEffect(()=>{
            document.documentElement.style.setProperty(
                '--border-color',
                borderColor
              );
        },[borderColor])

        return(
            <>
            <div className="flex w-full justify-center items-center">
            <div className="editor-block flex justify-around border-2 border-gray-500 rounded-lg items-stretch">
            <div className="leftColumn w-80 flex flex-col justify-around">
            <div className="font-tools">
            <div className="mx-5 mb-1 text-subtext">Fonts</div>
            {
                leftColumnTools_Font.map((toolName)=>{
                    let id = toolName.replace(" ", "")
                    return(<div className="flex mx-5 mb-2 justify-between items-center"><span>{toolName}:</span><div className="shadow-xl"><FontPicker pickerId={id} sendUpNewFont={setSmallTextFont}/></div></div>)
                    
                })
            }
            </div>

            <div className="color-tools ">
            <div className="mx-5 mb-1 text-subtext">Colors</div>
            {
                leftColumnTools_Color.map((toolName)=>(
                    <div className="flex mx-5 mb-2 justify-between items-center"><span>{toolName}:</span><ColorPicker name={toolName} sendToEditor={getData} initColors = {{"Border": borderColor, "Background": backgroundColor, "Graph": graphColor, "Large Text": largeTextColor, "Small Text": smallTextColor}}/></div>
                ))
            }
            </div>
            {/* <div className="flex"><ColorPicker name="border" sendToEditor={getData}/></div>
                <div className="flex ml-3"><span className="mr-3">Stroke:</span><ColorPicker name="stroke" sendToEditor={getData}/></div> */}

          </div>
          <div className="middle">
          <Render graphData={graphData} shouldExport={shouldExport} setShouldExport={setShouldExport} fileFormat={fileFormat} renderSize={renderSize} borderColor={borderColor} backgroundColor={backgroundColor} graphColor={graphColor} largeTextColor={largeTextColor} smallTextColor={smallTextColor} graphFont={smallTextFont}/>
          </div>
          <div className="rightColumn w-80 flex flex-col justify-around">
            {/* <div className="ml-3 mr-3 mb-1 text-subtext">Export</div> */}
            <div className="export-tools">
            <div className="ml-5 mr-3 mb-1 text-subtext">Exporting</div>
            <div className="flex mx-5 mb-2 justify-between items-center">
                <span>Size:</span>
                <div className="sizes flex w-6/12 justify-between">
                {
                    renderSizes.map( size => {
                        return(
                        size == renderSize? 
                        <span className={"selected text-center"} onClick={()=>{setRenderSize(size)}} style={{color: borderColor, borderBottom: `2px solid ${borderColor}`}} >{size}</span>
                        :
                        <span className={"not-selected text-center"} onClick={()=>{setRenderSize(size)}} style={{color: borderColor}} >{size}</span>
                        )
                    })
                }
                </div>
                </div>
            <div className="flex mx-5 mb-2 justify-between items-center"><span>Format:</span>
            <div className="formats flex w-6/12 justify-between">
            {
                fileFormats.map( format => {
                    return(
                    format == fileFormat ? 
                    <span className={"selected text-center"} onClick={()=>{setFileFormat(format)}} style={{color: borderColor, borderBottom: `2px solid ${borderColor}`}} >{format}</span>
                    :
                    <span className={"not-selected text-center"} onClick={()=>{setFileFormat(format)}} style={{color: borderColor}} >{format}</span>
                    )
                })
            }
            </div>
            </div>

            {/* <div className="mx-3 mb-3">Size</div><SizePicker callback={getSize}/> */}
            </div>
            {/* <div className="flex mx-3 mb-2 justify-between items-center"><span>{toolName}:</span><ColorPicker name={toolName} sendToEditor={getData}/></div> */}

            <ExportButton callback={setShouldExport} color={borderColor}/>
          </div>
          </div>
          </div>
          </>
        )
}

export default Editor