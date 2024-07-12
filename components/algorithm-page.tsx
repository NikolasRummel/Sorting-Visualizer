"use client";

import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {generateRandomArray} from "@/lib/utils";
import {DicesIcon, PauseIcon, PlayIcon, RotateCcwIcon, Volume2Icon, VolumeXIcon} from "lucide-react";
import {Step} from "@/lib/algorithms";
import {Slider} from "@/components/ui/slider";
import Visualizer from "@/components/vizualizer";
import {CopyBlock, nord, atomOneDark} from "react-code-blocks";
import ComplexityInfo from "@/components/complexity-info";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import InsertionSortAverageCaseAnalysis from "@/components/insertion";
import CorrectnessProof from "@/components/correctness-proof";

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
                <Accordion type="single" collapsible defaultValue={"item-1"} className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Show Description</AccordionTrigger>
                        <AccordionContent>
                            <div>
                                <span className="text-xl font-semibold">Description</span>
                                <span className="block">
                                    Insertion sort is a straightforward sorting algorithm that builds the final sorted array or list one element at a time. It works by iterating over each element in the array and inserting it into its correct position relative to the elements that have already been sorted.
                                </span>
                                            <span className="block mt-2">
                                    Here is a step-by-step breakdown of how insertion sort works:
                                </span>
                                            <ol className="list-decimal ml-5 mt-2">
                                                <li><strong>Start:</strong> Begin with the second element (index 1) assuming the
                                                    first element
                                                    is trivially sorted.
                                                </li>
                                                <li><strong>Comparison and Insertion:</strong> Iterate through the unsorted portion
                                                    of the
                                                    array. For each element, compare it with the elements in the sorted portion (to
                                                    its left)
                                                    and insert it into its correct position.
                                                </li>
                                                <li><strong>Shifting:</strong> Shift larger elements one position to the right to
                                                    make space for
                                                    the current element being inserted.
                                                </li>
                                                <li><strong>Repeat:</strong> Repeat steps 2 and 3 until all elements in the array
                                                    are sorted.
                                                </li>
                                            </ol>
                                            <span className="block mt-2">
                                    Insertion sort is efficient for small datasets or nearly sorted arrays, where it can perform in linear time complexity in the best-case scenario. However, for larger datasets with random order or reverse-sorted order, insertion sort performs with quadratic time complexity, making it less efficient compared to advanced algorithms like quicksort or merge sort.
                                </span>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Show Proof Of Correctness</AccordionTrigger>
                        <AccordionContent>
                            <CorrectnessProof/>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Show Probalistic Analysis</AccordionTrigger>
                        <AccordionContent>
                            <InsertionSortAverageCaseAnalysis/>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
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
        </section>
    );
}
