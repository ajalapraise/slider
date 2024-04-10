import { useState } from "react";
import DesktopSlider from "./components/DesktopSlider/DesktopSlider";

function App() {
  return (
    <div className="overflow-x-hidden">
      <main className="flex items-center justify-center min-h-screen w-full p-5 max-w-[1200px] mx-auto">
        <DesktopSlider items={["1", "2", "3", "4", "5"]} />
      </main>
    </div>
  );
}

export default App;
