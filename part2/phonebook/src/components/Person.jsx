const Person = ({ person, removePerson }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "300px",
      }}
    >
      <li>
        {person.name} {person.number}
      </li>
      <button onClick={() => removePerson(person.id)}>delete</button>
    </div>
  );
};
export default Person;
