import { useState } from "react";

import "./App.css";

import Header from "./components/Header";
import SearchSection from "./components/SearchSection";
import SelectItems from "./components/SelectItems";
import SuccessSection from "./components/SuccessSection";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className='wrapper'>
            <Header />
            <SearchSection />
            <SelectItems />
            <SuccessSection />
        </div>
    );
}

export default App;
