var data = document.getElementById('data');
document.getElementById('display').addEventListener('click', function() {
    data = data.value.split(',').map(Number);
    display(data);
});

function display(data) {
    var visualizer = document.getElementById('visualizer');
    visualizer.innerHTML = '';
    for (var i = 0; i < data.length; i++) {
        var bar = document.createElement('div');
        bar.style.height = data[i] + 'px';
        bar.classList.add('bar');
        visualizer.appendChild(bar);
    }
}

function displaypass(data) {
    var sorting = document.getElementById('sorting');
    // sorting.innerHTML = '';
    for (var i = 0; i < data.length; i++) {
        var bar = document.createElement('div');
        bar.style.height = data[i] + 'px';
        bar.classList.add('bar');
        sorting.appendChild(bar);
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
        display(data);
        await new Promise(resolve => setTimeout(resolve, 100)); // delay of 100ms
        displaypass(data);
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}

document.getElementById('sort').addEventListener('click', async function() {
    await bubblesort(data);
});
