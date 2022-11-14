console.log("Client side javascript is loaded!")

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");



weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    messageOne.textContent = "Loading...";

    if (search.value.trim() !== "") {
        fetch(`http://localhost:3500/weather?address=${search.value.trim()}`).then((response) => {
        response.json().then(data => {
            if (data.error) {
                messageOne.textContent = "You need to enter a valid location!"  
            } else {
                messageOne.textContent = data.forecast;
            }
            }); 
        });
    } else {
        messageOne.textContent = "You need to enter a valid location!"  
    }
    

    search.value = "";
})