import React from 'react';
import GraphVisualizerDFS from "@/components/dfs";

const App: React.FC = () => {
    return (
        <div className="App">
            <h1 className="text-2xl font-bold mt-8 mb-4">Depth-First Search</h1>
            <GraphVisualizerDFS/>
        </div>
    );
}

export default App;
