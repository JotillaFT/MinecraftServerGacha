import React from "react";
import {Divider, Typography, Carousel} from 'antd';
const { Title, Paragraph } = Typography;
import '../css/Misc.css';

export default function InformationFrame() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '40px',
            gap: '40px',
            flexWrap: 'wrap'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                maxWidth: '600px',
            }}>
                <Title level={2} style={{ textAlign: 'left', width: '100%'}}>¿Quiénes somos?</Title>
                <Paragraph style={{
                    fontSize: '16px',
                    lineHeight: '1.8',
                    textAlign: 'left',
                    width: '100%'
                }}>
                    Somos una comunidad de jugadores apasionados por la creatividad, la construcción y las infinitas posibilidades que ofrece Minecraft. Este espacio nació del deseo de reunir a personas con una visión común: explorar, crear y compartir todo lo que el juego nos permite imaginar.
                    Aquí no solo construimos mundos, también forjamos amistades, organizamos eventos, desafíos y proyectos colaborativos donde cada miembro aporta su talento y estilo. Nos entusiasma descubrir nuevas formas de jugar, aprender redstone, diseñar estructuras impresionantes o simplemente pasar un buen rato en compañía.
                    <br /><br />
                    Nuestro objetivo es cultivar un entorno abierto, inclusivo y lleno de imaginación, donde cada bloque colocado tenga una historia y cada aventura compartida refuerce el espíritu de comunidad.

                </Paragraph>
            </div>
            <Carousel arrows autoplay infinite={true}  style={{
                width: '650px',
                maxWidth: '100%',
                borderRadius: '12px',

            }}>
                <img
                    src={"src/assets/image-group2.png"}
                    alt="Grupo de desarrollo"
                />
                <img
                    src={"src/assets/image-group3.png"}
                    alt="Grupo de desarrollo"
                />
                <img
                    src={"src/assets/image-group4.png"}
                    alt="Grupo de desarrollo"
                />
            </Carousel>

            <Divider></Divider>
        </div>
    );
}
