"use client";

import React from 'react';
import {insertionSort, mergeSort, quickSort} from "@/lib/algorithms";
import AlgorithmPage from "@/components/algorithm-page";

export default function MergesortPage() {
    return (
        <AlgorithmPage name={"MergeSort"} sortFunction={mergeSort}></AlgorithmPage>
    )
}
