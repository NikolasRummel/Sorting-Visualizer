"use client";

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Visualizer from "@/components/vizualizer";
import React, {useState} from "react";
import {generateRandomArray} from "@/lib/utils";
import {bubbleSort, heapSort, insertionSort, mergeSort, quickSort} from "@/lib/sorting-algorithms";

export default function Home() {
    const ARRAY_SIZE = 50;

    const [array, setArray] = useState<number[]>(generateRandomArray(ARRAY_SIZE));

    const handleGenerateNewArray = () => {
        setArray(generateRandomArray(ARRAY_SIZE));
    };

    return (
        <section className="ml-4 mt-20">
            <h2>Sorting visualizer</h2>
            <div className="flex gap-2 mt-2">
                <Input type="text" value={array.join(', ')} readOnly/>
                <Button variant="outline" onClick={handleGenerateNewArray}>Generate sample array</Button>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-20">
            </div>
        </section>
    );
}
