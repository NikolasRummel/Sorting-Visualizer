"use client";

import React from 'react';
import {insertionSort, oddEvenSort} from "@/lib/algorithms";
import AlgorithmPage from "@/components/algorithm-page";

export default function InsertionSortPage() {
    return (
        <AlgorithmPage name={"Odd-Even Sort"} sortFunction={oddEvenSort}></AlgorithmPage>
    )
}
