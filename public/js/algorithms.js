export function bubbleSort(array) {
    const steps = [];
    const arr = [...array];
    const n = arr.length;
    
    steps.push({ array: [...arr], comparing: [], swapping: [], sorted: [], type: 'initial' });
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            steps.push({ 
                array: [...arr], 
                comparing: [j, j + 1], 
                swapping: [], 
                sorted: Array.from({length: i}, (_, k) => n - 1 - k), 
                type: 'compare' 
            });
            
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                steps.push({ 
                    array: [...arr], 
                    comparing: [], 
                    swapping: [j, j + 1], 
                    sorted: Array.from({length: i}, (_, k) => n - 1 - k), 
                    type: 'swap' 
                });
            }
        }
    }
    
    steps.push({ 
        array: [...arr], 
        comparing: [], 
        swapping: [], 
        sorted: Array.from({length: n}, (_, k) => k), 
        type: 'completed' 
    });
    
    return steps;
}

export function quickSort(array) {
    const steps = [];
    const arr = [...array];
    
    steps.push({ 
        array: [...arr], 
        comparing: [], 
        swapping: [], 
        pivot: -1, 
        sorted: [], 
        type: 'initial' 
    });
    
    quickSortHelper(arr, 0, arr.length - 1, steps);
    
    steps.push({ 
        array: [...arr], 
        comparing: [], 
        swapping: [], 
        pivot: -1, 
        sorted: Array.from({length: arr.length}, (_, k) => k), 
        type: 'completed' 
    });
    
    return steps;
}

function quickSortHelper(arr, low, high, steps) {
    if (low < high) {
        const pivotIndex = partition(arr, low, high, steps);
        quickSortHelper(arr, low, pivotIndex - 1, steps);
        quickSortHelper(arr, pivotIndex + 1, high, steps);
    }
}

function partition(arr, low, high, steps) {
    const pivot = arr[high];
    let i = low - 1;
    
    steps.push({ 
        array: [...arr], 
        comparing: [], 
        swapping: [], 
        pivot: high, 
        sorted: [], 
        type: 'pivot' 
    });
    
    for (let j = low; j < high; j++) {
        steps.push({ 
            array: [...arr], 
            comparing: [j, high], 
            swapping: [], 
            pivot: high, 
            sorted: [], 
            type: 'compare' 
        });
        
        if (arr[j] < pivot) {
            i++;
            if (i !== j) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                steps.push({ 
                    array: [...arr], 
                    comparing: [], 
                    swapping: [i, j], 
                    pivot: high, 
                    sorted: [], 
                    type: 'swap' 
                });
            }
        }
    }
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push({ 
        array: [...arr], 
        comparing: [], 
        swapping: [i + 1, high], 
        pivot: i + 1, 
        sorted: [i + 1], 
        type: 'pivot_placed' 
    });
    
    return i + 1;
}

export function mergeSort(array) {
    const steps = [];
    const arr = [...array];
    
    steps.push({ 
        array: [...arr], 
        comparing: [], 
        merging: [], 
        sorted: [], 
        type: 'initial' 
    });
    
    mergeSortHelper(arr, 0, arr.length - 1, steps);
    
    steps.push({ 
        array: [...arr], 
        comparing: [], 
        merging: [], 
        sorted: Array.from({length: arr.length}, (_, k) => k), 
        type: 'completed' 
    });
    
    return steps;
}

function mergeSortHelper(arr, left, right, steps) {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);
        mergeSortHelper(arr, left, mid, steps);
        mergeSortHelper(arr, mid + 1, right, steps);
        merge(arr, left, mid, right, steps);
    }
}

function merge(arr, left, mid, right, steps) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;
    
    while (i < leftArr.length && j < rightArr.length) {
        steps.push({ 
            array: [...arr], 
            comparing: [left + i, mid + 1 + j], 
            merging: Array.from({length: right - left + 1}, (_, idx) => left + idx), 
            sorted: [], 
            type: 'compare' 
        });
        
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }
        
        steps.push({ 
            array: [...arr], 
            comparing: [], 
            merging: Array.from({length: right - left + 1}, (_, idx) => left + idx), 
            sorted: [], 
            type: 'merge' 
        });
        
        k++;
    }
    
    while (i < leftArr.length) {
        arr[k] = leftArr[i];
        steps.push({ 
            array: [...arr], 
            comparing: [], 
            merging: Array.from({length: right - left + 1}, (_, idx) => left + idx), 
            sorted: [], 
            type: 'merge' 
        });
        i++;
        k++;
    }
    
    while (j < rightArr.length) {
        arr[k] = rightArr[j];
        steps.push({ 
            array: [...arr], 
            comparing: [], 
            merging: Array.from({length: right - left + 1}, (_, idx) => left + idx), 
            sorted: [], 
            type: 'merge' 
        });
        j++;
        k++;
    }
}

export function heapSort(array) {
    const steps = [];
    const arr = [...array];
    const n = arr.length;
    
    steps.push({ 
        array: [...arr], 
        comparing: [], 
        swapping: [], 
        heap: [], 
        sorted: [], 
        type: 'initial' 
    });
    
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i, steps);
    }
    
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        steps.push({ 
            array: [...arr], 
            comparing: [], 
            swapping: [0, i], 
            heap: Array.from({length: i}, (_, k) => k), 
            sorted: Array.from({length: n - i}, (_, k) => n - 1 - k), 
            type: 'swap' 
        });
        heapify(arr, i, 0, steps);
    }
    
    steps.push({ 
        array: [...arr], 
        comparing: [], 
        swapping: [], 
        heap: [], 
        sorted: Array.from({length: n}, (_, k) => k), 
        type: 'completed' 
    });
    
    return steps;
}

function heapify(arr, n, i, steps) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    if (left < n) {
        steps.push({ 
            array: [...arr], 
            comparing: [largest, left], 
            swapping: [], 
            heap: Array.from({length: n}, (_, k) => k), 
            sorted: [], 
            type: 'compare' 
        });
        
        if (arr[left] > arr[largest]) {
            largest = left;
        }
    }
    
    if (right < n) {
        steps.push({ 
            array: [...arr], 
            comparing: [largest, right], 
            swapping: [], 
            heap: Array.from({length: n}, (_, k) => k), 
            sorted: [], 
            type: 'compare' 
        });
        
        if (arr[right] > arr[largest]) {
            largest = right;
        }
    }
    
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        steps.push({ 
            array: [...arr], 
            comparing: [], 
            swapping: [i, largest], 
            heap: Array.from({length: n}, (_, k) => k), 
            sorted: [], 
            type: 'swap' 
        });
        heapify(arr, n, largest, steps);
    }
}

export function getAlgorithmFunction(name) {
    const algorithms = {
        'Bubble Sort': bubbleSort,
        'Quick Sort': quickSort,
        'Merge Sort': mergeSort,
        'Heap Sort': heapSort
    };
    return algorithms[name] || bubbleSort;
}