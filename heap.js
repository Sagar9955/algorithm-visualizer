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

function heapify(data, n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && data[left] > data[largest]) {
        largest = left;
    }

    if (right < n && data[right] > data[largest]) {
        largest = right;
    }

    if (largest != i) {
        let swap = data[i];
        data[i] = data[largest];
        data[largest] = swap;

        heapify(data, n, largest);
    }
}

function displaypass(data, passnumber) {
    return new Promise(resolve => {
        setTimeout(() => {
            var container = document.getElementById('container');
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
            resolve();
        }, speed);
    });
}

async function heapsort(data) {
    let n = data.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(data, n, i);
    }

    for (let i = n - 1; i >= 0; i--) {
        let temp = data[0];
        data[0] = data[i];
        data[i] = temp;

        await displaypass(data.slice(), n - i);
        heapify(data, i, 0);
    }
}

document.getElementById('sort').addEventListener('click', async function() {
    await heapsort(data);
});
