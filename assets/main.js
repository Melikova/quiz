// $.getJSON("./data/js_questions_1.json", (data)=>{
//     console.log(data);
// }).fail(function(err){
//     console.log(err);
// });

async function logJSONData() {
    const response = await fetch("../data/js_questions_1.json");
    const jsonData = await response.json();
    console.log(jsonData);
  }

  logJSONData();