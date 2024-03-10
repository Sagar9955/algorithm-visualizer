import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function BubbleSortVisualizer() {
    const [data, setData] = useState([]);
    const [color, setColor] = useState([]);

    const handleDataChange = (event) => {
        setData(event.target.value.split(',').map(Number));
        setColor(new Array(event.target.value.split(',').length).fill('blue'));
    }

    const display = () => {
        return data.map((value, index) => (
            <div key={index} style={{height: value*10 + 'px', backgroundColor: color[index]}} className="bar">
                {value}
            </div>
        ));
    }

    const bubblesort = async () => {
        let colorCopy = [...color];
        for(let i = data.length; i >= 1; i--) {
            for(let j = 1; j <= i; j++) {
                if(data[j-1] > data[j]) {
                    let temp = data[j-1];
                    data[j-1] = data[j];
                    data[j] = temp;
                    colorCopy[j-1] = 'red';
                    colorCopy[j] = 'green';
                    setColor([...colorCopy]);
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    colorCopy[j-1] = 'blue';
                    colorCopy[j] = 'blue';
                    setColor([...colorCopy]);
                }
            }
        }
    }

    return (
        <div>
            <input id="data" onChange={handleDataChange} />
            <button id="display" onClick={display}>Display</button>
            <button id="sort" onClick={bubblesort}>Sort</button>
            <div id="visualizer">
                {display()}
            </div>
        </div>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <BubbleSortVisualizer />
    </React.StrictMode>,
    document.getElementById('root')
);
