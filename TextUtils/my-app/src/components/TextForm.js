import React, { useState } from "react";
//import "./TextForm.css";

export default function TextForm(props) {
    // const [mystyle,setMyStyle]=useState({
    //     color: 'black',
    //     backgroundColor: 'white',
    // })
    const handleExtraSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Extra Spaces Removed","success");
      }
    const handleCopy = () => {
        var text = document.getElementById("mybox");
        text.select();
        navigator.clipboard.writeText(text.value);
        props.showAlert("Copied to Clipboard","success");
      }
    // const switchStyle = ()=>{
    //     if(mystyle.color==='white'){
    //         setMyStyle({
    //             color: 'black',
    //             backgroundColor: 'white',
    //         })
    //     }
    //     else if(mystyle.color==='black'){
    //         setMyStyle({
    //             color: 'white',
    //             backgroundColor: 'black',
    //         })
    //     }
    // }
  const ShortestWord = (str) => {
    let words = str.split(" ").filter((word) => word.length > 0);
    if (words.length === 0) return ""; 
    return words.reduce((shortest, current) =>
      current.length < shortest.length ? current : shortest
    );
   };

  const longestWord = (str) => {
    let words = str.split(" ").filter((word) => word.length > 0);
    if (words.length === 0) return "";
    return words.reduce((longest, current) =>
      current.length > longest.length ? current : longest
    );
  };

  const handleUpClick = () => {
    console.log("Uppercase was clicked: " + text);
    setText(text.toUpperCase());
    setCount((prevCount) => prevCount + 1);
    props.showAlert("Converted to Uppercase","success");
  };

  const handleLoClick = () => {
    console.log("Lowercase was clicked: " + text);
    setText(text.toLowerCase());
    setCount((prevCount) => prevCount + 1);
    props.showAlert("Converted to Lowercase","success");
  };

  const handleClear = () => {
    console.log("Clear was clicked");
    setText("");
    setCount((prevCount) => prevCount + 1);
    props.showAlert("Text Cleared","success");
  };

  const handleOnChange = (event) => {
    console.log("On Change");
    setText(event.target.value);
  };

  const [text, setText] = useState("Enter text here");
  const [count, setCount] = useState(0);

  return (
    <>        
    <div style={{color: props.mode==='dark'?'white':'black'}}>
    <div className="container my-3 ">
        <h2>{props.heading}</h2>
        <form>
          <div className="form-group">
            <textarea
              className="form-control" style={{color: props.mode==='dark'?'white':'black',backgroundColor: props.mode==='dark'?'#444445':'white'}}
              value={text}
              onChange={handleOnChange}
              id="mybox"
              rows="5"
            ></textarea>
          </div>
          <button
            type="button"
            onClick={handleUpClick}
            className="btn btn-primary mx-2 my-3"
          >
            Convert to Uppercase
          </button>
          <button
            type="button"
            onClick={handleLoClick}
            className="btn btn-primary mx-2"
          >
            Convert to Lowercase
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="btn btn-primary mx-2"
          >
            Clear Text
          </button>
{/*       <button
            type="button"
            onClick={switchStyle}
            className="btn btn-primary mx-2"
          >
            Switch Theme
          </button>
*/}
              <button
            type="button"
            onClick={handleCopy}
            className="btn btn-primary mx-2"
          >
            Copy Text
          </button>
          <button
            type="button"
            onClick={handleExtraSpaces}
            className="btn btn-primary mx-2"
          >
            Remove Extra Spaces
          </button>

        </form>
      </div>

      <div className="container my-3">
        <h2>{props.summary}</h2>
        <p>
          {text.split(/\s+/).filter((word) => word.length > 0).length} words and{" "}
          {text.length} characters
        </p>
        <p>
          {(
            0.008 * text.split(/\s+/).filter((word) => word.length > 0).length
          ).toFixed(2)}{" "}
          Minutes read
        </p>
        <h2>Preview</h2>
        <p>{text === '' ? 'Enter Something to preview...' : text}</p>
      </div>

      <div className="container my-3">
        <h2>Longest Word</h2>
        <p>{longestWord(text)}</p>
      </div>

      <div className="container my-3">
        <h2>Shortest Word</h2>
        <p>{ShortestWord(text)}</p>
      </div>
{/* 
      <div className="container my-3">
        <h2>Number of Times Count Button Pressed</h2>
        <p>{count}</p>
      </div> */}
      </div>
   </>
  );
}
