var data = document.getElementById('data');
var heightAdjust = document.getElementById('height-adjust');
var speedAdjust = document.getElementById('speed-adjust');
var speed = speedAdjust.value;
var heightMultiply = heightAdjust.value;
var passnumber = 1;

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
    container.style.display ='flex';
    container.style.flexDirection='column';
    var pass=document.createElement('div');
    pass.classList.add('pass');
    pass.style.display='flex';
    pass.style.flexDirection='row';
    var passnum=document.createTextNode('Pass' + passnumber);
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

async function partition(low, high) {
    let bars = document.querySelectorAll(".bar");
    let pivot = parseInt(bars[high].style.height);
    let i = low - 1;
    bars[high].style.backgroundColor = "red"; // Pivot element becomes red
    for(let j = low; j <= high - 1; j++) {
        bars[j].style.backgroundColor = "orange"; // Left side becomes orange
        await new Promise(resolve =>
            setTimeout(() => {
                resolve();
            }, speed)
        );
        if(parseInt(bars[j].style.height) < pivot) {
            i++;
            let tempHeight = bars[i].style.height;
            bars[i].style.height = bars[j].style.height;
            bars[j].style.height = tempHeight;

            let tempContent = bars[i].textContent;
            bars[i].textContent = bars[j].textContent;
            bars[j].textContent = tempContent;

            let tempData = data[i];
            data[i] = data[j];
            data[j] = tempData;
        }
        bars[j].style.backgroundColor = "blue"; // Right side becomes blue
    }
    let tempHeight = bars[i+1].style.height;
    bars[i+1].style.height = bars[high].style.height;
    bars[high].style.height = tempHeight;

    let tempContent = bars[i+1].textContent;
    bars[i+1].textContent = bars[high].textContent;
    bars[high].textContent = tempContent;

    let tempData = data[i+1];
    data[i+1] = data[high];
    data[high] = tempData;

    bars[high].style.backgroundColor = "blue"; // Right side remains blue
    bars[i+1].style.backgroundColor = "green"; // Sorted elements become green

    let dat = data.slice(); // Copy the data array
    displaypass(dat, passnumber); // Display the pass
    passnumber++;

    return (i + 1);
}


async function quickSort(low, high) {
    if(low < high) {
        let pi = await partition(low, high);
        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
    }
}

document.getElementById('sort').addEventListener('click', async function() {
    await quickSort(0, data.length - 1);
});
