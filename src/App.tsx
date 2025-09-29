import { Header } from "./components/Header";
import { LikeEventModal } from "./components/LikeEventModal";
import { Map } from "./components/Map";
import { NewEventModal } from "./components/NewEventModal";

function App() {
    return (
        <main className="h-screen overflow-hidden flex flex-col">
            <Header />
            <Map />
            <NewEventModal />
            <LikeEventModal />
        </main>
    );
}

export default App;
