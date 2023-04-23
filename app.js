//https://api.openweathermap.org/data/2.5/weather?q=kiev&appid=a96ba89d28bfe1e7f777db4c648c9add

const input = document.getElementById("cityName");
const btn = document.getElementById("search");

$(".data").hide();
$(".temp-type").hide();

btn.addEventListener("click", () => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&appid=a96ba89d28bfe1e7f777db4c648c9add`
  )
    .then((response) => response.json())
    .then((obj) => {
      //console.log(obj);
      console.log(obj.name);
      console.log(obj.sys.country);
      console.log(obj.main.temp);
      console.log(obj.main.humidity);

      const city = document.getElementById("city");
      const temp = document.getElementById("temp");
      const hum = document.getElementById("hum");

      city.textContent = `${obj.name}, ${obj.sys.country}`;
      temp.textContent = `${parseInt(obj.main.temp)}°C`;
      hum.textContent = `${obj.main.humidity}%`;

      if (obj.main.humidity < 50) {
        document.body.style.backgroundImage = "url(img/sun.jpg)";
      } else if (obj.main.humidity > 50) {
        document.body.style.backgroundImage = "url(img/rain.jpg)";
      }

      $(".data").slideDown(500);
      $(".temp-type").fadeIn(300);

      $("#c").addClass("active");

      $("#c").on("click", () => {
        temp.textContent = `${parseInt(obj.main.temp)}°C`;
        if ($("#f").hasClass("active")) {
          $("#f").removeClass("active");
          $("#c").addClass("active");
        }
      });
      $("#f").on("click", () => {
        let f = (parseInt(obj.main.temp) * 9) / 5 + 32;
        temp.textContent = `${parseInt(f)}°F`;
        if ($("#c").hasClass("active")) {
          $("#c").removeClass("active");
          $("#f").addClass("active");
        }
      });
    });
});
