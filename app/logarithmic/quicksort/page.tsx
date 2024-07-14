"use client";

import React from 'react';
import {insertionSort, quickSort} from "@/lib/algorithms";
import AlgorithmPage from "@/components/algorithm-page";
import {QuickSortComponent} from "@/components/code-blocks";


export default function QuickSortPage() {
    return (
        <AlgorithmPage name={"QuickSort"} sortFunction={quickSort} bestCase={"O(n*lg(n))"} avgCase={"O(n²)"} wortCase={"O(n*lg(n))"}>
            <QuickSortComponent/>
        </AlgorithmPage>
    )
}
