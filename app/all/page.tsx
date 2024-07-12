"use client";

import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {generateRandomArray} from "@/lib/utils";
import {DicesIcon, PauseIcon, PlayIcon, RotateCcwIcon, Volume2Icon, VolumeXIcon} from "lucide-react";
import {Slider} from "@/components/ui/slider";
import Visualizer from "@/components/vizualizer";
import {bubbleSort, heapSort, insertionSort, mergeSort, quickSort} from "@/lib/algorithms";

const ARRAY_SIZE_DEFAULT = 25;
const DELAY_DEFAULT = 50;

export default function AllAlgosPage() {
    const [arraySize, setArraySize] = useState<number>(ARRAY_SIZE_DEFAULT);
    const [delay, setDelay] = useState<number>(DELAY_DEFAULT);
    const [initialArray, setInitialArray] = useState<number[]>(generateRandomArray(arraySize));
    const [array, setArray] = useState<number[]>(initialArray);
    const [isPaused, setIsPaused] = useState<boolean>(true);
    const [soundMuted, setSoundMuted] = useState<boolean>(false);

    const handleGenerateNewArray = () => {
        const newArray = generateRandomArray(arraySize);
        setInitialArray(newArray);
        setArray(newArray);
        setIsPaused(true);
    };

    const handleResetArray = () => {
        setArray([...initialArray]);
        setIsPaused(true);
    };

    const handlePause = () => {
        setIsPaused((prev) => !prev);
    };

    const handleSoundClick = () => {
        setSoundMuted((prev) => !prev);
    };

    function handleArraySizeChange(value: number[]) {
        const newSize = value[0];
        setArraySize(newSize);
        const newArray = generateRandomArray(newSize);
        setInitialArray(newArray);
        setArray(newArray);
        setIsPaused(true);
    }

    function handleDelayChange(value: number[]) {
        const newDelay = value[0];
        setDelay(newDelay);
    }

    return (
        <section className="ml-4 mt-24 px-8">
            <div className="flex gap-4 justify-end mb-8">
                <Button variant="outline" onClick={handleGenerateNewArray} className="h-10"><DicesIcon/></Button>
                <Button variant="outline" onClick={handlePause}>
                    {isPaused ? <PlayIcon/> : <PauseIcon/>}
                </Button>
                <Button variant="destructive" onClick={handleResetArray} className={`${isPaused ? "opacity-40" : ""}`}>
                    <RotateCcwIcon/>
                </Button>
                <Button variant="outline" onClick={handleSoundClick}>
                    {soundMuted ? <VolumeXIcon/> : <Volume2Icon/>}
                </Button>
                <div className="flex items-center h-10 ml-auto">
                    <div className="w-56 h-8">
                        <Slider
                            min={5}
                            max={200}
                            value={[arraySize]}
                            onValueChange={handleArraySizeChange}
                            className="w-full mb-1"
                        />
                        <span className="block text-center">Array size: {arraySize}</span>
                    </div>
                </div>

                <div className="flex items-center h-10">
                    <div className="w-56 h-8">
                        <Slider
                            min={1}
                            max={100}
                            value={[delay]}
                            onValueChange={handleDelayChange}
                            className="w-full mb-1"
                        />
                        <span className="block text-center">Delay: {delay} ms</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">

                <Visualizer
                    algorithm={"InsetionSort"}
                    array={array}
                    isPaused={isPaused}
                    sortFunction={insertionSort}
                    delay={delay}
                    soundMuted={soundMuted}
                />

                <Visualizer
                    algorithm={"BubbleSort"}
                    array={array}
                    isPaused={isPaused}
                    sortFunction={bubbleSort}
                    delay={delay}
                    soundMuted={soundMuted}
                />

                <Visualizer
                    algorithm={"MergeSort"}
                    array={array}
                    isPaused={isPaused}
                    sortFunction={mergeSort}
                    delay={delay}
                    soundMuted={soundMuted}
                />

                <Visualizer
                    algorithm={"HeapSort"}
                    array={array}
                    isPaused={isPaused}
                    sortFunction={heapSort}
                    delay={delay}
                    soundMuted={soundMuted}
                />

                <div className={"col-span-2"}>
                    <Visualizer
                        algorithm={"QuickSort"}
                        array={array}
                        isPaused={isPaused}
                        sortFunction={quickSort}
                        delay={delay}
                        soundMuted={soundMuted}
                    />
                </div>
            </div>
        </section>
    );
}
