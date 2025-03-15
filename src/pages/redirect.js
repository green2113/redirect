import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Redirect = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const game = searchParams.get("game");
    const platform = searchParams.get("platform");
    const addr = searchParams.get("addr");

    if (game && platform === "steam" && addr) {
        const redirectUrl = `steam://run/412220//${addr}`;
        window.location.href = redirectUrl;
    }
  }, [searchParams]);

  return <p>리디렉션 중...</p>;
};
  

export default Redirect;
