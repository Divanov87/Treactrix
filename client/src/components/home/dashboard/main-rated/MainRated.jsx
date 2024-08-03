import EventList from '../../../event-list/EventList';
import { getTopRatedEvents } from '../../../../api/eventAPI';


export default function MainRated() {
  const title = (
    <>
      Latest <strong>Top Rated</strong>
    </>
  );
  return <EventList fetchEvents={ getTopRatedEvents } title={title} />;
}