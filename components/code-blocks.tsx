import React from 'react';
import { CopyBlock, nord } from 'react-code-blocks';

export const InsertionSortComponent = () => {
    const code = `public static int[] insertionSort(int[] sortieren) {
    int temp;
    for (int i = 1; i < sortieren.length; i++) {
        temp = sortieren[i];
        int j = i;
        while (j > 0 && sortieren[j - 1] > temp) {
            sortieren[j] = sortieren[j - 1];
            j--;
        }
        sortieren[j] = temp;
    }
    return sortieren;
}`;

    return (
        <div>
            <span className="text-xl font-semibold">Java Code</span>
            <CopyBlock
                text={code}
                language="java"
                showLineNumbers={false}
                wrapLongLines={true}
                theme={nord}
            />
        </div>
    );
};

export const BubbleSortComponent = () => {
    const code = `public static int[] bubbleSort(int[] array) {
    for (int i = 0; i < array.length - 1; i++) {
        for (int j = 0; j < array.length - 1 - i; j++) {
            if (array[j] > array[j + 1]) {
                // Swap elements
                int temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
    return array;
}`;

    return (
        <div>
            <span className="text-xl font-semibold">Java Code</span>
            <CopyBlock
                text={code}
                language="java"
                showLineNumbers={false}
                wrapLongLines={true}
                theme={nord}
            />
        </div>
    );
};

export const EvenOddSortComponent = () => {
    const code = `public static int[] evenOddSort(int[] array) {
    boolean sorted = false;
    while (!sorted) {
        sorted = true;
        for (int i = 1; i < array.length - 1; i += 2) {
            if (array[i] > array[i + 1]) {
                // Swap elements
                int temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                sorted = false;
            }
        }
        for (int i = 0; i < array.length - 1; i += 2) {
            if (array[i] > array[i + 1]) {
                // Swap elements
                int temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                sorted = false;
            }
        }
    }
    return array;
}`;

    return (
        <div>
            <span className="text-xl font-semibold">Java Code</span>
            <CopyBlock
                text={code}
                language="java"
                showLineNumbers={false}
                wrapLongLines={true}
                theme={nord}
            />
        </div>
    );
};

export const MergeSortComponent = () => {
    const code = `public static void mergeSort(int[] array, int left, int right) {
    if (left < right) {
        int middle = (left + right) / 2;
        mergeSort(array, left, middle);
        mergeSort(array, middle + 1, right);
        merge(array, left, middle, right);
    }
}

private static void merge(int[] array, int left, int middle, int right) {
    int[] temp = new int[array.length];
    for (int i = left; i <= right; i++) {
        temp[i] = array[i];
    }
    int i = left;
    int j = middle + 1;
    int k = left;
    while (i <= middle && j <= right) {
        if (temp[i] <= temp[j]) {
            array[k] = temp[i];
            i++;
        } else {
            array[k] = temp[j];
            j++;
        }
        k++;
    }
    while (i <= middle) {
        array[k] = temp[i];
        k++;
        i++;
    }
}`;

    return (
        <div>
            <span className="text-xl font-semibold">Java Code</span>
            <CopyBlock
                text={code}
                language="java"
                showLineNumbers={false}
                wrapLongLines={true}
                theme={nord}
            />
        </div>
    );
};

export const HeapSortComponent = () => {
    const code = `public static void heapSort(int[] array) {
    int n = array.length;

    // Build max heap
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(array, n, i);
    }

    // Heap sort
    for (int i = n - 1; i > 0; i--) {
        // Swap root with last element
        int temp = array[0];
        array[0] = array[i];
        array[i] = temp;

        // Heapify root element
        heapify(array, i, 0);
    }
}

private static void heapify(int[] array, int n, int i) {
    int largest = i;
    int leftChild = 2 * i + 1;
    int rightChild = 2 * i + 2;

    // If left child is larger than root
    if (leftChild < n && array[leftChild] > array[largest]) {
        largest = leftChild;
    }

    // If right child is larger than largest so far
    if (rightChild < n && array[rightChild] > array[largest]) {
        largest = rightChild;
    }

    // If largest is not root
    if (largest != i) {
        int temp = array[i];
        array[i] = array[largest];
        array[largest] = temp;

        // Recursively heapify the affected sub-tree
        heapify(array, n, largest);
    }
}`;

    return (
        <div>
            <span className="text-xl font-semibold">Java Code</span>
            <CopyBlock
                text={code}
                language="java"
                showLineNumbers={false}
                wrapLongLines={true}
                theme={nord}
            />
        </div>
    );
};

export const QuickSortComponent = () => {
    const code = `public static void quickSort(int[] array, int low, int high) {
    if (low < high) {
        int partitionIndex = partition(array, low, high);
        quickSort(array, low, partitionIndex - 1);
        quickSort(array, partitionIndex + 1, high);
    }
}

private static int partition(int[] array, int low, int high) {
    int pivot = array[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (array[j] < pivot) {
            i++;
            int temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
    int temp = array[i + 1];
    array[i + 1] = array[high];
    array[high] = temp;
    return i + 1;
}`;

    return (
        <div>
            <span className="text-xl font-semibold">Java Code</span>
            <CopyBlock
                text={code}
                language="java"
                showLineNumbers={false}
                wrapLongLines={true}
                theme={nord}
            />
        </div>
    );
};

export const BfsComponent = () => {
    const code = `def breadth_first_search(graph, source):
    # Initialize all vertices
    for each vertex u in graph.vertices:
        if u != source:
            u.color = 'white'
            u.distance = float('inf')
            u.predecessor = None
    
    # Initialize the source vertex
    source.color = 'gray'
    source.distance = 0
    source.predecessor = None
    
    # Initialize the queue and enqueue the source
    queue = []
    queue.append(source)
    
    # Process the queue
    while queue:
        u = queue.pop(0)  # Dequeue
        for v in graph.adjacency_list[u]:
            if v.color == 'white':
                v.color = 'gray'
                v.distance = u.distance + 1
                v.predecessor = u
                queue.append(v)
        u.color = 'black'
`;

    return (
        <div>
            <span className="text-xl font-semibold">Python-like Pseudocode for BFS</span>
            <CopyBlock
                text={code}
                language="python"
                showLineNumbers={false}
                wrapLongLines={true}
                theme={nord}
            />
        </div>
    );
};


export const DfsComponent = () => {
    const code = `def depth_first_search(graph):
    # Initialize all vertices
    for each vertex u in graph.vertices:
        u.color = 'white'
        u.predecessor = None
    
    # Visit all vertices
    for each vertex u in graph.vertices:
        if u.color == 'white':
            dfs_visit(graph, u)

def dfs_visit(graph, u):
    u.color = 'gray'
    for v in graph.adjacency_list[u]:
        if v.color == 'white':
            v.predecessor = u
            dfs_visit(graph, v)
    u.color = 'black'
    print("Vertex:", u, "Predecessor:", u.predecessor)
`;

    return (
        <div>
            <span className="text-xl font-semibold">Python-like Pseudocode for DFS</span>
            <CopyBlock
                text={code}
                language="python"
                showLineNumbers={false}
                wrapLongLines={true}
                theme={nord}
            />
        </div>
    );
};