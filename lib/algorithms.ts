export interface Step {
    array: number[];
    currentIndex?: number;
    sortedIndex?: number;
    comparisonIndices?: number[];
    comparisons?: number;
}

function markArrayAsSorted(array: number[], steps: Step[]) {
    const lastComparisons = steps.length > 0 ? steps[steps.length - 1].comparisons : 0;

    for (let i = 0; i < array.length; i++) {
        steps.push({
            array: [...array],
            sortedIndex: i,
            currentIndex: i, // Mark currentIndex for sorted items
            comparisons: lastComparisons
        });
    }
}

export async function insertionSort(array: number[]): Promise<Step[]> {
    const steps: Step[] = [];
    const n = array.length;
    let comparisons = 0;

    // Clone the array to preserve the initial state
    const sortedArray = [...array];

    // Iterate through the array to sort it
    for (let i = 1; i < n; i++) {
        let currentIndex = i;
        let compareIndex = i - 1;
        const current = sortedArray[currentIndex];
        let comparisonIndices: number[] = [];

        // Compare and shift elements to make space for current element
        while (compareIndex >= 0 && sortedArray[compareIndex] > current) {
            // Prepare the state before insertion
            comparisonIndices.push(compareIndex);
            comparisons++;

            steps.push({
                array: [...sortedArray],
                currentIndex,
                comparisonIndices: [currentIndex, compareIndex], // Highlight current and compared element
                comparisons,
            });

            // Shift element to the right
            sortedArray[compareIndex + 1] = sortedArray[compareIndex];
            compareIndex--;

            // Prepare the state after shifting
            steps.push({
                array: [...sortedArray],
                currentIndex,
                comparisonIndices: [currentIndex, compareIndex + 1], // Highlight current and swapped element
                comparisons,
            });
        }

        // Insert current element into correct position
        sortedArray[compareIndex + 1] = current;

        // Prepare the state after insertion
        steps.push({
            array: [...sortedArray],
            currentIndex,
            comparisonIndices: [currentIndex, compareIndex + 1], // Highlight current and insertion point
            comparisons,
        });
    }

    // Mark the array as sorted by highlighting in green
    markArrayAsSorted(sortedArray, steps)
    return steps;
}

export async function bubbleSort(array: number[]): Promise<Step[]> {
    const steps: Step[] = [];
    const n = array.length;
    let comparisons = 0;

    // Clone the array to preserve the initial state
    const sortedArray = [...array];

    // Iterate through the array to sort it
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            const comparisonIndices = [j, j + 1];
            comparisons++;

            // Prepare the state before comparison
            steps.push({
                array: [...sortedArray],
                currentIndex: j,
                comparisonIndices,
                comparisons,
            });

            // Compare and swap elements if needed
            if (sortedArray[j] > sortedArray[j + 1]) {
                [sortedArray[j], sortedArray[j + 1]] = [sortedArray[j + 1], sortedArray[j]];

                // Prepare the state after swap
                steps.push({
                    array: [...sortedArray],
                    currentIndex: j,
                    comparisonIndices,
                    comparisons,
                });
            }
        }
    }

    // Mark the entire array as sorted
    markArrayAsSorted(sortedArray, steps);

    return steps;
}

export async function mergeSort(array: number[]): Promise<Step[]> {
    const steps: Step[] = [];
    const n = array.length;
    let comparisons = 0;

    // Clone the array to preserve the initial state
    const originalArray = [...array];

    // Define the recursive merge sort function
    async function mergeSortRecursive(arr: number[], left: number, right: number) {
        if (left < right) {
            const middle = Math.floor((left + right) / 2);

            // Visualize partitioning into subarrays
            steps.push({
                array: [...arr],
                currentIndex: middle,
                comparisonIndices: [middle],
                comparisons,
            });

            // Recursively sort left and right halves
            await mergeSortRecursive(arr, left, middle);
            await mergeSortRecursive(arr, middle + 1, right);

            // Merge the sorted halves
            await merge(arr, left, middle, right);
        }
    }

    // Define the merge function
    async function merge(arr: number[], left: number, middle: number, right: number) {
        const leftArray = arr.slice(left, middle + 1);
        const rightArray = arr.slice(middle + 1, right + 1);
        let i = 0, j = 0, k = left;

        while (i < leftArray.length && j < rightArray.length) {
            if (leftArray[i] <= rightArray[j]) {
                arr[k++] = leftArray[i++];
            } else {
                arr[k++] = rightArray[j++];
            }

            // Visualize merging step
            comparisons++;
            steps.push({
                array: [...arr],
                currentIndex: k - 1,
                comparisonIndices: [k - 1],
                comparisons,
            });
        }

        while (i < leftArray.length) {
            arr[k++] = leftArray[i++];
            comparisons++;
            steps.push({
                array: [...arr],
                currentIndex: k - 1,
                comparisonIndices: [k - 1],
                comparisons,
            });
        }

        while (j < rightArray.length) {
            arr[k++] = rightArray[j++];
            comparisons++;
            steps.push({
                array: [...arr],
                currentIndex: k - 1,
                comparisonIndices: [k - 1],
                comparisons,
            });
        }
    }

    // Start recursive merge sort
    await mergeSortRecursive(array, 0, n - 1);

    // Mark the array as sorted by highlighting in green
    markArrayAsSorted(array, steps);

    return steps;
}

export async function quickSort(array: number[]): Promise<Step[]> {
    const steps: Step[] = [];
    const n = array.length;
    let comparisons = 0;

    // Clone the array to preserve the initial state
    const originalArray = [...array];

    // Define the recursive quick sort function
    async function quickSortRecursive(arr: number[], low: number, high: number) {
        if (low < high) {
            const pivotIndex = await partition(arr, low, high);
            await quickSortRecursive(arr, low, pivotIndex - 1);
            await quickSortRecursive(arr, pivotIndex + 1, high);
        }
    }

    // Define the partition function
    async function partition(arr: number[], low: number, high: number): Promise<number> {
        const pivot = arr[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                // Swap arr[i] and arr[j]
                [arr[i], arr[j]] = [arr[j], arr[i]];

                // Visualize swapping step
                comparisons++;
                steps.push({
                    array: [...arr],
                    currentIndex: j,
                    comparisonIndices: [i, j],
                    comparisons,
                });
            }
        }

        // Swap arr[i+1] and arr[high] (pivot)
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

        // Visualize swapping pivot into place
        comparisons++;
        steps.push({
            array: [...arr],
            currentIndex: i + 1,
            comparisonIndices: [i + 1, high],
            comparisons,
        });

        return i + 1;
    }

    // Start recursive quick sort
    await quickSortRecursive(array, 0, n - 1);

    // Mark the array as sorted by highlighting in green
    markArrayAsSorted(array, steps);

    return steps;
}

export async function heapSort(array: number[]): Promise<Step[]> {
    const steps: Step[] = [];
    const n = array.length;
    let comparisons = 0;

    // Build max heap
    async function buildMaxHeap(arr: number[]) {
        const heapSize = arr.length;
        // Build heap (rearrange array)
        for (let i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
            await heapify(arr, heapSize, i);
        }
    }

    // Heapify a subtree rooted with node i
    async function heapify(arr: number[], heapSize: number, i: number) {
        let largest = i; // Initialize largest as root
        const left = 2 * i + 1; // Left child
        const right = 2 * i + 2; // Right child

        // Compare left child with root
        if (left < heapSize && arr[left] > arr[largest]) {
            largest = left;
        }

        // Compare right child with largest so far
        if (right < heapSize && arr[right] > arr[largest]) {
            largest = right;
        }

        // If largest is not root
        if (largest !== i) {
            // Swap arr[i] and arr[largest]
            [arr[i], arr[largest]] = [arr[largest], arr[i]];

            // Visualize swapping step
            comparisons++;
            steps.push({
                array: [...arr],
                currentIndex: i,
                comparisonIndices: [i, largest],
                comparisons,
            });

            // Recursively heapify the affected sub-tree
            await heapify(arr, heapSize, largest);
        }
    }

    // Perform heapsort
    async function heapSortImpl(arr: number[]) {
        await buildMaxHeap(arr);

        // One by one extract an element from heap
        for (let i = n - 1; i > 0; i--) {
            // Move current root to end
            [arr[0], arr[i]] = [arr[i], arr[0]];

            // Visualize swapping step
            comparisons++;
            steps.push({
                array: [...arr],
                currentIndex: 0,
                comparisonIndices: [0, i],
                comparisons,
            });

            // Reduce heap size and heapify the root element
            await heapify(arr, i, 0);
        }
    }

    // Start heapsort
    await heapSortImpl(array);

    // Mark the array as sorted by highlighting in green
    markArrayAsSorted(array, steps);

    return steps;
}

export async function oddEvenSort(array: number[]): Promise<Step[]> {
    const steps: Step[] = [];
    const n = array.length;
    let sorted = false;
    let comparisons = 0;

    // Clone the array to preserve the initial state
    const sortedArray = [...array];

    // Odd-Even Sort algorithm
    while (!sorted) {
        sorted = true;

        // Perform bubble sort on odd indexed elements
        for (let i = 1; i < n - 1; i += 2) {
            const comparisonIndices = [i, i + 1];
            comparisons++;

            // Prepare the state before comparison
            steps.push({
                array: [...sortedArray],
                currentIndex: i,
                comparisonIndices,
                comparisons,
            });

            if (sortedArray[i] > sortedArray[i + 1]) {
                [sortedArray[i], sortedArray[i + 1]] = [sortedArray[i + 1], sortedArray[i]];
                sorted = false;

                // Prepare the state after swap
                steps.push({
                    array: [...sortedArray],
                    currentIndex: i,
                    comparisonIndices,
                    comparisons,
                });
            }
        }

        // Perform bubble sort on even indexed elements
        for (let i = 0; i < n - 1; i += 2) {
            const comparisonIndices = [i, i + 1];
            comparisons++;

            // Prepare the state before comparison
            steps.push({
                array: [...sortedArray],
                currentIndex: i,
                comparisonIndices,
                comparisons,
            });

            if (sortedArray[i] > sortedArray[i + 1]) {
                [sortedArray[i], sortedArray[i + 1]] = [sortedArray[i + 1], sortedArray[i]];
                sorted = false;

                // Prepare the state after swap
                steps.push({
                    array: [...sortedArray],
                    currentIndex: i,
                    comparisonIndices,
                    comparisons,
                });
            }
        }
    }

    // Mark the array as sorted by highlighting in green
    markArrayAsSorted(sortedArray, steps);

    return steps;
}
