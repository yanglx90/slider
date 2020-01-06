import React, {Component} from 'react';
import './App.css'
import Sliders from "./Sliders";

class App extends Component {


    render() {
        return (
            <div>
                <Sliders step={0.2}>
                    <div style={{background: '#c51434'}}>
                        page1
                    </div>
                    <div style={{background: '#36c52d'}}>
                        page2
                    </div>
                    <div style={{background: '#7268c5'}}>
                        page3
                    </div>
                </Sliders>
            </div>
        );
    }


}

export default App;