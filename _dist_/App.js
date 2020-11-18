import React, {useState, useEffect} from "../web_modules/react.js";
import "./App.css.proxy.js";
import {createFFmpeg, fetchFile} from "../web_modules/@ffmpeg/ffmpeg.js";
const ffmpeg2 = createFFmpeg({log: false});
function App2() {
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState();
  const [gif, setGif] = useState();
  const load = async () => {
    await ffmpeg2.load();
    setReady(true);
  };
  const convertToGif = async () => {
    ffmpeg2.FS("writeFile", "test.mp4", await fetchFile(video));
    await ffmpeg2.run("-i", "test.mp4", "-f", "gif", "out.gif");
    const data = ffmpeg2.FS("readFile", "out.gif");
    const url = URL.createObjectURL(new Blob([data.buffer], {type: "image/gif"}));
    setGif(url);
  };
  useEffect(() => {
    load();
  }, []);
  return ready ? /* @__PURE__ */ React.createElement("div", {
    className: "App"
  }, /* @__PURE__ */ React.createElement("h1", null, "Video To Gif Converter"), video && /* @__PURE__ */ React.createElement("video", {
    controls: true,
    width: "250",
    src: URL.createObjectURL(video)
  }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("input", {
    type: "file",
    onChange: (e) => setVideo(e.target.files?.item(0))
  }), /* @__PURE__ */ React.createElement("button", {
    onClick: convertToGif
  }, "Convert To Gif"), /* @__PURE__ */ React.createElement("br", null), gif && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", null, "Result"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("img", {
    width: "250",
    src: gif
  }))) : /* @__PURE__ */ React.createElement("p", null, " Loading Application Please Wait ...");
}
export default App2;
