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
    container.innerHTML = ''; // clear the container before displaying the pass
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    var pass = document.createElement('div');
    pass.classList.add('pass');
    pass.style.display = 'flex';
    pass.style.flexDirection = 'row';
    var passnum = document.createTextNode('Pass ' + passnumber);
    pass.appendChild(passnum);
    for (var i = 0; i < data.length; i++) {
        var bar = document.createElement('div');
        bar.style.height = data[i]*10 + 'px';
        bar.classList.add('bar');
        bar.textContent = data[i];
        pass.appendChild(bar);
    }
    container.appendChild(pass);
}

async function quickSort(data, start, end, passnumber) {
    if (start >= end) {
        return;
    }
    let index = await partition(data, start, end);
    displaypass(data.slice(), passnumber); // display the pass after partitioning
    await Promise.all([
        quickSort(data, start, index - 1, passnumber + 1),
        quickSort(data, index + 1, end, passnumber + 1)
    ]);
}

async function partition(data, start, end) {
    let pivotValue = data[end];
    let pivotIndex = start;
    for (let i = start; i < end; i++) {
        if (data[i] < pivotValue) {
            await swap(data, i, pivotIndex);
            pivotIndex++;
        }
    }
    await swap(data, pivotIndex, end);
    return pivotIndex;
}

async function swap(data, a, b) {
    await sleep(speed);
    let temp = data[a];
    data[a] = data[b];
    data[b] = temp;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.getElementById('sort').addEventListener('click', async function() {
    await quickSort(data, 0, data.length - 1, 1);
});
