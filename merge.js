var data = document.getElementById('data');
var heightAdjust = document.getElementById('height-adjust');
var speedAdjust = document.getElementById('speed-adjust');
var speed=speedAdjust.value;
var heightMultiply=heightAdjust.value;
var passCounter = 0; // Add a counter for the passes

heightAdjust.onchange=function(){
    heightMultiply=this.value;
}

speedAdjust.onchange=function(){
    speed=this.value;
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

async function mergeSort(low, high) {
    if(low < high) {
        let mid = Math.floor((low + high) / 2);
        await mergeSort(low, mid);
        await mergeSort(mid + 1, high);
        await merge(low, mid, high);
    }
}

async function merge(low, mid, high) {
    let bars = document.querySelectorAll(".bar");
    let temp = [];
    let i = low, j = mid + 1, k = 0;

    while(i <= mid && j <= high) {
        bars[i].style.backgroundColor = "red";
        bars[j].style.backgroundColor = "yellow";
        await new Promise(resolve =>
            setTimeout(() => {
                resolve();
            }, speed)
        );
        if(parseInt(bars[i].style.height) < parseInt(bars[j].style.height)) {
            temp[k++] = data[i++];
        } else {
            temp[k++] = data[j++];
        }
    }

    while(i <= mid) {
        bars[i].style.backgroundColor = "red";
        await new Promise(resolve =>
            setTimeout(() => {
                resolve();
            }, speed)
        );
        temp[k++] = data[i++];
    }

    while(j <= high) {
        bars[j].style.backgroundColor = "yellow";
        await new Promise(resolve =>
            setTimeout(() => {
                resolve();
            }, speed)
        );
        temp[k++] = data[j++];
    }

    for(let i = low; i <= high; i++) {
        await new Promise(resolve =>
            setTimeout(() => {
                bars[i].style.height = temp[i - low]*heightMultiply + 'px';
                bars[i].textContent = temp[i - low];
                data[i] = temp[i - low];
                resolve();
            }, speed)
        );
        bars[i].style.backgroundColor = "blue";
    }

    let dat = data.slice(); // Copy the data array
    displaypass(dat, ++passCounter); // Display the pass and increment the counter
}

document.getElementById('sort').addEventListener('click', async function() {
    passCounter = 0; // Reset the counter before each sort
    await mergeSort(0, data.length - 1);
});
