"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { generateRandomArray } from "@/lib/utils";
import { insertionSort } from "@/lib/sorting-algorithms";
import Visualizer from "@/components/vizualizer";
import {PauseIcon, PlayIcon} from "lucide-react";

export default function InsertionSort() {
    const ARRAY_SIZE = 50;

    const [array, setArray] = useState<number[]>(generateRandomArray(ARRAY_SIZE));
    const [isPaused, setIsPaused] = useState<boolean>(true);

    const handleGenerateNewArray = () => {
        setArray(generateRandomArray(ARRAY_SIZE));
    };

    const handlePause = () => {
        console.log("Pause: " + isPaused);
        setIsPaused((prev) => !prev);
    };

    return (
        <section className="ml-4 mt-20 px-8">
            <div className="flex gap-2 mt-2 mb-2">
                <Button variant="outline" onClick={handleGenerateNewArray}>Generate sample array</Button>
                <Button variant="outline" onClick={handlePause}>
                    {isPaused ? <PlayIcon /> : <PauseIcon />}
                </Button>
            </div>

            <Visualizer
                algorithm={"InsertionSort"}
                array={array}
                sortFunction={insertionSort}
                isPaused={isPaused}
            />
        </section>
    );
}
