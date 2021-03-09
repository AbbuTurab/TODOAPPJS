let url = "http://34.71.224.0:8080/api/tasks";
 
function addTaskFunc() {
  var title = document.getElementById("initialTitle").value;
  var status = document.getElementById("initialStatus").value;
  var date = document.getElementById("initialDate").value;
  let dateFormat = new Date(date).toISOString();

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2MTc0MzMzOTl9._VY8Ao2E4a4C5_3aWpRh3HzPBJPlQ4SWdzAlMObp89r3rEx2jQXs-x_Lz7ozNDZuIdxI9zuExRUFYCQaYwfRUw",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      name: title,
      expiryDate: dateFormat,
      status: status,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res, "This is response after submission");
      getTasks();
    });
}

function getTasks() {
  fetch(url, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2MTc0MzMzOTl9._VY8Ao2E4a4C5_3aWpRh3HzPBJPlQ4SWdzAlMObp89r3rEx2jQXs-x_Lz7ozNDZuIdxI9zuExRUFYCQaYwfRUw",
      "Access-Control-Allow-Credentials": true,
    },
  })
    .then((res) => {
      // console.log(res);
      return res.json();
    })
    .then((res) => {
      console.log(res);
      let tableBody = document.getElementById("tableBody");
      tableBody.innerHTML = "";
      for (let i = 0; i < res.length; i++) {
        // console.log(res[i].name);
        tableBody.innerHTML += `<tr id="task${i}"><td>${res[i].id}</td>
                            <td>${res[i].name}</td>
                            <td>${res[i].expiryDate}</td>
                            <td>${res[i].status}</td>
                            <td><button data-target="#editbutton"
                            data-toggle="modal"
                            class="btn btn-warning" onclick="editFunc(${res[i].id})">EDIT</button>
                            <button data-target="#deletebutton"
                            data-toggle="modal"
                            class="btn btn-danger" onclick="captureDelId('${res[i].id}')">DELETE</button>
                            <td>

                            </tr>`;
      }
    });
}

getTasks();

var taskId = "";
// var taskDelId = '';

function editFunc(id) {
  taskId = id;
  console.log(id);
  // console.log(id, "ID");
  //var parsedValue = JSON.stringify({id})
  //console.log(parsedValue);
  // console.log({...parsedValue}, "Edit value");
}

function captureDelId(id) {
  taskDelId = id;
  console.log(id);
  const delUrl = `${url}/${id}` 
  fetch(delUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2MTc0MzMzOTl9._VY8Ao2E4a4C5_3aWpRh3HzPBJPlQ4SWdzAlMObp89r3rEx2jQXs-x_Lz7ozNDZuIdxI9zuExRUFYCQaYwfRUw",
      "Access-Control-Allow-Credentials": true,
    },
  }).then((res) => {
    getTasks();
  });
}


function editTasksFunc() {
  var updateTitle = document.getElementById("updateTitle").value;
  var updateDate = document.getElementById("updateDate").value;
  var updateStatus = document.getElementById("updateStatus").value;
  let isoDate = new Date(updateDate).toISOString();
  // console.log(updateTitle);
  // console.log(updateDate);
  // console.log(updateStatus);
  
  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2MTc0MzMzOTl9._VY8Ao2E4a4C5_3aWpRh3HzPBJPlQ4SWdzAlMObp89r3rEx2jQXs-x_Lz7ozNDZuIdxI9zuExRUFYCQaYwfRUw",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      id: taskId,
      name: updateTitle,
      expiryDate: isoDate,
      status: updateStatus,
    }),
  }).then((res) => {
    console.log(res);
    getTasks();
  });
}



//   console.log(title.value);
//   console.log(status.value);
//   table.innerHTML = `<tr><td>1</td>
//                         <td>Complete actions</td>
//                         <td><button data-target="#editbutton"
//                         data-toggle="modal"
//                         class="btn btn-warning">EDIT</button><td></tr>`;
