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

export const validateDayOfWeek = (dayOfWeek: any) => {
  const parsedDay = Number(dayOfWeek);

  if (!isNaN(parsedDay) && parsedDay >= 0 && parsedDay < 7) return parsedDay;
  else return undefined;
}

export const validateHour = (hour: any) => {
  const parsedHour = Number(hour);

  if (!isNaN(parsedHour) && parsedHour >= 0 && parsedHour < 24) return parsedHour;
  else return undefined;
}