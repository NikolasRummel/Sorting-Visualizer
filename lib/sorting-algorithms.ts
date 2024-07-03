import exp from "node:constants";

export interface Step {
    array: number[];
    actionIndices: number[];
}

export const bubbleSort = async (array: number[]): Promise<Step[]> => {
    const steps: Step[] = [];
    const sortedArray = [...array];
    let swapped;

    do {
        swapped = false;
        for (let i = 0; i < sortedArray.length - 1; i++) {
            if (sortedArray[i] > sortedArray[i + 1]) {
                [sortedArray[i], sortedArray[i + 1]] = [sortedArray[i + 1], sortedArray[i]];
                steps.push({array: [...sortedArray], actionIndices: [i, i + 1]});
                swapped = true;
            }
        }
    } while (swapped);

    steps.push({array: [...sortedArray], actionIndices: []}); // Final sorted state
    return steps;
};
export const insertionSort = async (array: number[]): Promise<Step[]> => {
    const steps: Step[] = [];
    const sortedArray = [...array];

    for (let i = 1; i < sortedArray.length; i++) {
        let key = sortedArray[i];
        let j = i - 1;
        while (j >= 0 && sortedArray[j] > key) {
            sortedArray[j + 1] = sortedArray[j];
            console.log([j + 1])
            steps.push({array: [...sortedArray], actionIndices: [j + 1]});
            j = j - 1;
        }
        sortedArray[j + 1] = key;
    }

    steps.push({array: [...sortedArray], actionIndices: []}); // Final sorted state
    return steps;
};

export const quickSort = async (array: number[]): Promise<Step[]> => {
    const steps: Step[] = [];

    const partition = (arr: number[], low: number, high: number): number => {
        const pivot = arr[high];
        let i = low - 1;
        for (let j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                steps.push({array: [...arr], actionIndices: [i, j]});
            }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        steps.push({array: [...arr], actionIndices: [i + 1, high]});
        return i + 1;
    };

    const quickSortRecursive = (arr: number[], low: number, high: number) => {
        if (low < high) {
            const partitionIndex = partition(arr, low, high);
            quickSortRecursive(arr, low, partitionIndex - 1);
            quickSortRecursive(arr, partitionIndex + 1, high);
        }
    };

    const sortedArray = [...array];
    quickSortRecursive(sortedArray, 0, sortedArray.length - 1);
    steps.push({array: [...sortedArray], actionIndices: []}); // Final sorted state

    return steps;
};

export const mergeSort = async (array: number[]): Promise<Step[]> => {
    const steps: Step[] = [];

    const merge = (arr: number[], left: number, mid: number, right: number): void => {
        const n1 = mid - left + 1;
        const n2 = right - mid;

        const L = new Array(n1);
        const R = new Array(n2);

        for (let i = 0; i < n1; i++) {
            L[i] = arr[left + i];
        }
        for (let j = 0; j < n2; j++) {
            R[j] = arr[mid + 1 + j];
        }

        let i = 0;
        let j = 0;
        let k = left;

        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                steps.push({array: [...arr], actionIndices: [k]});
                i++;
            } else {
                arr[k] = R[j];
                steps.push({array: [...arr], actionIndices: [k]});
                j++;
            }
            k++;
        }

        while (i < n1) {
            arr[k] = L[i];
            steps.push({array: [...arr], actionIndices: [k]});
            i++;
            k++;
        }

        while (j < n2) {
            arr[k] = R[j];
            steps.push({array: [...arr], actionIndices: [k]});
            j++;
            k++;
        }
    };

    const mergeSortRecursive = (arr: number[], left: number, right: number): void => {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);
            mergeSortRecursive(arr, left, mid);
            mergeSortRecursive(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
    };

    const sortedArray = [...array];
    mergeSortRecursive(sortedArray, 0, sortedArray.length - 1);
    steps.push({array: [...sortedArray], actionIndices: []}); // Final sorted state

    return steps;
};
export const heapSort = async (array: number[]): Promise<Step[]> => {
    const steps: Step[] = [];

    const heapify = (arr: number[], n: number, i: number): void => {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }

        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }

        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            steps.push({array: [...arr], actionIndices: [i, largest]});
            heapify(arr, n, largest);
        }
    };

    const heapSortAlgorithm = (arr: number[]): void => {
        const n = arr.length;

        // Build max heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }

        // Heap sort
        for (let i = n - 1; i > 0; i--) {
            [arr[0], arr[i]] = [arr[i], arr[0]];
            steps.push({array: [...arr], actionIndices: [0, i]});
            heapify(arr, i, 0);
        }
    };

    const sortedArray = [...array];
    heapSortAlgorithm(sortedArray);
    steps.push({array: [...sortedArray], actionIndices: []}); // Final sorted state

    return steps;
};

