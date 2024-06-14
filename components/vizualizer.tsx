import React, { useEffect, useState } from 'react';

interface VisualizerProps {
    algorithm: string;
    array: number[];
}

const Visualizer: React.FC<VisualizerProps> = ({ array, algorithm }: VisualizerProps) => {
    const [sortedArray, setSortedArray] = useState<number[]>([]);

    useEffect(() => {
        setSortedArray(array);
    }, [array]);

    return (
        <div className="border border-gray-200 p-2 bg-accent ">
            <div className={"flex justify-center mb-4"}>
                <span className="">{algorithm}</span>
            </div>
            <div className="flex items-end h-64 mt-4 w-full gap-1">
                {sortedArray.map((value, index) => (
                    <div
                        key={index}
                        className="bg-blue-500 text-white text-center mt-2"
                        style={{
                            height: `${value}px`,
                            flex: '1 0 auto',
                        }}
                    >
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Visualizer;
