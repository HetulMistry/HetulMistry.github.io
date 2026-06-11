import { MotionProvider } from "@/lib/motion";
import Portfolio from "@/page";

function App() {
  return (
    <MotionProvider>
      <Portfolio />
    </MotionProvider>
  );
}

export default App;
