var el = x => document.getElementById(x);

//function showPicker() {
//  el("file-input").click();
//}

//function showPicked(input) {
//  el("upload-label").innerHTML = input.files[0].name;
//  var reader = new FileReader();
//  reader.onload = function(e) {
//    el("image-picked").src = e.target.result;
//    el("image-picked").className = "";
//  };
//  reader.readAsDataURL(input.files[0]);
//}

function analyze() {
  var comment = el("textArea").value;
  if (comment.length === 0) alert("Please include text to classify!");

  el("analyze-button").innerHTML = "Classifying...";
  var xhr = new XMLHttpRequest();
  var loc = window.location;
  xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/analyze`,
    true);
  xhr.onerror = function() {
    alert(xhr.responseText);
  };
  xhr.onload = function(e) {
    if (this.readyState === 4) {
      var response = JSON.parse(e.target.responseText);
      el("result-label").innerHTML = `Result = ${response["result"]}`;
    }
    el("analyze-button").innerHTML = "Analyze";
  };

  var formData = new FormData();
  formData.append("comment", comment);
  xhr.send(comment);
}

