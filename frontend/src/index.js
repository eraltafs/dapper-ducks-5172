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
  console.log(datajson);
};
