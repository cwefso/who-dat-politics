import { useEffect, useState } from "react";

const House = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/house"); // Assuming your Next.js API route is named "House"
        if (!response.ok) {
          throw new Error("Failed to fetch data from server");
        }
        const data = await response.json();
        setMembers(data.results[0].members);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once

  useEffect(() => {
    if (members) {
      console.log("house:", members);
    }
  }, [members]);

  return <>{/* Render your UI using the members state */}</>;
};

export default House;
