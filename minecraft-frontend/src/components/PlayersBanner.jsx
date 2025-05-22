import { Card, Avatar, Row, Col, Divider } from 'antd';

const { Meta } = Card;

const owner = ["HellyLonely", "The Owner"]
const players = [
    ["ErKtecuento", "Future description"],
    ["marco2004763", "Future description"],
    ["Gatosaurio32", "Future description"],
    ["Elpanthrix", "Future description"],
    ["Yerrog", "Se me mueren los hijos ayuda..."],
    ["CaLaVeRa_190", "Future description"]
];

export default function PlayersBanner() {


    return (
        <div>
            <div style={{display:"flex", padding:"20px", fontFamily: "Bebas Neue", fontSize: "24px"}}>Jugadores</div>

            <Row
                gutter={[30, 30]}
                justify="center"
            >
                {players.map(([name, role]) => (
                    <Col
                        key={name}
                        xs={24}   // 100% ancho en móvil (<576px)
                        sm={20}   // 20/24 en tablet
                        md={12}   // 12/24 en escritorio pequeño
                        lg={8}    // 8/24 en escritorio grande
                        xl={6}    // 6/24 en escritorio extra grande
                    >
                        <Card style={{ width: "100%"}}>
                            <Meta
                                avatar={
                                    <a
                                        href={`https://es.namemc.com/profile/${name}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Avatar src={`https://mc-heads.net/avatar/${name}/100`} />
                                    </a>
                                }
                                title={name}
                                description={role}
                            />
                        </Card>
                    </Col>
                ))}
                
            </Row>
            <div style={{ display:"flex", justifyContent:"center", flexDirection: "column", alignItems: "center"}}>
                <div style={{width: "90%"}}><Divider><p style={{ fontFamily: "Bebas Neue", fontSize: "20px"}}>Staff</p></Divider></div>
                <Card style={{ width: "25%"}}>
                    <Meta
                        avatar={
                            <Avatar src={`https://mc-heads.net/avatar/${owner[0]}/100`} />
                        }
                        title={owner[0]}
                        description={owner[1]}
                    />
                </Card>
            </div>

            
        </div>
    );
}
