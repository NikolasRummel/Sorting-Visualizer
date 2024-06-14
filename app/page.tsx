"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Visualizer from "@/components/vizualizer";
import { useState } from "react";
import { generateRandomArray } from "@/lib/utils";

export default function Home() {
    const ARRAY_SIZE = 50;

    const [array, setArray] = useState<number[]>(generateRandomArray(ARRAY_SIZE));

    const handleGenerateNewArray = () => {
        setArray(generateRandomArray(ARRAY_SIZE));
    };

    return (
        <main className="m-8">
            <h1>Sorting visualizer</h1>
            <div className="flex gap-2 mt-2">
                <Input type="text" value={array.join(', ')} readOnly />
                <Button variant="outline" onClick={handleGenerateNewArray}>Generate sample array</Button>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-20">
                    <Visualizer algorithm={"InsertionSort"} array={array} />
                    <Visualizer algorithm={"BubbleSort"} array={array} />
                    <Visualizer algorithm={"SelectionSort"} array={array} />
                    <Visualizer algorithm={"MergeSort"} array={array} />
                    <Visualizer algorithm={"QuickSort"} array={array} />
            </div>
        </main>
    );
}
