
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  let date = new Date();
  let year = date.getFullYear();
  document.getElementById('lastupdated').textContent = `Last updated: ${document.lastModified}`;  