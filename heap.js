var data = document.getElementById('data');
var heightAdjust = document.getElementById('height-adjust');
var speedAdjust = document.getElementById('speed-adjust');
var speed = speedAdjust.value;
var heightMultiply = heightAdjust.value;

heightAdjust.onchange = function() {
    heightMultiply = this.value;
}

speedAdjust.onchange = function() {
    speed = this.value;
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
    container.style.display ='flex';
    container.style.flexDirection='column';
    var pass = document.createElement('div');
    pass.classList.add('pass');
    pass.style.display='flex';
    pass.style.flexDirection='row';
    var passnum = document.createTextNode('Pass ' + passnumber);
    pass.appendChild(passnum);
    for (var i = 0; i < data.length; i++) {
        var bar = document.createElement('div');
        bar.style.height = data[i]*heightMultiply + 'px';
        bar.classList.add('bar');
        bar.textContent = data[i];
        pass.appendChild(bar);
    }
    container.appendChild(pass);
}

async function heapify(n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    let bars = document.querySelectorAll(".bar");

    // Color the largest bar red
    bars[i].style.backgroundColor = "red";

    if (left < n) {
        // Color the left child yellow
        bars[left].style.backgroundColor = "yellow";

        if (parseInt(bars[left].style.height) > parseInt(bars[largest].style.height))
            largest = left;
    }

    if (right < n) {
        // Color the right child orange
        bars[right].style.backgroundColor = "orange";

        if (parseInt(bars[right].style.height) > parseInt(bars[largest].style.height))
            largest = right;
    }

    if (largest != i) {
        await new Promise(resolve =>
            setTimeout(() => {
                let tempHeight = bars[i].style.height;
                bars[i].style.height = bars[largest].style.height;
                bars[largest].style.height = tempHeight;

                let tempContent = bars[i].textContent;
                bars[i].textContent = bars[largest].textContent;
                bars[largest].textContent = tempContent;

                let tempData = data[i];
                data[i] = data[largest];
                data[largest] = tempData;

                resolve();
            }, speed)
        );

        await heapify(n, largest);
    }
}

async function heapSort() {
    let n = data.length;
    let bars = document.querySelectorAll(".bar");

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        await new Promise(resolve =>
            setTimeout(() => {
                let tempHeight = bars[0].style.height;
                bars[0].style.height = bars[i].style.height;
                bars[i].style.height = tempHeight;

                let tempContent = bars[0].textContent;
                bars[0].textContent = bars[i].textContent;
                bars[i].textContent = tempContent;

                let tempData = data[0];
                data[0] = data[i];
                data[i] = tempData;

                resolve();
            }, speed)
        );

        // Color the sorted bar green
        bars[i].style.backgroundColor = "green";

        await heapify(i, 0);
        let dat = data.slice(); // Copy the data array
        displaypass(dat, n-i); // Display the pass
    }
}


document.getElementById('sort').addEventListener('click', async function() {
    await heapSort();
});
