import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";

function DDNet() {
  const [searchParams] = useSearchParams();
  const [addr, setAddr] = useState(null);
  const [description, setDescription] = useState(null);

  useEffect(() => {
    const platform = searchParams.get("platform");
    const addr = searchParams.get("addr");

    getServerName(addr).then((name) => {
        setAddr(name);

        const platformName = platform === "steam" ? "Steam" : platform === "standalone" ? "DDNet" : null;
        if(name === "존재하지 않는 서버") {
            return setDescription("해당 주소는 존재하지 않는 주소입니다. 다시 확인해 주세요.");
        } else {
            setDescription(`위 서버에 참가하려면 ${platformName} 열기를 클릭해 주세요.`)
        }

        const redirectUrl = platform === "steam" ? `steam://run/412220//${addr}` : platform === "standalone" ? `ddnet://${addr}` : null;
        if (redirectUrl) window.location.href = redirectUrl;
    })

    
  }, [searchParams]);

  return (
    <div>
      <Helmet>
        <title>DDNet Connect</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center h-screen">
        <div>
            <h3 className="noto-sans-kr-900-normal">{addr}</h3>
        </div>
        <div>
            <p className="noto-sans-kr-500-normal">{description}</p>
        </div>
      </div>
    </div>
  );
};

async function getServerName(addr) {
    const response = await fetch('https://master1.ddnet.org/ddnet/15/servers.json');
    const data = await response.json();
    const serverList = data.servers;

    for(const server of serverList) {
        const addresses = server.addresses || [];
        if(addresses.includes(`tw-0.6+udp://${addr}`)) {
            return server.info.name;
        } 
    }
    return "존재하지 않는 서버";
}

export default DDNet;
