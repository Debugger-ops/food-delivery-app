import { useEffect, useState } from "react";

export function useProfile() {
  const [data, setData] = useState(null); // Default to null to represent no data yet
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/profile')
      .then(response => response.json())
      .then(data => {
        setData(data); // Assuming data contains the user info
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching profile:', err);
        setLoading(false); // Ensure loading stops even in case of error
      });
  }, []);

  return { loading, data };
}
