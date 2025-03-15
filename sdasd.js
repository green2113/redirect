async function getSteamAppId(gameName) {
    try {
      const response = await fetch("https://steam-proxy.your-domain.workers.dev");
      const data = await response.json();
  
      const apps = data.applist.apps;
      const formattedGameName = gameName.toLowerCase().trim();
  
      let game = apps.find((app) => app.name.toLowerCase().trim() === formattedGameName);
  
      if (!game) {
        game = apps.find((app) =>
          app.name.toLowerCase().replace(/\s/g, "").includes(formattedGameName.replace(/\s/g, ""))
        );
      }
  
      return game ? game.appid : null;
    } catch (error) {
      console.error("Steam API 호출 오류:", error);
      return null;
    }
  }
  