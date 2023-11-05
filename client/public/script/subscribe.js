const subScribeContainers = document.getElementsByClassName("subscribe");

Array.from(subScribeContainers).forEach((element) => {
  const subscribeInput = element.getElementsByTagName("input")[0];
  console.log(subscribeInput);
  const subscribeButton =
  element.getElementsByClassName("subscribe__button")[0];
  const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

  subscribeButton.addEventListener("click", () => {
      const emailValue = subscribeInput.value.trim();
    if (!emailValue) {
  console.log(subscribeInput);
      Toastify({
        text: `Email is required to subsrcibe`,
        duration: 2000,
        gravity: "top",
        position: "right",
        style: {
          fontFamily: "Work Sans",
          background: "#8EACCD",
        },
      }).showToast();
    } else if (!emailRegex.test(emailValue)) {
      Toastify({
        text: `Email should be in correct format`,
        duration: 2000,
        gravity: "top",
        position: "right",
        style: {
          fontFamily: "Work Sans",
          background: "#FF8080",
        },
      }).showToast();
    } else {
      Toastify({
        text: `Successfully subscribed`,
        duration: 2000,
        gravity: "top",
        position: "right",
        style: {
          fontFamily: "Work Sans",
          background: "#A8DF8E",
        },
      }).showToast();
      subscribeInput.value=""
    }
    
  });
});
