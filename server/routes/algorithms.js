const express = require('express');
const { ObjectId } = require('mongodb');
const { getDB } = require('../db');

const router = express.Router();

const fallbackData = [
    {
        _id: '000000000000000000000001',
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
        timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
        spaceComplexity: "O(1)",
        description: "A simple sorting algorithm that repeatedly steps through the list."
    },
    {
        _id: '000000000000000000000002',
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
        timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
        spaceComplexity: "O(log n)",
        description: "An efficient divide-and-conquer algorithm."
    },
    {
        _id: '000000000000000000000003',
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
        timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
        spaceComplexity: "O(n)",
        description: "A stable divide-and-conquer algorithm that divides the array into halves, sorts them, and merges them back together."
    },
    {
        _id: '000000000000000000000004',
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
        timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
        spaceComplexity: "O(1)",
        description: "A comparison-based sorting algorithm that uses a binary heap data structure to sort elements efficiently."
    }
];

router.get('/', async (req, res) => {
    try {
        const db = getDB();
        const algorithms = await db.collection('algorithms').find({}).toArray();
        res.json(algorithms);
    } catch (error) {
        console.error('Error:', error.message);
        res.json(fallbackData);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const db = getDB();
        const algorithm = await db.collection('algorithms').findOne({ 
            _id: new ObjectId(req.params.id) 
        });
        if (!algorithm) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.json(algorithm);
    } catch (error) {
        console.error('Error:', error.message);
        const algo = fallbackData.find(a => a._id === req.params.id);
        if (algo) return res.json(algo);
        res.json(fallbackData[0]);
    }
});

module.exports = router;