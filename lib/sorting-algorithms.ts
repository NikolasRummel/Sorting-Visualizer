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
                steps.push({ array: [...sortedArray], actionIndices: [i, i + 1] });
                swapped = true;
            }
        }
    } while (swapped);

    steps.push({ array: [...sortedArray], actionIndices: [] }); // Final sorted state
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
            steps.push({ array: [...sortedArray], actionIndices: [j + 1] });
            j = j - 1;
        }
        sortedArray[j + 1] = key;
    }

    steps.push({ array: [...sortedArray], actionIndices: [] }); // Final sorted state
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
                steps.push({ array: [...arr], actionIndices: [i, j] });
            }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        steps.push({ array: [...arr], actionIndices: [i + 1, high] });
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
    steps.push({ array: [...sortedArray], actionIndices: [] }); // Final sorted state

    return steps;
};
