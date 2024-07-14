"use client";

import React from 'react';
import {insertionSort, mergeSort, quickSort} from "@/lib/algorithms";
import AlgorithmPage from "@/components/algorithm-page";
import {HeapSortComponent, MergeSortComponent} from "@/components/code-blocks";

export default function MergesortPage() {
    return (
        <AlgorithmPage name={"MergeSort"} sortFunction={mergeSort} bestCase={"O(n*lg(n))"} avgCase={"O(n²)"} wortCase={"O(n*lg(n))"}>
            <MergeSortComponent/>
        </AlgorithmPage>
    )
}
