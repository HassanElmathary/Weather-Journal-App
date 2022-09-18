/* Global Variables */
const theUrl = "http://api.openweathermap.org/data/2.5/weather?";
const theApiKey = "670953d310fc29740a56dc2963d617fe";
const theZipInput = document.getElementById("zip");
const theBtn = document.getElementById("generate");
const theDateDiv = document.getElementById("date");
const theTempDiv = document.getElementById("temp");
const theContentDiv = document.getElementById("content");
const theUserFeedback = document.getElementById("feelings");

// Create a new date instance dynamically with JS
const d = new Date();
const newDate = d.toDateString();

// updating html file with the api received value
const updateView = async (path) => {
  const request = await fetch(path);
  try {
    const storedData = await request.json();
    theDateDiv.innerHTML = storedData.date;
    theTempDiv.innerHTML = `${Math.round(storedData.temperature)} C°`;
    theContentDiv.innerHTML = storedData.theUserFeedback;
  } catch (err) {
    console.log(err);
  }
};

// add sendData function
const sendData = async (path, data) => {
  const request = await fetch(path, {
    method: "POST",
    mod: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    return await request.json();
  } catch (err) {
    return err;
  }
};

// getting Data from openWeatherMap api
const getWeather = async (zipVal) => {
  const response = await fetch(
    `${theUrl}zip=${zipVal}&appid=${theApiKey}&units=metric`
  );
  // check if fetched data returned
  if (response.status !== 200) {
    throw new Error("cannot fetch data");
  }
  return response.json();
};

// event listener callback function
function performAction() {
  // get values of zip code  & feelings
  const zipVal = theZipInput.value;
  const feedback = theUserFeedback.value;
  getWeather(zipVal)
    .then((data) => {
      sendData("/send", {
        date: newDate,
        temperature: data.main.temp,
        theUserFeedback: feedback,
      });
    })
    .then(() => {
      updateView("/all");
    })
    .catch((err) => console.log("rejected:", err.message));
}

//   click event on generate button
theBtn.addEventListener("click", performAction);

//  keyUp event
theZipInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    performAction();
  }
});
