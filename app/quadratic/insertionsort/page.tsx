"use client";

import React from 'react';
import {insertionSort} from "@/lib/algorithms";
import AlgorithmPage from "@/components/algorithm-page";
import {InsertionSortComponent} from "@/components/code-blocks";

export default function InsertionSortPage() {
    return (
        <AlgorithmPage name={"InsertionSort"} sortFunction={insertionSort} bestCase={"O(n)"} avgCase={"O(n²)"} wortCase={"O(n²)"}>
            <InsertionSortComponent/>
        </AlgorithmPage>
    )
}
