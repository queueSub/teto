import React, { useState } from "react";
import CreateOption from "../CreateOption/CreateOption";

function CreateQuestion({ types, onSaveQuestion, onDeleteQuestion }) {
  console.log("Question rendering...");
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [checkNum, setCheckNum] = useState(1);
  const [options, setOptions] = useState([
    { optionText: "", forType: 0, weight: 1 },
  ]);
  const [error, setError] = useState("");

  const handleTextChange = (e) => {
    const nextText = e.target.value;
    if (nextText.length > 100) {
      setError("Text must be less than 100 letters.");
    } else {
      setError("");
      setText(nextText);
    }
  };

  const handleDescriptionChange = (e) => {
    const nextDescription = e.target.value;
    if (nextDescription.length > 50) {
      setError("Description must be less than 50 letters.");
    } else {
      setError("");
      setDescription(nextDescription);
    }
  };

  const handleCheckNumChange = (e) => {
    const nextCheckNum = Number(e.target.value);
    if (nextCheckNum <= 0) {
      setError("The number to check must be greater than zero.");
    } else if (nextCheckNum > options.length) {
      setError("The number to check must be less than the number of options.");
    } else {
      setError("");
      setCheckNum(nextCheckNum);
    }
  };

  /* option */
  const handleAddOptionClick = (e) => {
    if (options.length >= 10) return;
    setOptions(
      options.concat({
        id: Date.now(),
        optionText: "",
        forType: 0,
        weight: 1,
      })
    );
  };

  // 각 CreateOption에 전달
  const handleSaveOption = (index) => (newOption) => {
    setOptions(
      options
        .slice(0, index)
        .concat({
          id: options[index].id,
          ...newOption,
        })
        .concat(options.slice(index + 1, options.length))
    );
  };

  const handleDeleteOption = (index) => () => {
    if (options.length <= 1) return;
    setOptions(
      options.slice(0, index).concat(options.slice(index + 1, options.length))
    );
  };

  const handleSaveQuestion = () => {
    const newQuestion = {
      text,
      description,
      checkNum,
      options,
    };
    onSaveQuestion(newQuestion);
  };

  return (
    <div onBlur={handleSaveQuestion}>
      <label>
        question
        <input type="text" value={text} onChange={handleTextChange} />
      </label>
      <label>
        description
        <textarea value={description} onChange={handleDescriptionChange} />
      </label>
      <label>
        Number to check
        <input type="number" value={checkNum} onChange={handleCheckNumChange} />
      </label>
      <button type="button" onClick={onDeleteQuestion}>
        delete
      </button>
      <ol>
        {options.map((option, index) => (
          <li>
            <CreateOption
              key={option.id}
              option={option}
              types={types}
              onSaveOption={handleSaveOption(index)}
              onDeleteOption={handleDeleteOption(index)}
              sendError={setError}
            />
          </li>
        ))}
      </ol>
      <button type="button" onClick={handleAddOptionClick}>
        Add option
      </button>
      <h5>{error}</h5>
    </div>
  );
}
export default CreateQuestion;
