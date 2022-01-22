export function getCurrentPosition(
  options?: PositionOptions
): Promise<{ latitude: number; longitude: number; }> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => resolve({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }),
      error => reject(error),
      options
    );
  });
}
