"use client";

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
    const [elapsedTime, setElapsedTime] = useState<number>(0); // Elapsed time in milliseconds
    const animationRef = useRef<number | null>(null);
    const pausedStepRef = useRef<number | null>(null); // Reference to store the paused step
    const timerRef = useRef<NodeJS.Timeout | null>(null); // Reference for the timer
    const audioContextRef = useRef<AudioContext | null>(null); // Reference for the audio context

    // Initialize sortingSteps with a single Step containing the unsorted array
    useEffect(() => {
        setSortingSteps([{ array, comparisons: 0 }]);
        setCurrentStep(0); // Reset currentStep when array changes
        setElapsedTime(0); // Reset elapsed time when array changes
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
                setSortingSteps(steps.map(step => ({ ...step, comparisons: step.comparisons ?? 0 })));

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
                const nextStep = currentStep + 1;
                setCurrentStep(nextStep);

                // Play sound for each comparison index
                const { comparisonIndices, sortedIndex, array } = sortingSteps[nextStep];
                if (comparisonIndices && comparisonIndices.length > 0 ) {
                    playSound(sortingSteps[nextStep].array[comparisonIndices[comparisonIndices.length - 1]]);
                }

                if (sortedIndex !== undefined) {
                    playSound(array[sortedIndex]);
                }

                animationRef.current = window.setTimeout(animateSort, delay); // Use delay for next step
            } else {
                // Clear the timer if animation is finished
                if (timerRef.current) {
                    clearInterval(timerRef.current);
                }
            }
        };

        if (!isPaused && currentStep < sortingSteps.length - 1) {
            animationRef.current = window.setTimeout(animateSort, delay); // Initial animation start
        }

        return () => {
            clearAnimation(); // Cleanup function to clear animation
        };
    }, [currentStep, sortingSteps, isPaused, delay]); // Include delay in dependencies

    useEffect(() => {
        if (!isPaused && currentStep < sortingSteps.length - 1) {
            timerRef.current = setInterval(() => {
                setElapsedTime(prevTime => prevTime + 10);
            }, 10); // Update every 10 milliseconds
        } else if ((isPaused || currentStep === sortingSteps.length - 1) && timerRef.current) {
            clearInterval(timerRef.current);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isPaused, currentStep, sortingSteps.length]);

    const clearAnimation = () => {
        if (animationRef.current) {
            clearTimeout(animationRef.current);
        }
    };

    const playSound = (value: number) => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext)();
        }
        const audioContext = audioContextRef.current;
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.type = 'sine';
        const frequency = 50 + (value); // Adjust frequency based on the current bar value
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime); // Frequency in Hz
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime); // Volume

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1); // Play sound for 100ms
        console.log(frequency);
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
                barClassName = 'bg-red-700';
            } else if (comparisonIndices && comparisonIndices.includes(index)) {
                barClassName = 'bg-red-400';
            }

            return (
                <div
                    key={index}
                    className={`relative h-full ${barClassName}`}
                    style={{
                        height: `${(value / Math.max(...array)) * 100}%`,
                        width: calculateBarWidth(array.length),
                    }}
                >
                </div>
            );
        });
    };

    const formatElapsedTime = (time: number): string => {
        const minutes = Math.floor(time / 60000).toString().padStart(2, '0');
        const seconds = Math.floor((time % 60000) / 1000).toString().padStart(2, '0');
        const milliseconds = Math.floor((time % 1000) / 10).toString().padStart(2, '0'); // Format as two-digit milliseconds
        return `${minutes}:${seconds}:${milliseconds}`;
    };

    return (
        <div className="border border-gray-200 dark:border-neutral-800 p-2 bg-white dark:bg-black rounded-xl">
            <div className="flex justify-between mb-4">
                <div className="font-semibold">
                    {algorithm}
                </div>
                <div className="text-xs text-gray-500">
                    Time: {formatElapsedTime(elapsedTime)}
                </div>
                <div className="text-xs text-gray-500">
                    Comparisons: {sortingSteps[currentStep]?.comparisons ?? 0}
                </div>
            </div>
            <div ref={containerRef} className="flex items-end h-64 mt-2 w-full gap-1" style={{ overflowX: 'auto' }}>
                {renderBars()}
            </div>
        </div>
    );
};

export default Visualizer;
