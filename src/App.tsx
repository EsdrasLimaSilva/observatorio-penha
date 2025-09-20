import { Header } from "./components/Header";
import { Map } from "./components/Map";

function App() {
    return (
        <main className="h-screen overflow-hidden flex flex-col">
            <Header />
            <Map />
        </main>
    );
}

export default App;
