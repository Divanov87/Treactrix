import EventList from '../../../event-list/EventList';
import { getTheaterEvents } from '../../../../api/eventAPI';


export default function MainTheater() {
  const title = (
    <>
      Latest <strong>Performances</strong>
    </>
  );
  return <EventList fetchEvents={getTheaterEvents} title={title} />;
}
