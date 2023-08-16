// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
var check = 0;
export function dfsExpo(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  check = 0;
  dfs(grid, startNode, finishNode, visitedNodesInOrder);
  return visitedNodesInOrder;
}
function dfs(grid, startNode, finishNode, visitedNodesInOrder) {
  if (check === 1) {
    return;
  }
  startNode.isVisited = true;
  visitedNodesInOrder.push(startNode);
  console.log(startNode);
  console.log(finishNode);
  if (startNode.i === finishNode.i && startNode.j === finishNode.j) {
    check = 1;
    console.log(check);
    return;
  } else {
    const unvisitedNeighbors = getUnvisitedNeighbors(startNode, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.previousNode = startNode;
      dfs(grid, neighbor, finishNode, visitedNodesInOrder);
    }
  }
  return;
}
function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const row = node.i;
  const col = node.j;
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (row > 0) neighbors.push(grid[row - 1][col]);

  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

export function getNodesInShortestPathOrderDfs(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    // console.log(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
