import EventList from '../../../event-list/EventList';
import { getConcertEvents } from '../../../../api/eventAPI';


export default function MainConcert() {
  const title = (
    <>
      Latest <strong>Concerts</strong>
    </>
  );
  return <EventList fetchEvents={getConcertEvents} title={title} />;
}