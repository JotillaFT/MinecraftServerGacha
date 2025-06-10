import { FaCopy } from "react-icons/fa";
import toast, {Toaster} from "react-hot-toast";
import React from "react";
class ServerInfoData{
    constructor(data) {
        this.server_address = data.server_address;
        this.port = data.port;
        this.status = data.status;
        this.version = data.version;
    }
}

export default function ServerInfo({serverInfo}) {
    const serverParsedInfo = new ServerInfoData(serverInfo)
    const notify = () => toast.success('Enlace copiado');
    const handleCopy = () => {
        navigator.clipboard.writeText(serverParsedInfo.server_address)
            .then(() => {
                notify()
            })
    };

    return(
        <div>
            <div>Informacion del Servidor</div>
            <div style={{fontSize: "23px"}}>
                {serverParsedInfo.server_address}
                <FaCopy className="copyButton" onClick={handleCopy}/>
            </div>
            <div>{serverParsedInfo.port}</div>
            <div></div>
        </div>
    )
}