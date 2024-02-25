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
        bar.textContent = data[i];
        visualizer.appendChild(bar);
    }
}

async function displayPass(data) {
    var sorting = document.getElementById('sorting');
    // sorting.innerHTML = '';
    for (var i = 0; i < data.length; i++) {
        var bar = document.createElement('div');
        bar.style.height = data[i]*10 + 'px';
        bar.classList.add('bar');
        bar.textContent = data[i];
        sorting.appendChild(bar);
    }
    await new Promise(resolve => setTimeout(resolve, 500)); // Added delay here
}

async function mergeSort(data) {
    if (data.length <= 1) {
        return data;
    }
    const middle = Math.floor(data.length / 2);
    const left = data.slice(0, middle);
    const right = data.slice(middle);
    return await merge(await mergeSort(left), await mergeSort(right));
}

async function merge(left, right) {
    let resultArray = [], leftIndex = 0, rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            resultArray.push(left[leftIndex]);
            leftIndex++;
        } else {
            resultArray.push(right[rightIndex]);
            rightIndex++;
        }
        display(resultArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex)));
        console.log(resultArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex)));
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    const result = resultArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    await displayPass(result);
    return result;
}

document.getElementById('sort').addEventListener('click', async function() {
    data = await mergeSort(data);
});
