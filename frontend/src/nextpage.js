let data = JSON.parse(localStorage.getItem("element"))||[]
let heading = document.querySelector("h1")
let logo = document.getElementById("logo")
let answerdiv = document.getElementById("answerdiv")
let form = document.querySelector("form")
form.addEventListener("submit",async(event)=>{
    event.preventDefault()
    let answer = form.answer.value
    let senddata = {
        answer,
        question_id:data._id
    }
    let res = await fetch(`http://localhost:8080/answer/create`, {
      method: "POST",
      body:JSON.stringify(senddata),
      headers: {
        authentication: `Bearer ${document.cookie.split("=")[1]}`,
        "content-type": "application/json",
      },
    });
    let datajson = await res.json();
    if(datajson.msg == "answer saved"){
        form.answer.value = ""
        alert("Your answer is posted")
        window.location.reload()
    }

})
logo.onclick = ()=>{
    location.href = "/index.html"
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
    if(datajson.length){
    
        append(datajson)
    }else{
        answerdiv.append("No answers till now")
    }
    
};
if(data?.question){
    heading.textContent = data?.question
    fun()
}

function append(datajson){
    console.log(datajson)
    datajson.forEach(el => {
        let p = document.createElement("p")
        p.textContent ="Ans:-"+el.answer
        answerdiv.append(p)
    });

}