"use client";

import React from 'react';
import AlgorithmPage from "@/components/algorithm-page";
import {bubbleSort} from "@/lib/algorithms";

export default function BubbleSortPage() {
    return (
        <AlgorithmPage name={"Bubblesort"} sortFunction={bubbleSort}></AlgorithmPage>
    )
}
