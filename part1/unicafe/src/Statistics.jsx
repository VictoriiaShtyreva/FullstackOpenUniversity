import React from "react";
import StatisticLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad }) => {
  const totalFeedback = good + neutral + bad;
  // Calculate the average
  const averageFeedback = ((good - bad) / totalFeedback || 0).toFixed(2);
  // Calculate the percentage of positive feedback
  const positivePercentage = ((good / totalFeedback) * 100 || 0).toFixed(2);

  return (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={totalFeedback} />
      <StatisticLine text="average" value={averageFeedback} />
      <StatisticLine text="positive" value={positivePercentage + "%"} />
    </div>
  );
};

export default Statistics;
