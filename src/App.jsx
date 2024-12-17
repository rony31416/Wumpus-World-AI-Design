import Grid from "./components/Grid";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">Wumpus World</h1>
      <Grid />
    </div>
  );
}

export default App;
