import { useState, useEffect } from 'react';

import { getAllEventsData } from '../../api/eventAPI';
import EventList from '../event-list/EventList2';
import MainPinned from '../home/dashboard/main-pinned/MainPinned';

import Loader from '../loader/Loader';

export default function EventItem() {
    const [isLoading, setIsLoading] = useState(true);
    const [eventsData, setEventsData] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEventsData = async () => {
            try {
                const data = await getAllEventsData();
                setEventsData(data);
            } catch (error) {
                setError(error.message || 'An error occurred');
            } finally {
                setIsLoading(false);
            }
        };

        fetchEventsData();
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            <MainPinned
                latestPins={eventsData.latestPins}
                isLoading={isLoading}
            />
            <EventList
                events={eventsData.topRatedEvents}
                title="Top Rated"
                //add  !!  isLoading={isLoading}
            />
            <EventList
                events={eventsData.theaterEvents}
                title="Performances"
            />
            <EventList
                events={eventsData.concertEvents}
                title="Concerts"
            />
        </>
    );
}
