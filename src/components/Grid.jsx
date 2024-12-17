import React, { useState } from "react";
import Cell from "./Cell";

const Grid = () => {
  const gridSize = 10;

  // Initialize grid and agent position
  const [grid, setGrid] = useState(() => initializeGrid(gridSize));
  const [agentPosition, setAgentPosition] = useState({ row: 0, col: 0 });

  // Initialize a random grid
  function initializeGrid(size) {
    const newGrid = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => ({ type: "empty", visited: false }))
    );

    // Randomly place Wumpus, Pits, and Gold
    placeRandom(newGrid, "wumpus", 1);
    placeRandom(newGrid, "pit", Math.floor(size / 2));
    placeRandom(newGrid, "gold", 1);

    // Add percepts (breeze and stench)
    addPercepts(newGrid, "wumpus", "stench");
    addPercepts(newGrid, "pit", "breeze");

    return newGrid;
  }

  // Place random elements on the grid
  function placeRandom(grid, type, count) {
    while (count > 0) {
      const row = Math.floor(Math.random() * gridSize);
      const col = Math.floor(Math.random() * gridSize);
      if (grid[row][col].type === "empty") {
        grid[row][col].type = type;
        count--;
      }
    }
  }

  // Add percepts around specific elements
  function addPercepts(grid, sourceType, perceptType) {
    const directions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];

    grid.forEach((row, rowIndex) =>
      row.forEach((cell, colIndex) => {
        if (cell.type === sourceType) {
          directions.forEach(([dx, dy]) => {
            const newRow = rowIndex + dx;
            const newCol = colIndex + dy;
            if (
              newRow >= 0 &&
              newRow < gridSize &&
              newCol >= 0 &&
              newCol < gridSize &&
              grid[newRow][newCol].type === "empty"
            ) {
              grid[newRow][newCol].type = perceptType;
            }
          });
        }
      })
    );
  }

  // Move the agent
  const moveAgent = (direction) => {
    const { row, col } = agentPosition;
    let newRow = row;
    let newCol = col;

    if (direction === "up" && row > 0) newRow--;
    if (direction === "down" && row < gridSize - 1) newRow++;
    if (direction === "left" && col > 0) newCol--;
    if (direction === "right" && col < gridSize - 1) newCol++;

    // Update agent position
    setAgentPosition({ row: newRow, col: newCol });
  };

  return (
    <div>
      <div className="grid grid-cols-10 gap-1">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              type={cell.type}
              isAgent={
                rowIndex === agentPosition.row && colIndex === agentPosition.col
              }
            />
          ))
        )}
      </div>
      <div className="mt-4 flex space-x-2">
        <button onClick={() => moveAgent("up")}>Up</button>
        <button onClick={() => moveAgent("left")}>Left</button>
        <button onClick={() => moveAgent("down")}>Down</button>
        <button onClick={() => moveAgent("right")}>Right</button>
      </div>
    </div>
  );
};

export default Grid;
