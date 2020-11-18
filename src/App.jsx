import React, { useState, useEffect } from 'react';
import './App.css';
import {createFFmpeg, fetchFile} from '@ffmpeg/ffmpeg'
const ffmpeg = createFFmpeg({log:false});

function App() {
  const [ready,setReady ]=useState(false);
  const [video,setVideo ]=useState();
  const [gif,setGif ]=useState();


  const load  = async()=>{
    await ffmpeg.load();
    setReady(true);
  }

  const convertToGif = async ()=>{

    // Write the file to memory 
    ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(video));

    // Run the FFMpeg command
    await ffmpeg.run('-i', 'test.mp4',  '-f', 'gif', 'out.gif');

    // Read the result
    const data = ffmpeg.FS('readFile', 'out.gif');

    // Create a URL
    const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }));
    setGif(url)
  }
  useEffect(()=>{
    load();

  },[])
 
  return ready?(
    <div className="App">
      <h1>Video To Gif Converter</h1>
       {video &&<video controls width="250" src={URL.createObjectURL(video)}></video>}<br></br>
      <input type="file" onChange={(e)=>setVideo(e.target.files?.item(0))}></input>
      <button onClick={convertToGif}>Convert To Gif</button><br></br>
      {gif && <div><h3>Result</h3><br></br><img width="250" src={gif}></img></div>}


    </div>):(<p> Loading Application Please Wait ...</p>
  );
}

export default App;
