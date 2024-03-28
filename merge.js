var dataInput = document.getElementById('data');
var heightAdjust = document.getElementById('height-adjust');
var speedAdjust = document.getElementById('speed-adjust');
var speed = speedAdjust.value;
var heightMultiply = heightAdjust.value;
var passNumber = 0;

heightAdjust.onchange = function() {
    heightMultiply = this.value;
}

speedAdjust.onchange = function() {
    speed = this.value;
}

document.getElementById('display').addEventListener('click', function() {
    data = dataInput.value.split(',').map(Number);
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

function displayPass(data, passNumber) {
    var container = document.getElementById('container');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    var pass = document.createElement('div');
    pass.classList.add('pass');
    pass.style.display = 'flex';
    pass.style.flexDirection = 'row';
    var passNum = document.createTextNode('Pass ' + passNumber);
    pass.appendChild(passNum);
    for (var i = 0; i < data.length; i++) {
        var bar = document.createElement('div');
        bar.style.height = data[i]*heightMultiply + 'px';
        bar.classList.add('bar');
        bar.textContent = data[i];
        pass.appendChild(bar);
    }
    container.appendChild(pass);
}

async function mergeSort(data) {
    if (data.length <= 1) {
        return data;
    }
    const middle = Math.floor(data.length / 2);
    const left = data.slice(0, middle);
    const right = data.slice(middle);
    return await merge(await mergeSort(left), await mergeSort(right));
}

async function merge(left, right) {
    let resultArray = [], leftIndex = 0, rightIndex = 0;
    let visualizer = document.getElementById('visualizer');
    let bars = visualizer.getElementsByClassName('bar');

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            resultArray.push(left[leftIndex]);
            bars[leftIndex].style.height = left[leftIndex]*heightMultiply + 'px';
            bars[leftIndex].textContent = left[leftIndex];
            leftIndex++;
        } else {
            resultArray.push(right[rightIndex]);
            bars[rightIndex + left.length].style.height = right[rightIndex]*heightMultiply + 'px';
            bars[rightIndex + left.length].textContent = right[rightIndex];
            rightIndex++;
        }
        await new Promise(resolve => setTimeout(resolve, speed));
    }

    while (leftIndex < left.length) {
        resultArray.push(left[leftIndex]);
        bars[leftIndex].style.height = left[leftIndex]*heightMultiply + 'px';
        bars[leftIndex].textContent = left[leftIndex];
        leftIndex++;
        await new Promise(resolve => setTimeout(resolve, speed));
    }

    while (rightIndex < right.length) {
        resultArray.push(right[rightIndex]);
        bars[rightIndex + left.length].style.height = right[rightIndex]*heightMultiply + 'px';
        bars[rightIndex + left.length].textContent = right[rightIndex];
        rightIndex++;
        await new Promise(resolve => setTimeout(resolve, speed));
    }

    displayPass(resultArray, passNumber++);
    return resultArray;
}

document.getElementById('sort').addEventListener('click', async function() {
    var data = dataInput.value.split(',').map(Number);
    data = await mergeSort(data);
    display(data);
});
