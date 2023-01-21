let logo = document.getElementById("logo")
logo.onclick = ()=>{
  location.href = "/index.html"
}


const fun = async () => {
  let res = await fetch(`http://localhost:8080/question`, {
    // body: JSON.stringify(data),
    method: "GET",
    headers: {
      authentication: `Bearer ${document.cookie.split("=")[1]}`,
      "content-type": "application/json",
    },
  });
  let datajson = await res.json();
  return datajson
};
let questionsdiv = document.getElementById("questionsdiv")
let body = document.querySelector("body")
body.onload =async()=>{
  if(!document.cookie.split("=")[1]){
    alert("You are redirecting to login or signup page you are not logged in")
    location.href="/signup.html"
  }
  let data = await fun()
  console.log(data);
  data.forEach(el => {
    let p = document.createElement("p")
    p.textContent = "Q. "+el.question
    p.onclick = ()=>{
      localStorage.setItem("element",JSON.stringify(el))
      location.href = "/nextpage.html"
    }


    tags = el.tag.split(",")

    tagsdiv = document.createElement("div")
    tagsdiv.setAttribute( "class", "tagsbuttons" )
    tags.forEach(tag=>{
      
      let button = document.createElement("button")
      button.innerText = tag.trim()
    
      tagsdiv.append(button)
    })
    questionsdiv.append(p,tagsdiv)
  });
}