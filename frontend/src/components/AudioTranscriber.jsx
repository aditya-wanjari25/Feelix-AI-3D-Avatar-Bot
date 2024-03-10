// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import MicRecorder from 'mic-recorder-to-mp3';

// // const recorder = new MicRecorder({
// //   bitRate: 128,
// //   encoder: 'wav',
// //   numberOfChannels: 1,
// // });
// const recorder = useState(
//     new MicRecorder({ bitRate: 128 , encoder: 'wav',
//     numberOfChannels: 1})
//     );

// // export const Experience = () => {
// export const AudioTranscriber = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [transcript, setTranscript] = useState('');

//   useEffect(() => {
//     if (isRecording) {
//       recorder.start().then(() => {
//         console.log('Recording started');
//       });
//     } else {
//       recorder.stop().getMp3().then(([buffer, blob]) => {
//         const file = new File(buffer, 'audio.wav', {
//           type: blob.type,
//           lastModified: Date.now(),
//         });

//         const formData = new FormData();
//         formData.append('audio', file);

//         axios.post('http://localhost:5000/transcribe', formData)
//           .then((response) => {
//             setTranscript(response.data.transcript);
//           })
//           .catch((error) => {
//             console.error('Error:', error);
//           });
//       });
//     }
//   }, [isRecording]);

//   return (
//     <div>
//       <button onClick={() => setIsRecording(!isRecording)}>
//         {isRecording ? 'Stop Recording' : 'Start Recording'}
//       </button>
//       <p>{transcript}</p>
//     </div>
//   );
// };

// export default AudioTranscriber;