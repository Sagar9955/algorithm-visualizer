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
        await new Promise(resolve => setTimeout(resolve, 2000));
        displaypass(dat);
        // await new Promise(resolve => setTimeout(resolve, 100));
    }
}

document.getElementById('sort').addEventListener('click', async function() {
    await bubblesort(data);
});


//example  4, 6, 2, 9, 3, 8, 5, 1, 7, 0

// function bubbleSort(data) {
//     var len = data.length;
//     for (var i = 0; i < len; i++) {
//         setTimeout((i) => {
//             singlePass(data, len - i);
//             displayData(data.slice(0, len - i), i, i + 1); // Pass the current pass number to displayData
//         }, i * 500, i); // delay each pass by i * 500 milliseconds
//     }
// }


// function singlePass(data, end) {
//     for(var j = 0; j < end - 1; j++){
//         if(data[j] > data[j + 1]){
//             var temp = data[j];
//             data[j] = data[j + 1];
//             data[j + 1] = temp;
//         }
//         displayData(data.slice(0, end), j); // Display the data after each comparison
//     }
// }

// function displayData(data, highlightedIndex, pass) {
//     var sorting = document.getElementById('sorting');

//     // Create a new div for each pass
//     var passDiv = document.createElement('div');
//     passDiv.innerHTML = 'Pass ' + pass + ':';
//     sorting.appendChild(passDiv);

//     var dataDiv = document.createElement('div');
//     dataDiv.style.display = 'flex';
//     dataDiv.style.alignItems = 'flex-end';

//     for (var i = 0; i < data.length; i++) {
//         var bar = document.createElement('div');
//         bar.style.height = data[i] + 'px';
//         bar.classList.add('bar');

//         // Change the color of the bars that are being compared
//         if (i === highlightedIndex) {
//             bar.style.backgroundColor = 'red';
//         } else if (i === highlightedIndex + 1) {
//             bar.style.backgroundColor = 'green';
//         }

//         dataDiv.appendChild(bar);
//     }

//     // Append the data div to the pass div
//     passDiv.appendChild(dataDiv);
// }

// merge sort



