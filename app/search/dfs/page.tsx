"use client";

import React from 'react';
import GraphVisualizerDFS from "@/components/dfs";
import GraphVisualizerBFS from "@/components/bfs";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import CorrectnessProof from "@/components/correctness-proof";
import InsertionSortAverageCaseAnalysis from "@/components/insertion";
import {BfsComponent, DfsComponent} from "@/components/code-blocks";

const App: React.FC = () => {
    return (
        <div className="App">
            <h1 className="text-2xl font-bold mt-8 mb-4">Depth-First Search</h1>
            <GraphVisualizerDFS/>
            <div className="grid grid-cols-2 gap-12 mt-12">
                <Accordion type="single" collapsible defaultValue={"item-1"} className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Show Description</AccordionTrigger>
                        <AccordionContent>
                            <div>
                                <span className="text-xl font-semibold">Description</span>
                                <span className="block">
                                    Depth-First Search (DFS) is a graph traversal algorithm that explores as far as possible along each branch before backtracking. It uses a stack to keep track of the next vertex to visit, which can be implemented using recursion.
                                </span>
                                                    <span className="block mt-2">
                                    Here is a step-by-step breakdown of how DFS works:
                                </span>
                                <ol className="list-decimal ml-5 mt-2">
                                    <li><strong>Initialization:</strong> Set the color of all vertices to white (unvisited) and predecessor to null. Start with the source vertex and call the recursive DFS function.
                                    </li>
                                    <li><strong>Visit:</strong> In the recursive DFS function, set the vertex u&apos;s color to gray (visited). For each adjacent vertex v of u, if v is white (unvisited), set its predecessor to u and recursively visit v.
                                    </li>
                                    <li><strong>Mark as Processed:</strong> After processing all adjacent vertices of u, set its color to black (fully processed).
                                    </li>
                                    <li><strong>Repeat:</strong> The recursion handles the repetition until all vertices connected to the source are processed.
                                    </li>
                                </ol>
                                <span className="block mt-2">
                                DFS is useful for solving problems related to connectivity in graphs, finding strongly connected components, and detecting cycles in graphs.
                            </span>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                </Accordion>
                <div className="mt-10">
                    <DfsComponent/>
                </div>
            </div>
        </div>
    );
}

export default App;
