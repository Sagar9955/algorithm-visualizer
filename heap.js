var data = document.getElementById('data');
var heightAdjust = document.getElementById('height-adjust');
var speedAdjust = document.getElementById('speed-adjust');
var speed=speedAdjust.value;
var heightMultiply=heightAdjust.value;

heightAdjust.onchange=function(){
    heightMultiply.value
}

speedAdjust.onchange=function(){
    speed=this.value
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
        bar.textContent=data[i];
        visualizer.appendChild(bar);
    }
}

function displaypass(data,passnumber) {
    var container = document.getElementById('container');
    container.style.display ='flex';
    container.style.flexDirection='column';
    var pass=document.createElement('div');
    pass.classList.add('pass');
    pass.style.display='flex';
    pass.style.flexDirection='row';
    var passnum=document.createTextNode('Pass' +passnumber);
    pass.appendChild(passnum);
    for (var i = 0; i < data.length; i++) {
        var bar = document.createElement('div');
        bar.style.height = data[i]*10 + 'px';
        bar.classList.add('bar');
        bar.textContent=data[i];
        pass.appendChild(bar);
        container.appendChild(pass);
    }
}

function heapify(arr, n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest != i) {
        let swap = arr[i];
        arr[i] = arr[largest];
        arr[largest] = swap;

        heapify(arr, n, largest);
    }
}

async function heapSort(arr) {
    let n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    for (let i = n - 1; i >= 0; i--) {
        let temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;

        await new Promise(resolve =>
            setTimeout(() => {
                heapify(arr, i, 0);
                resolve();
            }, speed)
        );
    }
}

document.getElementById('sort').addEventListener('click', async function() {
    await heapSort(data);
});
