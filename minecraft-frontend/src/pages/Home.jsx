import Banner from "../components/Banner";
import PlayersBanner from "../components/PlayersBanner";
import { Divider } from 'antd';
export default function Home() {
    return (
        <>
            <Divider></Divider>
            <Banner message={"Jugamos en Fabric 1.20.1"}></Banner>
            <PlayersBanner></PlayersBanner>
        </>
    )
}