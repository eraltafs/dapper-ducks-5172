if(!document.cookie.split("=")[1]){
    alert("You are redirecting to login or signup page you are not logged in")
    location.href="/signup.html"
}
let logo = document.getElementById("logo")
logo.onclick = ()=>{
  location.href = "/index.html"
}


let form = document.querySelector("form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  let question = form.question.value;
  let tag = form.tag.value;

  let data = {
    question,
    tag,
  };
  let res = await fetch(`http://localhost:8080/question/create`, {
    body: JSON.stringify(data),
    method: "POST",
    headers: {
      authentication: `Bearer ${document.cookie.split("=")[1]}`,
      "content-type": "application/json",
    },
  });

 let resdata = await res.json();
 if(resdata.msg=="question saved"){
    alert("your question posted")
    form.question.value =""
    form.tag.value=""
 }
});
