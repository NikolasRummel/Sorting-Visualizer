"use client";

import React from 'react';
import GraphVisualizerDFS from "@/components/dfs";
import GraphVisualizerBFS from "@/components/bfs";
import {BfsComponent} from "@/components/code-blocks";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import CorrectnessProof from "@/components/correctness-proof";
import InsertionSortAverageCaseAnalysis from "@/components/insertion";
import ComplexityInfo from "@/components/complexity-info";

const BFS: React.FC = () => {
    return (
        <div className="mx-2">
            <h1 className="text-2xl font-bold mt-8 mb-4">Breadth-First Search</h1>
            <GraphVisualizerBFS/>
            <div className="grid grid-cols-2 gap-12 mt-12">
                <Accordion type="single" collapsible defaultValue={"item-1"} className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Show Description</AccordionTrigger>
                        <AccordionContent>
                            <div>
                                <span className="text-xl font-semibold">Description</span>
                                <span className="block">
                                    Breadth-First Search (BFS) is a graph traversal algorithm that explores vertices in the order of their distance from the source vertex. It uses a queue to keep track of the next vertex to visit.
                                </span>
                                                    <span className="block mt-2">
                                    Here is a step-by-step breakdown of how BFS works:
                                </span>
                                <ol className="list-decimal ml-5 mt-2">
                                    <li><strong>Initialization:</strong> Set the color of all vertices to white
                                        (unvisited), distance to infinity, and predecessor to null. Set the source
                                        vertex&apos;s color to gray (visited), distance to 0, and predecessor to null.
                                        Initialize an empty queue and enqueue the source vertex.
                                    </li>
                                    <li><strong>Dequeue and Visit:</strong> Dequeue a vertex u from the queue. For each
                                        adjacent vertex v of u, if v is white (unvisited), set its color to gray, update
                                        its distance, set its predecessor to u, and enqueue v.
                                    </li>
                                    <li><strong>Mark as Processed:</strong> After processing all adjacent vertices of u,
                                        set its color to black (fully processed).
                                    </li>
                                    <li><strong>Repeat:</strong> Repeat steps 2 and 3 until the queue is empty.
                                    </li>
                                </ol>
                                <span className="block mt-2">
                                    BFS is useful for finding the shortest path in unweighted graphs, and for traversing or searching tree or graph data structures.
                                </span>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <div className="mt-10">
                    <BfsComponent/>
                </div>
            </div>
        </div>
    );
}

export default BFS;
