"use client";

import React from 'react';
import {heapSort, insertionSort, quickSort} from "@/lib/algorithms";
import AlgorithmPage from "@/components/algorithm-page";


export default function HeapsortPage() {
    return (
        <AlgorithmPage name={"HeapSort"} sortFunction={heapSort}></AlgorithmPage>
    )
}
