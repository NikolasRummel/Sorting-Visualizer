import React, { useEffect, useState, useRef } from 'react';
import { Step } from "@/lib/sorting-algorithms";

interface VisualizerProps {
    algorithm: string;
    array: number[];
    sortFunction: (array: number[]) => Promise<Step[]>;
    isPaused: boolean;
}

const DELAY = 25;

const Visualizer: React.FC<VisualizerProps> = ({ algorithm, array, sortFunction, isPaused }: VisualizerProps) => {
    const [sortingSteps, setSortingSteps] = useState<Step[]>([]);
    const [currentStep, setCurrentStep] = useState<number>(-1);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const intervalId = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        let mounted = true;

        const animateSort = async () => {
            const start = Date.now();
            const steps = await sortFunction(array);
            setSortingSteps(steps);

            for (let i = 0; i < steps.length; i++) {
                if (!mounted || isPaused) {
                    return;
                }

                setCurrentStep(i);
                await new Promise(resolve => setTimeout(resolve, DELAY));
            }

            setElapsedTime(Date.now() - start);
        };

        if (array.length > 0 && !isPaused) {
            animateSort();
        }

        return () => {
            mounted = false;
            if (intervalId.current) {
                clearInterval(intervalId.current);
            }
        };
    }, [array, isPaused, sortFunction]);

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.clientWidth);
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

    return (
        <div className="border border-gray-200 dark:border-gray-900 p-2 bg-white dark:bg-neutral-900 rounded-xl">
            <div className="flex justify-center mb-4">
                <span className="font-semibold">{algorithm}</span>
            </div>
            <div ref={containerRef} className="flex items-end h-64 mt-2 w-full gap-1" style={{ overflowX: 'auto' }}>
                {sortingSteps.length === 0 ? (
                    <p className="text-gray-500">Sorting...</p>
                ) : (
                    sortingSteps[currentStep]?.array.map((value, index) => (
                        <div
                            key={index}
                            className={`h-full ${sortingSteps[currentStep]?.actionIndices.includes(index) ? 'bg-red-500 dark:bg-red-600' : 'bg-gray-300 dark:bg-neutral-100'}`}
                            style={{
                                height: `${(value / Math.max(...array)) * 100}%`,
                                width: calculateBarWidth(array.length),
                                transition: 'height 0.05s ease-in-out',
                            }}
                        />
                    ))
                )}
            </div>
            {elapsedTime > 0 && (
                <div className="flex justify-center mt-2">
                    <span className="text-sm text-gray-600">Sorting completed in {elapsedTime / 1000} seconds</span>
                </div>
            )}
        </div>
    );
};

export default Visualizer;
