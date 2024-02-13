document.getElementById('start').addEventListener('click', function() {
    var data = document.getElementById('data').value.split(',').map(Number);
    var algorithm = document.getElementById('algorithm').value;
    if (algorithm === 'bubble') {
        bubbleSort(data);
    }
    
});

function bubbleSort(data) {

    var visualizer = document.getElementById('visualizer');
    visualizer.innerHTML = '';
    for (var i = 0; i < data.length; i++) {
        var bar = document.createElement('div');
        bar.style.height = data[i] + 'px';
        bar.classList.add('bar');
        visualizer.appendChild(bar);
    }
    
}
