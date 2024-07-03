import React, { useEffect, useState, useRef } from 'react';
import { Step } from "@/lib/algorithms";

interface VisualizerProps {
    algorithm: string;
    array: number[];
    isPaused: boolean;
    sortFunction: (array: number[]) => Promise<Step[]>;
    delay: number; // Simulation speed in milliseconds
}

const Visualizer: React.FC<VisualizerProps> = ({ algorithm, array, isPaused, sortFunction, delay }: VisualizerProps) => {
    const [sortingSteps, setSortingSteps] = useState<Step[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState<number>(() => containerRef.current?.clientWidth ?? 0);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const animationRef = useRef<number | null>(null);
    const pausedStepRef = useRef<number | null>(null); // Reference to store the paused step

    // Initialize sortingSteps with a single Step containing the unsorted array
    useEffect(() => {
        setSortingSteps([{ array }]);
        setCurrentStep(0); // Reset currentStep when array changes
        clearAnimation(); // Clear animation when array changes

    }, [array]);

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

    useEffect(() => {
        const sortArray = async () => {
            if (!isPaused) {
                const steps = await sortFunction([...array]);
                setSortingSteps(steps);

                // Resume from the paused step if necessary
                if (pausedStepRef.current !== null) {
                    setCurrentStep(pausedStepRef.current);
                    pausedStepRef.current = null; // Clear the paused step reference
                }
            }
        };

        // Only trigger sortArray if not paused
        sortArray();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [array, isPaused]);

    useEffect(() => {
        // Animation loop to progress through sorting steps
        const animateSort = () => {
            if (!isPaused && currentStep < sortingSteps.length - 1) {
                setCurrentStep((prevStep) => prevStep + 1);
                animationRef.current = window.setTimeout(animateSort, delay); // Use speed for delay
            }
        };

        if (!isPaused && currentStep < sortingSteps.length - 1) {
            animationRef.current = window.setTimeout(animateSort, delay); // Initial animation start
        }

        return () => {
            clearAnimation(); // Cleanup function to clear animation
        };
    }, [currentStep, sortingSteps, isPaused, delay]); // Include speed in dependencies

    const clearAnimation = () => {
        if (animationRef.current) {
            clearTimeout(animationRef.current);
        }
    };

    const calculateBarWidth = (arrayLength: number): string => {
        if (containerWidth === 0) {
            return 'auto';
        }

        const totalMargin = 2 * (arrayLength - 1);
        const availableWidth = containerWidth - totalMargin;
        const barWidth = availableWidth / arrayLength;

        return `${barWidth}px`;
    };

    const renderBars = () => {
        if (sortingSteps.length === 0) {
            return null; // Render nothing when sortingSteps is empty
        }

        const { array: currentArray, currentIndex, sortedIndex, comparisonIndices } = sortingSteps[currentStep];

        return currentArray.map((value, index) => {
            let barClassName = 'bg-gray-300 dark:bg-neutral-100';

            if (sortedIndex !== undefined && index <= sortedIndex) {
                barClassName = 'bg-green-500';
            } else if (index === currentIndex) {
                barClassName = 'bg-red-500';
            } else if (comparisonIndices && comparisonIndices.includes(index)) {
                barClassName = 'bg-red-400';
            }

            return (
                <div
                    key={index}
                    className={`h-full ${barClassName}`}
                    style={{
                        height: `${(value / Math.max(...array)) * 100}%`,
                        width: calculateBarWidth(array.length),
                    }}
                />
            );
        });
    };

    return (
        <div className="border border-gray-200 dark:border-gray-900 p-2 bg-white dark:bg-neutral-900 rounded-xl">
            <div className="flex justify-center mb-4">
                <span className="font-semibold">{algorithm}</span>
            </div>
            <div ref={containerRef} className="flex items-end h-64 mt-2 w-full gap-1" style={{ overflowX: 'auto' }}>
                {renderBars()}
            </div>
        </div>
    );
};
export default Visualizer;
