import React, { useState } from "react";
import Cell from "./Cell";
import { FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight } from "react-icons/fa";

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
    <div className="flex flex-col items-center">
      {/* Grid Display */}
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

      {/* Navigation Controls */}
      <div className="mt-6 flex flex-col items-center space-y-2">
        {/* Up Button */}
        <button
          className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
          onClick={() => moveAgent("up")}
        >
          <FaArrowUp size={20} />
        </button>

        {/* Left, Down, Right Buttons */}
        <div className="flex space-x-4">
          <button
            className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => moveAgent("left")}
          >
            <FaArrowLeft size={20} />
          </button>
          <button
            className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => moveAgent("down")}
          >
            <FaArrowDown size={20} />
          </button>
          <button
            className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => moveAgent("right")}
          >
            <FaArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Grid;
