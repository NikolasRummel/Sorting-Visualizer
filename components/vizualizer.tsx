import React, { useEffect, useState, useRef } from 'react';

interface VisualizerProps {
    algorithm: string;
    array: number[];
    sortFunction: (array: number[]) => Promise<number[][]>;
}

const Visualizer: React.FC<VisualizerProps> = ({ array, algorithm, sortFunction }: VisualizerProps) => {
    const [steps, setSteps] = useState<number[][]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [startTime, setStartTime] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const animateSort = async () => {
            const start = Date.now(); // Start timing
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
                    const end = Date.now(); // End timing
                    setElapsedTime(end - start); // Calculate elapsed time
                }
            }, 1);
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

    const [containerWidth, setContainerWidth] = useState<number>(0);
    const calculateBarWidth = (arrayLength: number): string => {
        if (containerWidth === 0) {
            return 'auto';
        }

        const totalMargin = 2 * (arrayLength - 1);
        const availableWidth = containerWidth - totalMargin;
        const barWidth = availableWidth / arrayLength;

        return `${barWidth}px`;
    };

    const calculateBarHeight = (value: number): string => {
        if (steps[currentIndex]) {
            const maxHeight = Math.max(...steps[currentIndex]);
            const normalizedHeight = (value / maxHeight) * 100;
            return `${normalizedHeight}%`;
        }
        return '0%';
    };

    return (
        <div className="border border-gray-200 p-2 bg-accent">
            <div className="flex justify-center mb-4">
                <span className="font-semibold">{algorithm}</span>
            </div>
            <div ref={containerRef} className="flex items-end h-64 mt-2 w-full gap-1" style={{ overflowX: 'auto' }}>
                {steps.length === 0 || currentIndex >= steps.length || !steps[currentIndex] ? (
                    <p className="text-gray-500">Sorting...</p>
                ) : (
                    steps[currentIndex].map((value, index) => (
                        <div
                            key={index}
                            className="bg-blue-500"
                            style={{
                                height: calculateBarHeight(value),
                                width: calculateBarWidth(steps[currentIndex].length),
                                transition: 'height 0.2s ease-in-out',
                            }}
                        >
                        </div>
                    ))
                )}
            </div>
            {elapsedTime > 0 && (
                <div className="flex justify-center mt-4">
                    <p className="text-sm text-gray-600">Sorting completed in {elapsedTime / 1000} seconds</p>
                </div>
            )}
        </div>
    );
};

export default Visualizer;
