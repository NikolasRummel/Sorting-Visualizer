export const bubbleSort = async (array: number[]): Promise<number[][]> => {
    const steps: number[][] = [];
    const sortedArray = [...array];
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < sortedArray.length - 1; i++) {
            if (sortedArray[i] > sortedArray[i + 1]) {
                [sortedArray[i], sortedArray[i + 1]] = [sortedArray[i + 1], sortedArray[i]];
                steps.push([...sortedArray]);
                swapped = true;
            }
        }
    } while (swapped);
    return steps;
};

export const insertionSort = async (array: number[]): Promise<number[][]> => {
    const steps: number[][] = [];
    const sortedArray = [...array];
    for (let i = 1; i < sortedArray.length; i++) {
        let key = sortedArray[i];
        let j = i - 1;
        while (j >= 0 && sortedArray[j] > key) {
            sortedArray[j + 1] = sortedArray[j];
            steps.push([...sortedArray]);
            j = j - 1;
        }
        sortedArray[j + 1] = key;
    }
    steps.push([...sortedArray]);
    return steps;
};

export const quickSort = async (array: number[]): Promise<number[][]> => {
    const steps: number[][] = [];

    // Function to perform quicksort partition
    const partition = (arr: number[], low: number, high: number): number => {
        const pivot = arr[high];
        let i = low - 1;
        for (let j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        return i + 1;
    };

    // Function to implement quicksort
    const quickSortRecursive = (arr: number[], low: number, high: number) => {
        if (low < high) {
            const partitionIndex = partition(arr, low, high);
            steps.push([...arr]); // Capture the current state of the array after partition
            quickSortRecursive(arr, low, partitionIndex - 1);
            quickSortRecursive(arr, partitionIndex + 1, high);
        }
    };

    const sortedArray = [...array];
    quickSortRecursive(sortedArray, 0, sortedArray.length - 1);
    steps.push([...sortedArray]); // Push the final sorted array

    return steps;
};
