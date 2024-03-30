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

async function insertionsort(data) {
    // Display the initial state of the array as the first pass
    let dat = data.slice();
    await displaypass(dat, 0);

    for(let i = 1; i < data.length; i++) {
        let key = data[i];
        let j = i - 1;
        while(j >= 0 && data[j] > key) {
            data[j + 1] = data[j];
            j = j - 1;
        }
        data[j + 1] = key;
        console.log(data);
        dat = data.slice();
        display(data);
        // Call displaypass at the end of each iteration
        await displaypass(dat, i);
    }
}



document.getElementById('sort').addEventListener('click', async function() {
    await insertionsort(data);
});
