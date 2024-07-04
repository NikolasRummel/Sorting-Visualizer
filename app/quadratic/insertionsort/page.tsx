"use client";

import React from 'react';
import {insertionSort} from "@/lib/algorithms";
import AlgorithmPage from "@/components/algorithm-page";

export default function InsertionSortPage() {
    return (
        <AlgorithmPage name={"InsertionSort"} sortFunction={insertionSort}></AlgorithmPage>
    )
}
