var data;

document.getElementById('display').addEventListener('click', function() {
    data = document.getElementById('data').value.split(',').map(Number);
    display(data, 'visualizer');
});

function display(data, elementId) {
    var visualizer = document.getElementById(elementId);
    visualizer.innerHTML = '';
    for (var i = 0; i < data.length; i++) {
        var bar = document.createElement('div');
        bar.style.height = data[i] + 'px';
        bar.classList.add('bar');
        visualizer.appendChild(bar);
    }
}

async function bubblesort() {
    var sorting = document.getElementById('sorting');
    for(let i = data.length; i >= 1; i--) {
        for(let j = 1; j <= i; j++) {
            if(data[j-1] > data[j]) {
                let temp = data[j-1];
                data[j-1] = data[j];
                data[j] = temp;
            }
        }
        display(data, 'sorting');
        await new Promise(resolve => setTimeout(resolve, 100)); // delay of 100ms

        // Create a new div for each step
        var stepDiv = document.createElement('div');
        stepDiv.id = 'step' + i;
        sorting.appendChild(stepDiv);

        // Display the current state of the array in the new div
        display(data, stepDiv.id);
    }
}

document.getElementById('sort').addEventListener('click', async function() {
    await bubblesort();
});
