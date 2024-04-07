var data = document.getElementById('data');
var heightAdjust = document.getElementById('height-adjust');
var speedAdjust = document.getElementById('speed-adjust');
var speed = speedAdjust.value;
var heightMultiply = heightAdjust.value;

heightAdjust.onchange = function() {
    heightMultiply.value
}

speedAdjust.onchange = function() {
    speed = this.value
}

document.getElementById('display').addEventListener('click', function() {
    data = data.value.split(',').map(Number);
    display(data);
});

function display(data) {
    var visualizer = document.getElementById('visualizer');
    visualizer.innerHTML = '';
    for (var i = 0; i < data.length; i++) {
        var bar = document.createElement('div');
        bar.style.height = data[i]*heightMultiply + 'px';
        bar.classList.add('bar');
        bar.textContent = data[i];
        visualizer.appendChild(bar);
    }
}

function displaypass(data, passnumber) {
    var container = document.getElementById('container');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    var pass = document.createElement('div');
    pass.classList.add('pass');
    pass.style.display = 'flex';
    pass.style.flexDirection = 'row';
    var passnum = document.createTextNode('Pass' + passnumber);
    pass.appendChild(passnum);
    for (var i = 0; i < data.length; i++) {
        var bar = document.createElement('div');
        bar.style.height = data[i]*10 + 'px';
        bar.classList.add('bar');
        bar.textContent = data[i];
        pass.appendChild(bar);
        container.appendChild(pass);
    }
}

async function selectionSort() {
    let bars = document.querySelectorAll(".bar");
    for(let i = 0; i < data.length; i++) {
        let minIndex = i;
        bars[minIndex].style.backgroundColor = "red";
        for(let j = i+1; j < data.length; j++) {
            bars[j].style.backgroundColor = "yellow";
            await new Promise(resolve =>
                setTimeout(() => {
                    resolve();
                }, speed)
            );
            if(parseInt(bars[j].style.height) < parseInt(bars[minIndex].style.height)) {
                bars[minIndex].style.backgroundColor = "blue";
                minIndex = j;
                bars[minIndex].style.backgroundColor = "red";
            } else {
                bars[j].style.backgroundColor = "blue";
            }
        }
        if(minIndex !== i) {
            await new Promise(resolve =>
                setTimeout(() => {
                    let tempHeight = bars[i].style.height;
                    bars[i].style.height = bars[minIndex].style.height;
                    bars[minIndex].style.height = tempHeight;

                    let tempContent = bars[i].textContent;
                    bars[i].textContent = bars[minIndex].textContent;
                    bars[minIndex].textContent = tempContent;

                    let tempData = data[i];
                    data[i] = data[minIndex];
                    data[minIndex] = tempData;

                    resolve();
                }, speed)
            );
        }
        bars[minIndex].style.backgroundColor = "blue";
        bars[i].style.backgroundColor = "green";
        bars = document.querySelectorAll(".bar"); // Update the bars after each pass
        let dat = data.slice(); // Copy the data array
        displaypass(dat, i+1); // Display the pass
    }
}

document.getElementById('sort').addEventListener('click', async function() {
    await selectionSort();
});
