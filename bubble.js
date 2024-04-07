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

async function bubblesort() {
    let bars = document.querySelectorAll(".bar");
    for(let i = 0; i < data.length; i++) {
        for(let j = 0; j < data.length - i - 1; j++) {
            bars[j].style.backgroundColor = "red";
            bars[j+1].style.backgroundColor = "yellow";
            if(parseInt(bars[j].style.height) > parseInt(bars[j+1].style.height)) {
                await new Promise(resolve =>
                    setTimeout(() => {
                        let tempHeight = bars[j].style.height;
                        bars[j].style.height = bars[j+1].style.height;
                        bars[j+1].style.height = tempHeight;

                        let tempContent = bars[j].textContent;
                        bars[j].textContent = bars[j+1].textContent;
                        bars[j+1].textContent = tempContent;

                        let tempData = data[j];
                        data[j] = data[j+1];
                        data[j+1] = tempData;

                        resolve();
                    }, speed)
                );
            }
            bars[j].style.backgroundColor = "blue";
        }
        bars[data.length - i - 1].style.backgroundColor = "green";
        bars = document.querySelectorAll(".bar"); // Update the bars after each pass
        let dat = data.slice(); // Copy the data array
        displaypass(dat, i+1); // Display the pass
    }
}


document.getElementById('sort').addEventListener('click', async function() {
    await bubblesort();
});


//example  4, 6, 2, 9, 3, 8, 5, 1, 7, 0


