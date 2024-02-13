document.getElementById('start').addEventListener('click', function() {
    var data = document.getElementById('data').value.split(',').map(Number);
    var algorithm = document.getElementById('algorithm').value;
    if (algorithm === 'bubble') {
        bubbleSort(data);
    }
    // Add other algorithms here
});

function bubbleSort(data) {
    // Implement bubble sort
    // Create divs for each data point
    var visualizer = document.getElementById('visualizer');
    visualizer.innerHTML = '';
    for (var i = 0; i < data.length; i++) {
        var bar = document.createElement('div');
        bar.style.height = data[i] + 'px';
        bar.classList.add('bar');
        visualizer.appendChild(bar);
    }
    // Update the visualizer after each step
}
