"use client";

import React from 'react';
import AlgorithmPage from "@/components/algorithm-page";
import {bubbleSort} from "@/lib/algorithms";
import {BubbleSortComponent, InsertionSortComponent} from "@/components/code-blocks";

export default function BubbleSortPage() {
    return (
        <AlgorithmPage name={"Bubblesort"} sortFunction={bubbleSort} bestCase={"O(n)"} avgCase={"O(n²)"} wortCase={"O(n²)"}>
            <BubbleSortComponent/>
        </AlgorithmPage>
    )
}
