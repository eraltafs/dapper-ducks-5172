let logo = document.getElementById("logo")
logo.onclick = ()=>{
  location.href = "/index.html"
}

let heading = document.querySelector("h1")
let data = JSON.parse(localStorage.getItem("element"))||[]
if(data?.querySelector){
    heading.textContent = data?.question
    fun()
}

const fun = async () => {
    let res = await fetch(`http://localhost:8080/answer?question_id=${data._id}`, {
      // body: JSON.stringify(data),
      method: "GET",
      headers: {
        authentication: `Bearer ${document.cookie.split("=")[1]}`,
        "content-type": "application/json",
      },
    });
    let datajson = await res.json();
    console.log(datajson)
    // return datajson
};
