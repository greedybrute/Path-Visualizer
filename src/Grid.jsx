import { React, useState } from "react";
import { Node } from "./Node";
import "./grid.css";
import {
  dijkstra,
  getNodesInShortestPathOrderDijkstra,
} from "./Algorithms/dijkastra";
import { dfsExpo, getNodesInShortestPathOrderDfs } from "./Algorithms/dfs";
function Grid() {
  const grid = [];
  const [sAndD, setsAndD] = useState(0);
  const [nodeDetail, setNodeDetail] = useState([]);
  const [algo, setAlgo] = useState("1");
  for (let i = 0; i < 20; i++) {
    const currentRow = [];
    for (let j = 0; j < 61; j++) {
      let type = "normal";
      currentRow.push({
        i,
        j,
        type,
        distance: Infinity,
        isVisited: false,
        previousNode: null,
      });
    }
    grid.push(currentRow);
  }
  function animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.i}-${node.j}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  }
  function handleChange(e) {
    setAlgo(e.target.value);
  }
  function animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.i}-${node.j}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }
  function clear() {
    setsAndD(0);
    setNodeDetail([]);
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 61; j++) {
        document.getElementById(`node-${i}-${j}`).className = "node";
      }
    }
  }
  function runAlgo() {
    const startNode = grid[nodeDetail[0]][nodeDetail[1]];
    const finishNode = grid[nodeDetail[2]][nodeDetail[3]];
    // const visitedNodesInOrder=
    console.log(algo);
    if (algo === "1") {
      const visitedNodesInOrder = dfsExpo(grid, startNode, finishNode);
      const nodesInShortestPathOrder =
        getNodesInShortestPathOrderDfs(finishNode);
      animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder);
    } else if (algo === "2") {
      const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
      const nodesInShortestPathOrder =
        getNodesInShortestPathOrderDijkstra(finishNode);
      animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder);
    }
  }

  return (
    <div>
      <p>
        {sAndD === 0 ? (
          <p>Select starting point</p>
        ) : sAndD === 1 ? (
          <p>Select Destination</p>
        ) : (
          <p>Run the algo</p>
        )}
      </p>
      <select onChange={handleChange}>
        <option value="1">DFS</option>
        <option value="2">Dijkstra</option>
        <option value="3">BFS</option>
      </select>
      <button onClick={runAlgo}>Run</button>
      <button onClick={clear}>Clear</button>
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx} className="row">
              {row.map((node, nodeIdx) => {
                return (
                  <Node
                    key={nodeIdx}
                    col={node.j}
                    row={node.i}
                    type={node.type}
                    setsAndD={setsAndD}
                    sAndD={sAndD}
                    setNodeDetail={setNodeDetail}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Grid;
