const algorithmData = [
    {
        name: "Bubble Sort",
        category: "sorting",
        difficulty: "easy",
        pseudocode: `function bubbleSort(arr) {
  for (i = 0; i < n-1; i++) {
    for (j = 0; j < n-i-1; j++) {
      if (arr[j] > arr[j+1]) {
        swap(arr[j], arr[j+1])
      }
    }
  }
}`,
        timeComplexity: {
            best: "O(n)",
            average: "O(n²)",
            worst: "O(n²)"
        },
        spaceComplexity: "O(1)",
        description: "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order."
    },
    {
        name: "Quick Sort",
        category: "sorting",
        difficulty: "medium",
        pseudocode: `function quickSort(arr, low, high) {
  if (low < high) {
    pivot = partition(arr, low, high)
    quickSort(arr, low, pivot-1)
    quickSort(arr, pivot+1, high)
  }
}

function partition(arr, low, high) {
  pivot = arr[high]
  i = low - 1
  for (j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++
      swap(arr[i], arr[j])
    }
  }
  swap(arr[i+1], arr[high])
  return i + 1
}`,
        timeComplexity: {
            best: "O(n log n)",
            average: "O(n log n)",
            worst: "O(n²)"
        },
        spaceComplexity: "O(log n)",
        description: "An efficient divide-and-conquer algorithm that selects a pivot element and partitions the array around it."
    },
    {
        name: "Merge Sort",
        category: "sorting",
        difficulty: "medium",
        pseudocode: `function mergeSort(arr, left, right) {
  if (left < right) {
    mid = (left + right) / 2
    mergeSort(arr, left, mid)
    mergeSort(arr, mid+1, right)
    merge(arr, left, mid, right)
  }
}

function merge(arr, left, mid, right) {
  // Create temp arrays
  leftArr = arr[left...mid]
  rightArr = arr[mid+1...right]
  
  i = 0, j = 0, k = left
  
  // Merge temp arrays back
  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i] <= rightArr[j]) {
      arr[k] = leftArr[i]
      i++
    } else {
      arr[k] = rightArr[j]
      j++
    }
    k++
  }
  
  // Copy remaining elements from left
  while (i < leftArr.length) {
    arr[k] = leftArr[i]
    i++
    k++
  }
  
  // Copy remaining elements from right
  while (j < rightArr.length) {
    arr[k] = rightArr[j]
    j++
    k++
  }
}`,
        timeComplexity: {
            best: "O(n log n)",
            average: "O(n log n)",
            worst: "O(n log n)"
        },
        spaceComplexity: "O(n)",
        description: "A stable divide-and-conquer algorithm that divides the array into halves, sorts them, and merges them back together."
    },
    {
        name: "Heap Sort",
        category: "sorting",
        difficulty: "hard",
        pseudocode: `function heapSort(arr) {
  n = arr.length
  
  // Build max heap
  for (i = n/2 - 1; i >= 0; i--) {
    heapify(arr, n, i)
  }
  
  // Extract elements from heap
  for (i = n-1; i > 0; i--) {
    swap(arr[0], arr[i])
    heapify(arr, i, 0)
  }
}

function heapify(arr, n, i) {
  largest = i
  left = 2*i + 1
  right = 2*i + 2
  
  if (left < n && arr[left] > arr[largest]) {
    largest = left
  }
  if (right < n && arr[right] > arr[largest]) {
    largest = right
  }
  if (largest != i) {
    swap(arr[i], arr[largest])
    heapify(arr, n, largest)
  }
}`,
        timeComplexity: {
            best: "O(n log n)",
            average: "O(n log n)",
            worst: "O(n log n)"
        },
        spaceComplexity: "O(1)",
        description: "A comparison-based sorting algorithm that uses a binary heap data structure to sort elements efficiently."
    }
];

export default { algorithmData };