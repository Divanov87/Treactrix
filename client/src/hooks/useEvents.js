import { useState, useEffect } from "react";

export function useEvents(eventData) {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const event = await eventData();
        if (event && Array.isArray(event)) {
          setEvents(event);
        } else {
          console.error('Invalid events data:', event);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [eventData]);

  return [events, isLoading];
}
