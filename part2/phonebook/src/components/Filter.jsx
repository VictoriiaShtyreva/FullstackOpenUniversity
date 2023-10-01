const Filter = ({ value, handleFilterChange }) => {
  return (
    <div>
      filter shown with
      <input value={value} id="filter" onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
