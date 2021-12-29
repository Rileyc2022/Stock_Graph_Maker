import React, { Component } from "react";
import FontPicker from "font-picker-react";

// Class component!
export default class FontPickerContainer extends Component {
    // State is stored in this.state instead of hooks
    constructor(props) {
        super(props);
        this.state = {
            pickerId: props.pickerId,
            activeFontFamily: "Open Sans",
            // Callback to send font to Editor
            sendUpNewFont: props.sendUpNewFont
        };
    }
 
    render() {
        return (
            <div>
                <FontPicker  
                    // TODO: Limit API KEY in google console to domain
                    apiKey={process.env.REACT_APP_GOOGLE_FONTS}
                    pickerId={this.state.pickerId}
                    activeFontFamily={this.state.activeFontFamily}
                    disableAlpha={true}
                    onChange={(nextFont) =>{
                        this.setState({
                            activeFontFamily: nextFont.family,
                        })
                        // Getting font from FontPicker to Chart:
                        // You have to find the shared parent, here it's Editor
                        // Editor -> Render -> Chart
                        // Editor -> FontPicker
                        // So, up it goes!
                        if(this.state.pickerId == "SmallText"){
                            this.state.sendUpNewFont(this.state.activeFontFamily)
                        }
                        }
                    }
                />
                {/* <p className="apply-font">The font will be applied to this text.</p> */}
            </div>
        );
    }
}
