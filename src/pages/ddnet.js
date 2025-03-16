import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";

function DDNet() {
  const [searchParams] = useSearchParams();
  const [addr, setAddr] = useState(null);
  const [description, setDescription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const platform = searchParams.get("platform");
    const addr = searchParams.get("addr");

    getServerName(addr).then((name) => {
      setAddr(name);

      const platformName = platform === "steam" ? "Steam" : platform === "standalone" ? "DDNet" : null;
      if (name === "존재하지 않는 서버") {
        setDescription("서버 주소가 없거나 찾을 수 없는 서버입니다. 서버 주소를 확인해 주세요.");
      } else {
        setDescription(`위 서버에 참가하려면 ${platformName} 열기를 클릭해 주세요.`);
        const redirectUrl =
          platform === "steam"
            ? `steam://run/412220//${addr}`
            : platform === "standalone"
            ? `ddnet://${addr}`
            : null;

        if (redirectUrl) window.location.href = redirectUrl;
      }

      
      setLoading(false);
    });
  }, [searchParams]);

  return (
    <div>
      <Helmet>
        <title>DDNet Connect</title>
      </Helmet>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <p className="noto-sans-kr-600-normal">서버 정보를 불러오고 있습니다. 잠시만 기다려주세요.</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          {addr === "존재하지 않는 서버" && (
            <div className="mb-2">
              <svg width="48" height="48" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="40" stroke="black" stroke-width="5" fill="none"/>
                <line x1="30" y1="30" x2="70" y2="70" stroke="black" stroke-width="5"/>
                <line x1="30" y1="70" x2="70" y2="30" stroke="black" stroke-width="5"/>
              </svg>
            </div>
          )}
          <div className="text-center">
            <h3 className="noto-sans-kr-900-normal">{addr}</h3>
            <p className="noto-sans-kr-500-normal">{description}</p>
          </div>
          
        </div>
      )}
    </div>
  );
}

async function getServerName(addr) {
  const response = await fetch("https://master1.ddnet.org/ddnet/15/servers.json");
  const data = await response.json();
  const serverList = data.servers;

  for (const server of serverList) {
    const addresses = server.addresses || [];
    if (addresses.includes(`tw-0.6+udp://${addr}`)) {
      return server.info.name;
    }
  }
  return "존재하지 않는 서버";
}

export default DDNet;
