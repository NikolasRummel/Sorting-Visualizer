import React from 'react';
import GraphVisualizerDFS from "@/components/dfs";
import GraphVisualizerBFS from "@/components/bfs";

const App: React.FC = () => {

    return (
        <div className="App">
            <h1 className="text-2xl font-bold mt-8 mb-4">Breadth-First Search</h1>
            <GraphVisualizerBFS />
        </div>
    );
}

export default App;
