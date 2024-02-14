document.getElementById('display').addEventListener('click', function() {
    var data = document.getElementById('data').value.split(',').map(Number);

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
function bubblesort(){
    for(let i=data.length;i>=1;i--){
        for(let j =1;j<=i;j++){
            if(data[j-1]>data[j]){
                let temp=data[j-1];
                data[j-1]=data[j];
                data[j]=temp;
            }
        }
    }
}

// Create a new button
var sortButton = document.createElement('button');
sortButton.id = 'sort';
sortButton.innerHTML = 'Sort';
document.body.appendChild(sortButton);

// Add event listener to the new button
document.getElementById('sort').addEventListener('click', function() {
    var data = document.getElementById('data').value.split(',').map(Number);
    bubbleSort(data);
});

function bubbleSort(data) {
    var len = data.length;
    for (var i = len-1; i>=0; i--){
        for(var j = 1; j<=i; j++){
            if(data[j-1]>data[j]){
                var temp = data[j-1];
                data[j-1] = data[j];
                data[j] = temp;
            }
        }
        displayData(data, len - i);
    }
}

function displayData(data, pass) {
    var sorting = document.getElementById('sorting');
    var passDiv = document.createElement('div');
    passDiv.innerHTML = 'Pass ' + pass + ':';
    visualizer.appendChild(passDiv);
    
    var dataDiv = document.createElement('div');
    for (var i = 0; i < data.length; i++) {
        var bar = document.createElement('div');
        bar.style.height = data[i] + 'px';
        bar.classList.add('bar');
        dataDiv.appendChild(bar);
    }
    sorting.appendChild(dataDiv);
}
