const Cell = ({ row, col, type, isAgent }) => {
    const getCellStyle = () => {
      if (isAgent) return "bg-blue-500 text-white"; // Agent style
      switch (type) {
        case "wumpus":
          return "bg-red-500 text-white";
        case "pit":
          return "bg-black text-white";
        case "gold":
          return "bg-yellow-300";
        case "breeze":
          return "bg-blue-300";
        case "stench":
          return "bg-green-300";
        default:
          return "bg-gray-200";
      }
    };
  
    return (
      <div
        className={`border border-gray-400 flex items-center justify-center ${getCellStyle()}`}
        style={{ width: "50px", height: "50px" }}
      >
        {isAgent ? "A" : type === "wumpus" ? "W" : type === "pit" ? "P" : type === "gold" ? "G" : ""}
      </div>
    );
  };
  
  export default Cell;
  