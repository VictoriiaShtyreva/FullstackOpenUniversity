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
        <Part key={index} part={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);

  return <h3>total of {totalExercises} exercises</h3>;
};

const Course = ({ course }) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      <Header course={course[0].name} />
      <Content parts={course[0].parts} />
      <Total parts={course[0].parts} />
      <Header course={course[1].name} />
      <Content parts={course[1].parts} />
      <Total parts={course[1].parts} />
    </div>
  );
};

export default Course;
