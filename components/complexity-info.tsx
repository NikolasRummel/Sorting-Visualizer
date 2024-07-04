import React from 'react';

interface IComplexityInfoProps {
    best: string;
    avg: string;
    worst: string;
}

const ComplexityInfo = ({ best, avg, worst } : IComplexityInfoProps) => {
    const cases = [
        { label: "Best Case", complexity: best },
        { label: "Average Case", complexity: avg },
        { label: "Worst Case", complexity: worst }
    ];

    return (
        <div className="flex flex-col gap-2 border border-gray-200 dark:border-neutral-800 p-2 bg-white dark:bg-black rounded-xl mt-2">
            {cases.map((item) => (
                <div key={item.label} className="grid grid-cols-2">
                    <label className="text-md text-muted-foreground">
                        {item.label}
                    </label>
                    <span>{item.complexity}</span>
                </div>
            ))}
        </div>
    );
};

export default ComplexityInfo;
