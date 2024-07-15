"use client";
import React, {useState, useEffect, useRef} from 'react';
import {Button} from "@/components/ui/button";
import {DicesIcon, PauseIcon, PlayIcon, RotateCcwIcon, Volume2Icon, VolumeXIcon} from "lucide-react";
import {Slider} from "@/components/ui/slider";

interface Node {
    id: number;
    x: number;
    y: number;
    color?: string;
    d: number;
    phi: number;
    neighbors: number[]; // Adjacency list to store neighbor ids
}

interface Edge {
    source: number;
    target: number;
}

const GraphVisualizerDFS: React.FC = () => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [visitedNodes, setVisitedNodes] = useState<number[]>([]);
    const [path, setPath] = useState<Edge[]>([]);
    const [isAnimating, setIsAnimating] = useState(false); // State to control animation
    const [updatedNodes, setUpdatedNodes] = useState<Node[]>([]); // State to manage updated nodes during DFS
    const [arraySize, setArraySize] = useState<number>(175); // Initial array size
    const [delay, setDelay] = useState<number>(50); // Initial delay in milliseconds
    const [isPaused, setIsPaused] = useState<boolean>(true); // State to track animation pause
    const [soundMuted, setSoundMuted] = useState<boolean>(false); // State to track sound toggle
    const audioContextRef = useRef<AudioContext | null>(null); // Reference for the audio context

    useEffect(() => {
        const getRandomNumber = (min: number, max: number) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        if (svgRef.current) {
            const svgRect = svgRef.current.getBoundingClientRect();
            const width = svgRect.width;
            const height = svgRect.height;

            const numberOfNodes = arraySize;
            const nodesData: Node[] = Array.from({length: numberOfNodes}, (_, index) => ({
                id: index,
                x: getRandomNumber(50, width - 50),
                y: getRandomNumber(50, height - 50),
                color: 'white', // Initialize all nodes as white for DFS color representation,
                d: Infinity, // Initialize distances to infinity
                phi: -1, // Initialize predecessor to -1 (undefined)
                neighbors: [], // Initialize empty array for neighbors
            }));

            // Calculate distances between nodes and find neighbors for each node
            for (let i = 0; i < numberOfNodes; i++) {
                const current = nodesData[i];
                let distances: { id: number; distance: number }[] = [];

                for (let j = 0; j < numberOfNodes; j++) {
                    if (i !== j) {
                        const neighbor = nodesData[j];
                        const distance = Math.sqrt(Math.pow(neighbor.x - current.x, 2) + Math.pow(neighbor.y - current.y, 2));
                        distances.push({id: neighbor.id, distance});
                    }
                }

                // Sort distances by distance
                distances.sort((a, b) => a.distance - b.distance);

                // Take the top 3 nearest neighbors
                const nearestNeighbors = distances.slice(0, getRandomNumber(2, 4)).map(entry => entry.id);
                current.neighbors = nearestNeighbors;
            }

            // Create edges based on neighbors of each node
            const edgesData: Edge[] = nodesData.reduce((acc: Edge[], node) => {
                node.neighbors.forEach(neighborId => {
                    acc.push({source: node.id, target: neighborId});
                });
                return acc;
            }, []);

            setNodes(nodesData);
            setEdges(edgesData);
            setUpdatedNodes(nodesData); // Initialize updatedNodes state
        }
    }, [arraySize]); // Re-run effect when arraySize changes

    const handleGenerateNewArray = () => {
        // Regenerate the graph with new random positions and neighbors
        // This will trigger the useEffect with the updated arraySize
        const newRandomSize = Math.floor(Math.random() * (200 - 5 + 1)) + 5; // Random size between 5 and 200
        setArraySize(newRandomSize);

        setVisitedNodes([])
        setPath([])

        setIsPaused(true);
    };

    const handlePause = async () => {
        setIsPaused(prev => !prev); // Toggle pause state
        if (isPaused) {
            await animateDFS(); // Start animation if paused
        }
    };

    const handleResetArray = () => {
        if (!isPaused) return; // Only reset when paused
        // Reset states to initial values
        setVisitedNodes([]);
        setPath([]);
        setIsAnimating(false);
        setNodes([]);
        setEdges([]);
        setUpdatedNodes([]);
        setArraySize(50);
        setDelay(50);
    };

    const handleSoundClick = () => {
        setSoundMuted(prev => !prev); // Toggle sound muted state
    };

    const handleArraySizeChange = (value: number[]) => {
        setArraySize(value[0]);
    };

    const handleDelayChange = (value: number[]) => {
        setDelay(value[0]);
    };

    const animateDFS = async () => {
        setIsAnimating(true); // Start animation

        const sourceNodeId = 0; // Start DFS from the first node

        // Reset previous state
        setVisitedNodes([]);
        setPath([]);

        // Implement DFS
        const stack: number[] = [];
        const nodesCopy = [...updatedNodes];

        // Initialize source node
        nodesCopy[sourceNodeId].color = 'orange';
        nodesCopy[sourceNodeId].d = 0;
        nodesCopy[sourceNodeId].phi = -1;
        stack.push(sourceNodeId);

        playSound(200);
        while (stack.length > 0) {
            playSound(300);
            const uIndex = stack.pop()!;
            const u = nodesCopy[uIndex];

            if (u.color === 'black') continue; // Skip already visited nodes

            // Get adjacent nodes
            const adjacentNodes = getAdjacentNodes(u, nodesCopy);

            for (const vIndex of adjacentNodes) {

                const v = nodesCopy[vIndex];

                if (v.color === 'white') {
                    playSound(400);

                    v.color = 'grey';
                    v.d = u.d + 1;
                    v.phi = u.id;
                    stack.push(v.id);

                    await animateVisit(u.id, v.id); // Animate visiting nodes (optional)
                }
            }

            u.color = 'black';
            setUpdatedNodes([...nodesCopy]);
            await new Promise(resolve => setTimeout(resolve, delay));
        }

        setIsAnimating(false); // End animation
    };

    const playSound = (value: number) => {
        if(soundMuted) return;

        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext)();
        }

        const audioContext = audioContextRef.current;
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.type = 'triangle';
        const frequency = 70 + (value);
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.135, audioContext.currentTime);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
        console.log(frequency);
    };

    const getAdjacentNodes = (node: Node, nodesCopy: Node[]): number[] => {
        // Get neighbors of the current node
        let adjacentNodes: number[] = node.neighbors.slice();

        // Include nodes where the current node is in their neighbors
        for (const otherNode of nodesCopy) {
            if (otherNode.neighbors.includes(node.id) && !adjacentNodes.includes(otherNode.id)) {
                adjacentNodes.push(otherNode.id);
            }
        }

        return adjacentNodes;
    };

    const animateVisit = async (sourceNodeId: number, targetNodeId: number) => {
        // Simulate animation or visualization of visiting nodes
        await new Promise(resolve => setTimeout(resolve, delay)); // Simulated delay for visualization
        setVisitedNodes(prevVisited => [...prevVisited, targetNodeId]);
        setPath(prevPath => [...prevPath, {source: sourceNodeId, target: targetNodeId}]);
    };

    return (
        <div className="p-4 px-8 pl-12">
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
                            min={125}
                            max={250}
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
            <svg
                className="w-full h-[500px] mr-20 border border-gray-200 dark:border-neutral-800 p-2 bg-white dark:bg-black rounded-xl"
                ref={svgRef}>
                {nodes.map(node => (
                    <g key={node.id}>
                        <circle
                            cx={node.x}
                            cy={node.y}
                            r={13}
                            className={`fill-current ${visitedNodes.includes(node.id) ? 'text-red-400' : node.id === 0 ? 'text-purple-500' : "text-blue-300"}`}
                            fill={node.color || 'white'} // Set node color dynamically
                        />
                        <text
                            x={node.x}
                            y={node.y + 5}
                            textAnchor="middle"
                            className="text-black"
                            fontSize="12px"
                        >
                            {node.id}
                        </text>
                    </g>
                ))}
                {edges.map((edge, index) => {
                    const sourceNode = updatedNodes.find(n => n.id === edge.source);
                    const targetNode = updatedNodes.find(n => n.id === edge.target);
                    if (!sourceNode || !targetNode) return null; // Skip rendering if nodes not found

                    const isPathEdge = path.some(p => (p.source === edge.source && p.target === edge.target) || (p.source === edge.target && p.target === edge.source));
                    return (
                        <line
                            key={index}
                            x1={sourceNode.x}
                            y1={sourceNode.y}
                            x2={targetNode.x}
                            y2={targetNode.y}
                            className={`stroke-current ${isPathEdge ? 'stroke-green-500' : 'stroke-gray-500'}`}
                        />
                    );
                })}
            </svg>
        </div>
    );
};

export default GraphVisualizerDFS;

