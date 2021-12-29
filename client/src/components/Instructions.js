import React from 'react';
import '../index.css';

// Boring component just to keep things tidy
export default ()=>{
    return(
        <div className="flex justify-center align-center column">
            <div>
            <div className="text-xl text-center">Share an exciting stock using a beautiful graph!</div>
            <div className="text-xl text-center">Enter a ticker symbol to start.</div>
            </div>
        </div>
    );
}