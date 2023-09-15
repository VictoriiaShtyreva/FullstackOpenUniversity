import React, { useState } from "react";
import Button from "./Button";
import Statistics from "./Statistics";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // Function to handle feedback button clicks
  const handleFeedback = (type) => {
    if (type === "good") {
      const updateGood = good + 1;
      setGood(updateGood);
    } else if (type === "neutral") {
      const updateNeutral = neutral + 1;
      setNeutral(updateNeutral);
    } else if (type === "bad") {
      const updateBad = bad + 1;
      setBad(updateBad);
    }
  };

  const feedbackGiven = good + neutral + bad > 0;

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button handleClick={() => handleFeedback("good")} text="good" />
        <Button handleClick={() => handleFeedback("neutral")} text="neutral" />
        <Button handleClick={() => handleFeedback("bad")} text="bad" />
      </div>
      <h2>Statistics</h2>
      {feedbackGiven ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

export default App;
