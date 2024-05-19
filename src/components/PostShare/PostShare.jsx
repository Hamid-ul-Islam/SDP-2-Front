import React, { useState, useRef } from "react";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/UploadAction";
import Editor from "@monaco-editor/react";

const PostShare = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const desc = useRef();
  const [language, setLanguage] = useState("javascript");
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const editorRef = useRef(null);
  // handle Image Change
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const imageRef = useRef();

  // handle post upload
  const handleUpload = async (e) => {
    e.preventDefault();

    //post data
    const newPost = {
      userId: user._id,
      user,
      desc: desc.current.value,
      language: language,
      code: editorRef.current.getValue(),
    };

    // if there is an image with post
    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      newPost.image = fileName;
      console.log(newPost);
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(uploadPost(newPost));
    resetShare();

    editorRef.current.setValue("");
  };

  // Reset Post Share
  const resetShare = () => {
    setImage(null);
    desc.current.value = "";
  };

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  return (
    <div className="PostShare p-8">
      <img className="object-cover" src={"defaultProfile.png"} alt="Profile" />
      <div>
        <input
          type="text"
          placeholder="What are you thinking?"
          required
          ref={desc}
          className="!bg-slate-100 border shadow outline-none p-3"
        />
        {/* <CodeEditor/> */}
        <div className="">
          <select
            className="p-3 border-l border-r border-t outline-none bg-slate-50 shadow"
            onChange={(e) => setLanguage(e.target.value)}
            name="language"
            id=""
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">Typescript</option>
            <option value="python">Python</option>
            <option value="c">C</option>
            <option value="cpp">CPP</option>
            <option value="java">Java</option>
            <option value="php">Php</option>
            <option value="html">HTML</option>
          </select>
          <Editor
            className="p-5  border-l border-r border-b rounded shadow"
            onMount={handleEditorDidMount}
            height="20vh"
            options={{
              wordWrap: "on",
              showUnused: false,
              folding: true,
              lineNumbersMinChars: 3,
              fontSize: 19,
              scrollBeyondLastLine: false,
              tabSize: 2,
              insertSpaces: true,
              cursorStyle: "line",
              scrollbar: {
                alwaysConsumeMouseWheel: false,
              },
              minimap: {
                enabled: false,
              },
              lineNumbers: true,
              renderLineHighlight: true,
            }}
            language={language}
            line={1}
            theme="Blackboard"
            defaultLanguage="javascript"
          />
        </div>
        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>

          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>
          <div className="option" style={{ color: "var(--shedule)" }}>
            <UilSchedule />
            Shedule
          </div>
          <button
            className="button ps-button"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? "uploading" : "Share"}
          </button>

          <div style={{ display: "none" }}>
            <input type="file" ref={imageRef} onChange={onImageChange} />
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="preview" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
