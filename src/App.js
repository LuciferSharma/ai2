import {useState, useEffect, useRef} from 'react';
// import {createFFmpeg, fetchFile} from '@ffmpeg/ffmpeg';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Avatar,
} from '@chakra-ui/react';

import {Recorder} from 'react-voice-recorder';
import 'react-voice-recorder/dist/index.css';

import { ColorModeSwitcher } from './ColorModeSwitcher';
import axios from 'axios';
import Status from './Status';
import Result from './Result';
import './App.css';

const assemblyApi= axios.create({
  baseURL: 'https://api.assemblyai.com/v2',
  headers: {
    authorization: "1d50d21098674ffaaca0a19607874ef9",
    'content-type': 'application/json',
  },
});


const initialState ={
  url: null,
  blob: null,
  chunks: null,
  duration: {
    h:0,
    m:0,
    s:0,
  }
}
function App() {

  // const ffmpeg = createFFmpeg({log: true});

  const [transcript, setTranscript] = useState({id: ''});
  const [isLoading, setIsLoading] = useState(false);
  // const [selectedFile, setSelectedFile] = useState(null); 

  
  const [audioDetails, setAudioDetails] = useState(initialState);

  const handleAudioStop=(data)=> {
    setAudioDetails(data);
  }

  const handleReset=()=> {
    setAudioDetails({...initialState});
    setTranscript('');
  }
  
  const handleAudioUpload = async (audioFile)=> {
    setIsLoading(true);

    const {data:uploadResponse} = await assemblyApi.post('./upload',audioFile);
    console.log(uploadResponse);
    
    const {data} = await assemblyApi.post('/transcript', {
      audio_url: uploadResponse.upload_url,
      iab_categories_result: true,
      
      
    });
    console.log(data);


    setTranscript({ id: data.id, iab_categories_result: data.iab_categories_result, status: data.status });
    
  };

 
    const fileInput = useRef(null)

    const handleFileInput = async (e) => {
        // handle validations
        // await ffmpeg.load();
        // console.log("ffmpeg ready");
        // ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(e.target.files[0]));
        // await ffmpeg.run('-i', 'test.mp4', 'audio.mp3');
        // const audioFile = ffmpeg.FS('readFile', 'audio.mp3');
        

        handleAudioUpload(e.target.files[0]);
    }
  



   useEffect(()=> {
    const interval = setInterval(async ()=>{
      console.log(transcript.status);
      console.log(isLoading, transcript.id);
      if(transcript.id && transcript.status !== 'completed' && isLoading) {
        try{
          console.log('haha');
          const {data:transcriptData} = await assemblyApi.get(`/transcript/${transcript.id}`);
          setTranscript({ ...transcript, ...transcriptData});
          console.log(transcriptData);
        }catch (err){
          console.log(err);
        }
      } else {
        clearInterval(interval);
        console.log("not done")
      }
    }, 1000);
    return ()=> clearInterval(interval);
   }, [isLoading, transcript]);

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Avatar
              size="2xl"
              name="Quickreel"
              src="https://images.unsplash.com/photo-1604883781269-d121d9ad20f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            />
            <Box>
              {transcript.text && transcript.status === 'completed'
              ? <Result transcript={transcript}/>
              : <Status isLoading={isLoading} status={transcript.status}/>}
            </Box>
            <Box width={1000}>
            <Recorder
              record={true}
              
              audioURL={audioDetails.url}
              handleAudioStop={handleAudioStop}
              handleAudioUpload={handleAudioUpload}
              handleReset={handleReset}
            />
            </Box>
            <div className="file-uploader">
            <input className='custom-file-input' type="file" onChange={handleFileInput}/>
            <button onClick={e => fileInput.current && fileInput.current.click()} className="btn btn-primary"/>
            </div>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
