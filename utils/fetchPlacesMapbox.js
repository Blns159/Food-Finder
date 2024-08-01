const calculateBBox = (latitude, longitude, radius) => {
    const R = 6371e3; // Bán kính Trái Đất tính bằng mét
    const δ = radius / R; // Khoảng cách tính bằng radian
    const φ1 = latitude * Math.PI / 180;
    const λ1 = longitude * Math.PI / 180;
  
    const minLat = φ1 - δ;
    const maxLat = φ1 + δ;
    const minLng = λ1 - δ / Math.cos(φ1);
    const maxLng = λ1 + δ / Math.cos(φ1);
  
    return [
      minLng * 180 / Math.PI,
      minLat * 180 / Math.PI,
      maxLng * 180 / Math.PI,
      maxLat * 180 / Math.PI
    ].join(',');
  };
  
  const fetchPlacesMapbox = async (keyword, longitude, latitude, radius) => {
    try {
      const accessToken = 'pk.eyJ1IjoidnUxNTkyMDA0IiwiYSI6ImNsemE4a3VzdDBpcmIyc3F6Yzg3bnpkcjIifQ.ZKAYg8AITGLdJ0Av1yG7uA';
      const proximity = `${longitude.toFixed(4)},${latitude.toFixed(4)}`;
      const bbox = calculateBBox(latitude, longitude, radius);
      const limit = 10;
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(keyword)}.json?access_token=${accessToken}&proximity=${proximity}&bbox=${bbox}&limit=${limit}`);
      const data = await response.json();
      return data.features.map(feature => ({
        name: feature.text,
        lat: feature.geometry.coordinates[1],
        lng: feature.geometry.coordinates[0],
        formatted_address: feature.place_name,
        rating: feature.properties.rating || 'N/A'
      }));
    } catch (error) {
      console.error("Error fetching places from Mapbox", error);
    }
  };
  
  export default fetchPlacesMapbox;
  