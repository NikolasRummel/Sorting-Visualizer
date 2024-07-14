"use client";

import React from 'react';
import {bubbleSort, heapSort, insertionSort, quickSort} from "@/lib/algorithms";
import AlgorithmPage from "@/components/algorithm-page";
import {HeapSortComponent} from "@/components/code-blocks";


export default function HeapsortPage() {
    return (
        <AlgorithmPage name={"Heapsort"} sortFunction={heapSort} bestCase={"O(n*lg(n))"} avgCase={"O(n²)"} wortCase={"O(n*lg(n))"}>
            <HeapSortComponent/>
        </AlgorithmPage>
    )
}
