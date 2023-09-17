import React from "react";

const Header = ({ course }) => {
  return (
    <div>
      <h1>{course}</h1>
    </div>
  );
};

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part, index) => (
        <Part key={index} part={part.part} exercises={part.exercises} />
      ))}
    </>
  );
};

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);

  return <p>Number of exercises {totalExercises}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    { part: "Fundamentals of React", exercises: 10 },
    { part: "Using props to pass data", exercises: 7 },
    { part: "State of a component", exercises: 14 },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
