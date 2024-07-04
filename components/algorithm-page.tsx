"use client";

import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {generateRandomArray} from "@/lib/utils";
import {DicesIcon, PauseIcon, PlayIcon, RotateCcwIcon, Volume2Icon, VolumeXIcon} from "lucide-react";
import {heapSort, insertionSort, mergeSort, quickSort, Step} from "@/lib/algorithms";
import {Slider} from "@/components/ui/slider";
import Visualizer from "@/components/vizualizer";
import {CopyBlock, nord, atomOneDark} from "react-code-blocks";
import ComplexityInfo from "@/components/complexity-info";
import LatexExpression from "@/components/latex-expression";

const ARRAY_SIZE_DEFAULT = 25;
const DELAY_DEFAULT = 50;

interface IAlgorithmPageProps {
    name: string;
    sortFunction: (array: number[]) => Promise<Step[]>;
}


export default function AlgorithmPage({name, sortFunction}: IAlgorithmPageProps) {
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

            <Visualizer
                algorithm={name}
                array={array}
                isPaused={isPaused}
                sortFunction={sortFunction}
                delay={delay}
                soundMuted={soundMuted}
            />

            <div className="grid grid-cols-2 gap-12 mt-12">
                <div className="">
                    <span className="text-xl font-semibold">Complexity</span>
                    <span className="block">
                        Insertion sort is a simple sorting algorithm that builds the final sorted array one item at a
                        time. It is much less efficient on large lists than more advanced algorithms such as quicksort,
                        heapsort, or merge sort. However, insertion sort provides several advantages:
                    </span>
                    <ul className="list-disc ml-5 mt-2">
                        <li><strong>Best Case:</strong> O(n) - This occurs when the array is already sorted. The
                            algorithm only passes through the list once, performing a minimal number of comparisons.
                        </li>
                        <li><strong>Average Case:</strong> O(n^2) - This occurs when the elements are in random order.
                            The algorithm must compare and shift elements multiple times, leading to quadratic time
                            complexity.
                        </li>
                        <li><strong>Worst Case:</strong> O(n^2) - This occurs when the array is sorted in reverse order.
                            The algorithm must move each element past every other element, resulting in the maximum
                            number of comparisons and shifts.
                        </li>
                    </ul>
                    <span className="block mt-2">
                        Insertion sort is particularly useful for small datasets or for nearly sorted arrays where it
                        can perform very efficiently.
                    </span>
                </div>
                <div>
                    <span className="text-xl font-semibold">Complexity</span>
                    <ComplexityInfo best={"O(n)"} avg={"O(n^2)"} worst={"O(n^2)"}/>
                    <div className={"mt-8"}>
                        <span className="text-xl font-semibold">Java Code</span>
                        <div className="mt-2">
                            <CopyBlock
                                text={"public static int[] insertionSort(int[] sortieren) {\n" +
                                    "\t\tint temp;\n" +
                                    "\t\tfor (int i = 1; i < sortieren.length; i++) {\n" +
                                    "\t\t\ttemp = sortieren[i];\n" +
                                    "\t\t\tint j = i;\n" +
                                    "\t\t\twhile (j > 0 && sortieren[j - 1] > temp) {\n" +
                                    "\t\t\t\tsortieren[j] = sortieren[j - 1];\n" +
                                    "\t\t\t\tj--;\n" +
                                    "\t\t\t}\n" +
                                    "\t\t\tsortieren[j] = temp;\n" +
                                    "\t\t}\n" +
                                    "\t\treturn sortieren;\n" +
                                    "\t}"}
                                language={"java"}
                                showLineNumbers={false}
                                wrapLongLines={true}
                                theme={nord}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h2 className="text-xl font-semibold mt-4">Probabilistic Analysis</h2>
                <LatexExpression text={"y = f(x) = a^x \\text{mit } a>0, a \\not= 1"}/>
            </div>

        </section>
    );
}
