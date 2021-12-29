import React, {useEffect, useState} from 'react';
import {ChromePicker } from 'react-color';
import reactCSS from 'reactcss';

function ColorPicker({name, sendToEditor, initColors}){

    // ColorPicker's starting color should be the
    // the "intial color" that corresponds with its name
    const startColor = initColors[name]

    // Hooks for set color and displaying popup
    const[color, setColor] = useState(startColor)
    const[displayColorPicker, setDisplay] = useState("")

    // Event callbacks
    const handleClick = () => {
      setDisplay(!displayColorPicker)
    };
  
    const handleClose = () => {
        setDisplay(false)
    };
  
    const handleChange = (color) => {
        setColor(color.hex)
    };

    // Editor needs new color if it changes
    useEffect(()=>{
      sendToEditor({name, color})
    }, [color])

    // Easier than Tailwind here
    const styles = reactCSS({
      'default': {
        color: {
          width: '25px',
          height: '25px',
          borderRadius: '2px',
          background: color,
        },
        swatch: {
          padding: '1px',
          background: '#fff',
          borderRadius: '3px',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });
    return(
      <div>
        <div className="shadow" style={ styles.swatch } onClick={handleClick }>
          <div style={ styles.color } />
        </div>
        {displayColorPicker ?
        <div style={ styles.popover }>
        <div style={ styles.cover } onClick={handleClose }/>
            <ChromePicker color={ color } onChange={handleChange } />
        </div>
        : null }

      </div>
    );
}

export default ColorPicker