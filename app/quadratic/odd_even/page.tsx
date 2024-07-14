"use client";

import React from 'react';
import {insertionSort, oddEvenSort} from "@/lib/algorithms";
import AlgorithmPage from "@/components/algorithm-page";
import {EvenOddSortComponent, InsertionSortComponent} from "@/components/code-blocks";

export default function InsertionSortPage() {
    return (
        <AlgorithmPage name={"Odd-Even Sort"} sortFunction={oddEvenSort} bestCase={"O(n)"} avgCase={"O(n²)"} wortCase={"O(n²)"}>
            <EvenOddSortComponent/>
        </AlgorithmPage>
    )
}
