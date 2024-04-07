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

async function insertionsort() {
    let bars = document.querySelectorAll(".bar");
    let dat = data.slice(); // Copy the initial data array
    displaypass(dat, 0); // Display the initial state of the array
    for(let i = 1; i < data.length; i++) {
        let key = data[i];
        let keyHeight = bars[i].style.height;
        let keyContent = bars[i].textContent;
        bars[i].style.backgroundColor = "red";
        let j = i - 1;

        await new Promise(resolve =>
            setTimeout(() => {
                while(j >= 0 && data[j] > key) {
                    bars[j].style.backgroundColor = "blue";
                    data[j + 1] = data[j];
                    bars[j + 1].style.height = bars[j].style.height;
                    bars[j + 1].textContent = bars[j].textContent;
                    j = j - 1;
                }
                data[j + 1] = key;
                bars[j + 1].style.height = keyHeight;
                bars[j + 1].textContent = keyContent;
                resolve();
            }, speed)
        );

        for(let k = 0; k <= i; k++) {
            bars[k].style.backgroundColor = "green";
        }
        bars = document.querySelectorAll(".bar"); // Update the bars after each pass
        dat = data.slice(); // Copy the data array
        displaypass(dat, i); // Display the pass
    }
}

document.getElementById('sort').addEventListener('click', async function() {
    await insertionsort();
});
