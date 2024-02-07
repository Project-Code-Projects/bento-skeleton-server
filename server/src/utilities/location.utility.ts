export const validateCoordinates = ({lat, lng}: {lat: any, lng: any}) => {
  const parsedLat = Number(lat);
  const parsedLng = Number(lng);

  if (parsedLat && parsedLng && parsedLat >= -90 && parsedLat <= 90 && parsedLng >= -180 && parsedLng <= 180)
    return { latitude: parsedLat, longitude: parsedLng }
  else return null;
}


export const validateRadius = (radius: any) => {
  const parsedRadius = Number(radius);

  // Need to add max radius validation here.
  if (radius && parsedRadius && parsedRadius > 0) return parsedRadius;
  else return null;
}