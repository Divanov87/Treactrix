import MainTop from "./main-top/MainTop.jsx";
import MainService from "./main-service/MainService.jsx";
import MainPinned from "./main-pinned/MainPinned.jsx";
import MainRated from "./main-rated/MainRated.jsx";



export default function Dashboard() {
    return (
        <>
            <MainTop />
            <MainService />
            <MainPinned />
            <MainRated />

        </>
    )
}
