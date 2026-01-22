const map = L.map("map").setView([23.7, 121], 7);

// === 顯示使用者位置 ===
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      console.log("📍 使用者位置：", lat, lng);

      // 地圖移到使用者所在位置
      map.setView([lat, lng], 13);

      // 加入一個藍色圓形標記
      L.circleMarker([lat, lng], {
        radius: 8,
        color: "blue",
        fillColor: "#30f",
        fillOpacity: 0.6
      })
        .addTo(map)
        .bindPopup("📍 你的位置")
        .openPopup();
    },
    (err) => {
      console.warn("❌ 定位失敗：", err.message);
      alert("無法取得你的定位，請允許瀏覽器存取位置。");
    }
  );
} else {
  alert("你的瀏覽器不支援定位功能。");
}


// 底圖（OpenStreetMap）
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; OpenStreetMap 貢獻者'
}).addTo(map);

// === 加入水位資料 ===
async function loadWater() {
  try {
    const res = await fetch("/api/waterLevel?station=淡水河");
    const data = await res.json();
    if (data.error) throw new Error(data.error);

    // 在地圖上放標記
    const marker = L.marker([data.lat, data.lng])
      .addTo(map)
      .bindPopup(`💧 ${data.name}<br>水位：${data.level} m<br>警戒值：${data.alert} m`);

    document.getElementById("water").innerHTML =
      `💧 河川：${data.name}<br>水位：${data.level} m<br>警戒值：${data.alert} m`;
  } catch (err) {
    document.getElementById("water").innerHTML = "⚠️ 無法取得水位資料";
    console.error("水位資料讀取錯誤：", err);
  }
}

// === 加入地震資料 ===
async function loadEarthquake() {
  const res = await fetch("/api/earthquake");
  const data = await res.json();
  document.getElementById("earthquake").innerHTML =
    `📅 時間：${data.time}<br>📍 地點：${data.location}<br>規模：${data.magnitude}`;
}

// === 加入氣象資料 ===
async function loadWeather() {
  const res = await fetch("/api/weather?city=台北市");
  const data = await res.json();
  document.getElementById("weather").innerHTML =
    `🏙 城市：${data.locationName}<br>天氣：${data.weather}<br>溫度：${data.minT}°C ~ ${data.maxT}°C`;
}

// 初始化載入
loadWeather();
loadWater();
loadEarthquake();
