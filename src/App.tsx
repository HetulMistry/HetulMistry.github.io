import Portfolio from "@/page";
import { MotionProvider } from "@/lib/motion";

function App() {
  return (
    <MotionProvider>
      <Portfolio />
    </MotionProvider>
  );
}

export default App;
