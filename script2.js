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
        bar.style.height = data[i]*10 + 'px';
        bar.classList.add('bar');
        visualizer.appendChild(bar);
    }
}

function displaypass(data) {
    var sorting = document.getElementById('sorting');
    // sorting.innerHTML = '';
    for (var i = 0; i < data.length; i++) {
        var bar = document.createElement('div');
        bar.style.height = data[i]*10 + 'px';
        bar.classList.add('bar');
        sorting.appendChild(bar);
    }
}

 function mergeSort(data) {
    if (data.length < 2) {
        return data;
    }
    var mid = Math.floor(data.length / 2);
    var subLeft = mergeSort(data.slice(0,mid));
    var subRight = mergeSort(data.slice(mid));

    return merge(subLeft, subRight);
    
}

async function merge(node1, node2) {
    var result = [];
    while (node1.length > 0 && node2.length > 0)
        result.push(node1[0] < node2[0]? node1.shift() : node2.shift());
    result.push(...node1, ...node2);
    console.log(data);
        display(data);
        await new Promise(resolve => setTimeout(resolve, 100)); // delay of 100ms
        displaypass(data);
        await new Promise(resolve => setTimeout(resolve, 100));
}

document.getElementById('sort').addEventListener('click', async function() {
    await mergeSort(data);
});



// async function bubblesort(data) {
//     for(let i = data.length; i >= 1; i--) {
//         for(let j = 1; j <= i; j++) {
//             if(data[j-1] > data[j]) {
//                 let temp = data[j-1];
//                 data[j-1] = data[j];
//                 data[j] = temp;
//             }
//         }
//         console.log(data);
//         display(data);
//         await new Promise(resolve => setTimeout(resolve, 100)); // delay of 100ms
//         displaypass(data);
//         await new Promise(resolve => setTimeout(resolve, 100));
//     }
// }


