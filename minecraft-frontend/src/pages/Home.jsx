import Banner from "../components/Banner";
import PlayersBanner from "../components/PlayersBanner";
import { Divider } from 'antd';
import InformationFrame from "../components/InformationFrame";

export default function Home() {
    return (
        <>
            <Divider></Divider>
            <Banner message={"Bienvenidos a Hommy"}></Banner>
            <InformationFrame ></InformationFrame>
            <PlayersBanner></PlayersBanner>
        </>
    )
}