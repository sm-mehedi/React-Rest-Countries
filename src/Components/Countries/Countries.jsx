import { useEffect, useState } from "react";
import './Countries.css'
const Countries = () => {
  const [countries, setCountries] = useState([]);
  const ParentCss = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
  };

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  function Showdata({ name, population, flags, area,cca3 }) {
    const[visited,setVisited]=useState(false);

  









    return (
      <div className={`${visited ?'visited':'unVisited'}`}
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "20px",
          margin: "20px",
 
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          transition: "transform 0.3s ease-in-out",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <h3 
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: visited?"#333123" : "#9222399",
            marginBottom: "10px",
          }}
        >
          Name: {name.common}
        </h3>

        <p
          style={{
            fontSize: "1.2rem",
            fontWeight: "400",
            color: "#555",
            marginBottom: "20px",
          }}
        >
          Population: {population}
          <br></br>
          Area:{area}
          <br></br>
          Code:{cca3}
        </p>

        <img
          src={flags.png}
          alt={`Flag of ${name.common}`}
          style={{
            width: "80px",
            height: "auto",
            borderRadius: "5px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        />
        <button onClick={()=>
        setVisited(!visited)}>{visited?'Visited':'Going'}</button>
        {visited && 'I have visited'}
        
      </div>
    );
  }

  const sortedCountries = [...countries].sort((a, b) =>
    a.name.common.localeCompare(b.name.common)
  );

  return (
    <div>
      <h1>Total Countries: {countries.length}</h1>
      <div style={ParentCss}>
        {sortedCountries.map((data) => (
          <Showdata key={data.cca2} {...data}></Showdata>
        ))}
      </div>
    </div>
  );
};

export default Countries;
