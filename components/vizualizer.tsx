import React, {useEffect, useState, useRef} from 'react';
import {Step} from "@/lib/sorting-algorithms";


interface VisualizerProps {
    algorithm: string;
    array: number[];
    sortFunction: (array: number[]) => Promise<Step[]>;
}

const DELAY = 25;

const Visualizer: React.FC<VisualizerProps> = ({algorithm, array, sortFunction}: VisualizerProps) => {
    const [steps, setSteps] = useState<Step[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const animateSort = async () => {
            const start = Date.now();
            setStartTime(start);
            const steps = await sortFunction(array);
            setSteps(steps);
            setCurrentIndex(0);
            animateSteps(steps.length, start);
        };

        const animateSteps = (totalSteps: number, start: number) => {
            let index = 0;
            const interval = setInterval(() => {
                setCurrentIndex(index);
                index++;
                if (index >= totalSteps) {
                    clearInterval(interval);
                    const end = Date.now();
                    setElapsedTime(end - start);
                }
            }, DELAY);
        };

        animateSort();
    }, [array, sortFunction]);

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.clientWidth;
                setContainerWidth(containerWidth);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const calculateBarWidth = (arrayLength: number): string => {
        if (containerWidth === 0) {
            return 'auto';
        }

        const totalMargin = 2 * (arrayLength - 1);
        const availableWidth = containerWidth - totalMargin;
        const barWidth = availableWidth / arrayLength;

        return `${barWidth}px`;
    };


    useEffect(() => {
        if (steps[currentIndex]) {
            const currentArray = steps[currentIndex].array;
            const currentActionIndices = steps[currentIndex].actionIndices;
            console.log('Current Array:', currentArray);
            console.log('Current Action Indices:', currentActionIndices);
        }
    }, [steps, currentIndex]);

    return (
        <div className="border border-gray-200 p-2 bg-accent">
            <div className="flex justify-center mb-4">
                <span className="font-semibold">{algorithm}</span>
            </div>
            <div ref={containerRef} className="flex items-end h-64 mt-2 w-full gap-1" style={{overflowX: 'auto'}}>
                {steps.length === 0 || currentIndex >= steps.length || !steps[currentIndex] ? (
                    <p className="text-gray-500">Sorting...</p>
                ) : (
                    steps[currentIndex].array.map((value, index) => (
                        <div
                            key={index}
                            className={`h-full ${steps[currentIndex].actionIndices.includes(index) ? 'bg-red-500' : 'bg-gray-300'}`}
                            style={{
                                height: `${(value / Math.max(...steps[currentIndex].array)) * 100}%`,
                                width: calculateBarWidth(steps[currentIndex].array.length),
                                transition: 'height 0.2s ease-in-out',
                            }}
                        />
                    ))
                )}
            </div>
            {elapsedTime > 0 ? (
                <div className="flex justify-center mt-2">
                    <span className="text-sm text-gray-600">Sorting completed in {elapsedTime / 1000} seconds</span>
                </div>
            ) : (
                <div className="flex justify-center mt-2">
                    <span className="text-sm text-gray-600">Sorting...</span>
                </div>
            )}

        </div>
    );
};

export default Visualizer;
