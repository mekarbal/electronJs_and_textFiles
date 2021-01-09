const { app, BrowserWindow } = require("electron");
const fs = require("fs");
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile("index.html");
}
function save() {
  let number = document.getElementById("phonenumber").value;
  let name = document.getElementById("name").value;
  let path = "./files/numbers.txt";

  if (fs.existsSync(path)) {
    //file exists
    fs.appendFile(path, name + " " + number + " \n", function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("new number saved");
      }
    });
  } else {
    fs.writeFile(path, name + " " + number + " \n", (err) => {
      if (err) throw err;
      console.log("Number saved!");
    });
  }

  document.getElementById("phonenumberbtn").disabled = true;
  document.getElementById("newForm").reset();
}
const call = () => {
  let number = document.getElementById("phonenumber").value;
  let name = document.getElementById("name").value;
  let path = "./files/callsHistory.txt";
  var date = new Date();
  var dateStr =
    ("00" + date.getDate()).slice(-2) +
    "/" +
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "/" +
    date.getFullYear() +
    " " +
    ("00" + date.getHours()).slice(-2) +
    ":" +
    ("00" + date.getMinutes()).slice(-2) +
    ":" +
    ("00" + date.getSeconds()).slice(-2);

  // fs.writeFile(path, name + " " + number + " " + dateStr, (err) => {
  //   if (err) throw err;
  //   console.log("Calling");
  // });

  if (fs.existsSync(path)) {
    //file exists
    fs.appendFile(
      path,
      name + " " + number + " " + dateStr + " \n",
      function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Calling");
        }
      }
    );
  } else {
    fs.writeFile(path, name + " " + number + " " + dateStr + "\n", (err) => {
      if (err) throw err;
      console.log("created");
      console.log("Calling");
    });
  }
};

const callsHist = () => {
  let path = "./files/callsHistory.txt";
  if (path === undefined) {
    console.log("No file selected");
    return;
  }

  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      alert("An error ocurred reading the file :" + err.message);
      return;
    }

    let histories = [];
    histories.push(data);
    // Change how to handle the file content
    console.log("The file content is : " + data);
    document.getElementById("output").innerHTML = `
    <div class="card mx-auto" style="width:70%;">
  <ul class="list-group list-group-flush">
    <li class="list-group-item">${histories.splice("  ")}</li>
    
  </ul>
</div>
    `;
  });
};

const enableButton = () => {
  document.getElementById("phonenumberbtn").disabled = false;
};

app.whenReady().then(createWindow);
