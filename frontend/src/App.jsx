import 'regenerator-runtime/runtime';
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useChat } from "./hooks/useChat";

function App() {
  const { chat, loading, cameraZoomed, setCameraZoomed, message } = useChat();
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>No speech recognition support</span>;
  }

  const handleStartListening = () => {
    SpeechRecognition.startListening();
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
    console.log('Transcript:', transcript);
    chat(transcript);
  };

  const handleReset = () => {
    resetTranscript();
  };

  return (
    <>
      <Loader />
      <Leva hidden />
      <UI />
      <div className="fixed bottom-0 left-0 right-0 z-10 flex justify-center p-4">
        <button
          onClick={handleStartListening}
          style={{ marginRight: '15px' }}
          className="bg-pink-400 hover:bg-pink-600 text-white p-4 px-10 font-semibold uppercase rounded-md mr-15 pointer-events-auto"
        >
          Start
        </button>
        <button
          onClick={handleStopListening}
          className="bg-pink-400 hover:bg-pink-600 text-white p-4 px-10 font-semibold uppercase rounded-md ml-15 pointer-events-auto"
        >
          Stop
        </button>
      </div>
      <Canvas shadows camera={{ position: [0, 0, 1], fov: 30 }}>
        <Experience />
      </Canvas>
    </>
  );
}

export default App;