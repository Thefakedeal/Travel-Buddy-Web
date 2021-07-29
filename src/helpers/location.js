export default function getLocation() {
    return new Promise((resolve) => {
      //Getr Location From Navigator
      navigator.geolocation.getCurrentPosition(
        (position) => {
          //On Success
          resolve([position.coords.latitude, position.coords.longitude]);
        },
        //On Fail: Get Location From  ip api Site
        async () => {
          const response = await fetch("https://ipapi.co/json");
          const body = await response.json();
          resolve([Number(body.latitude), Number(body.longitude)]);
        }
      );
    });
  }