// import 'regenerator-runtime/runtime'
// import { Loader } from "@react-three/drei";
// import { Canvas } from "@react-three/fiber";
// import { Leva } from "leva";
// import { Experience } from "./components/Experience";

// import { UI } from "./components/UI";

// import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition'

// var transcript ="";

// function App() {

//   // const {
//   //   transcript,
//   //   listening,
//   //   resetTranscript,
//   //   browserSupportsSpeechRecognition,
//   // } = useSpeechRecognition()

//   // if(!browserSupportsSpeechRecognition){
//   //   return <span> no support</span>
//   // }
//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition,
//   } = useSpeechRecognition();

//   if (!browserSupportsSpeechRecognition) {
//     return <span>No speech recognition support</span>;
//   }

//   const handleStartListening = () => {
//     SpeechRecognition.startListening();
//   };

//   const handleStopListening = () => {
//     SpeechRecognition.stopListening();
//     console.log(transcript);
//   };

//   const handleReset = () => {
//     resetTranscript();
//   };



//   return (
//     <>
//       <Loader />
//       <Leva hidden />
//       <UI />
//       <Canvas shadows camera={{ position: [0, 0, 1], fov: 30 }}>
//         <Experience />
        
//       </Canvas>
//       <div>
      
//       <p>
//         Microphone: {listening ? 'on':'off'}
//       </p>
//       <br />
//       <br />
//       <br />
//       <button onClick={SpeechRecognition.startListening}>Start</button>
//       <button onClick={SpeechRecognition.stopListening}>Stop</button>
//       <button resetTranscript>Reset</button>
//       {/* <p>{transcript}</p> */}
      
//     </div>
//     </>
//   );
// }


// export default App;
// V2
// import 'regenerator-runtime/runtime';
// import { Loader } from "@react-three/drei";
// import { Canvas } from "@react-three/fiber";
// import { Leva } from "leva";
// import { Experience } from "./components/Experience";
// import { UI } from "./components/UI";
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import { useChat } from "./hooks/useChat";
// const { chat,loading, cameraZoomed, setCameraZoomed, message } = useChat();



// function App() {
//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition,
//   } = useSpeechRecognition();

//   if (!browserSupportsSpeechRecognition) {
//     return <span>No speech recognition support</span>;
//   }

//   const handleStartListening = () => {
//     SpeechRecognition.startListening();
//   };

//   const handleStopListening = () => {
//     SpeechRecognition.stopListening();
//     console.log('Transcript:', transcript); 
//     chat(transcript);

//   };

//   const handleReset = () => {
//     resetTranscript();
//   };

//   return (
//     <>
//       <Loader />
//       <Leva hidden />
//       <UI />
//       <Canvas shadows camera={{ position: [0, 0, 1], fov: 30 }}>
//         <Experience />
//       </Canvas>
//       <div>
//         <p>Microphone: {listening ? 'on' : 'off'}</p>
//         <br />
//         <br />
//         <br />
//         <button onClick={handleStartListening}>Start</button>
//         <button onClick={handleStopListening}>Stop</button>
//         <button onClick={handleReset}>Reset</button>
//       </div>
//     </>
//   );
// }

// export default App;

//  v3
// import 'regenerator-runtime/runtime';
// import { Loader } from "@react-three/drei";
// import { Canvas } from "@react-three/fiber";
// import { Leva } from "leva";
// import { Experience } from "./components/Experience";
// import { UI } from "./components/UI";
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// function App() {
//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition,
//   } = useSpeechRecognition();

//   if (!browserSupportsSpeechRecognition) {
//     return <span>No speech recognition support</span>;
//   }

//   const handleToggleListening = () => {
//     if (listening) {
//       SpeechRecognition.stopListening();
//       console.log(transcript)
//     } else {
//       SpeechRecognition.startListening();
//     }
//   };

//   const handleReset = () => {
//     resetTranscript();
//   };

//   return (
//     <>
//       <Loader />
//       <Leva hidden />
//       <UI />
//       <Canvas shadows camera={{ position: [0, 0, 1], fov: 30 }}>
//         <Experience />
//       </Canvas>
//       <div>
//         <p>Microphone: {listening ? 'on' : 'off'}</p>
//         <br />
//         <br />
//         <br />
//         <button onClick={handleToggleListening}>
//           {listening ? 'Stop' : 'Start'}
//         </button>
//         <button onClick={handleReset}>Reset</button>
//         {/* <p>Transcript: {transcript}</p> */}
//       </div>
//     </>
//   );
// }

// export default App;

// import 'regenerator-runtime/runtime';
// import { Loader } from "@react-three/drei";
// import { Canvas } from "@react-three/fiber";
// import { Leva } from "leva";
// import { Experience } from "./components/Experience";
// import { UI } from "./components/UI";
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// function App() {
//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition,
//   } = useSpeechRecognition();

//   if (!browserSupportsSpeechRecognition) {
//     return <span>No speech recognition support</span>;
//   }

//   const handleToggleListening = () => {
//     if (listening) {
//       SpeechRecognition.stopListening();
//       console.log('Transcript:', transcript); // Log the transcript when microphone is turned off
//     } else {
//       SpeechRecognition.startListening();
//     }
//   };

//   const handleReset = () => {
//     resetTranscript();
//   };

//   return (
//     <>
//       <Loader />
//       <Leva hidden />
//       <UI />
//       <Canvas shadows camera={{ position: [0, 0, 1], fov: 30 }}>
//         <Experience />
//       </Canvas>
//       <div>
//         <p>Microphone: {listening ? 'on' : 'off'}</p>
//         <br />
//         <br />
//         <br />
//         <button onClick={handleToggleListening}>
//           {listening ? 'Stop' : 'Start'}
//         </button>
//         <button onClick={handleReset}>Reset</button>
//         <p>Transcript: {transcript}</p>
//       </div>
//     </>
//   );
// }

// export default App;






// import 'regenerator-runtime/runtime';
// import { Loader } from "@react-three/drei";
// import { Canvas } from "@react-three/fiber";
// import { Leva } from "leva";
// import { Experience } from "./components/Experience";
// import { UI } from "./components/UI";
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import { useChat } from "./hooks/useChat";

// function App() {
//   const { chat, loading, cameraZoomed, setCameraZoomed, message } = useChat();
//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition,
//   } = useSpeechRecognition();

//   if (!browserSupportsSpeechRecognition) {
//     return <span>No speech recognition support</span>;
//   }

//   const handleStartListening = () => {
//     SpeechRecognition.startListening();
//   };

//   const handleStopListening = () => {
//     SpeechRecognition.stopListening();
//     console.log('Transcript:', transcript);
//     chat(transcript);
//   };

//   const handleReset = () => {
//     resetTranscript();
//   };

//   return (
//     <>
//       <Loader />
//       <Leva hidden />
//       <UI />
//       <Canvas shadows camera={{ position: [0, 0, 1], fov: 30 }}>
//         <Experience />
//       </Canvas>
//       <div className="fixed bottom-0 left-0 right-0 z-10 flex justify-center p-4 pointer-events-none">

//         {/* <p>Microphone: {listening ? 'on' : 'off'}</p> */}
//         <button
           
//             onClick={handleStartListening}
//             style={{ marginRight: '15px' }}
//             className={`bg-pink-400 hover:bg-pink-600 text-white p-4 px-10 font-semibold uppercase rounded-md mr-15`}
//           >
//             Start
//           </button>
//         {/* <button onClick={handleStartListening}>Start</button> */}
//         <button onClick={handleStopListening}

//         className={`bg-pink-400 hover:bg-pink-600 text-white p-4 px-10 font-semibold uppercase rounded-md ml-15`}

//         >Stop</button>
//         {/* <button onClick={handleReset}>Reset</button> */}
//       </div>
//     </>
//   );
// }

// export default App;



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