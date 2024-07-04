"use client";

import React from 'react';
import {insertionSort, quickSort} from "@/lib/algorithms";
import AlgorithmPage from "@/components/algorithm-page";


export default function QuickSortPage() {
    return (
        <AlgorithmPage name={"QuickSort"} sortFunction={quickSort}></AlgorithmPage>
    )
}
