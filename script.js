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

async function bubblesort(data) {
    for(let i = data.length; i >= 1; i--) {
        for(let j = 1; j <= i; j++) {
            if(data[j-1] > data[j]) {
                let temp = data[j-1];
                data[j-1] = data[j];
                data[j] = temp;
            }
        }
        console.log(data);
        let dat=data;
        display(data);
        await new Promise(resolve => setTimeout(resolve, speed));
        displaypass(dat,data.length - i +1);
        // await new Promise(resolve => setTimeout(resolve, 100));
    }
}

document.getElementById('sort').addEventListener('click', async function() {
    await bubblesort(data);
});


//example  4, 6, 2, 9, 3, 8, 5, 1, 7, 0


