let dv = (elem) => {
  return document.getElementById(elem).value;
};
let elem = (elem) => {
  return document.getElementById(elem);
};
let reDirect = (url) => {
  window.location.href = url;
};
todayDate = new Date().toString();
todayDate = todayDate.split(" ").slice(0, 5).join(" ");
let checkText = (textbox) => {
  let regex = /^[A-Za-z .,!&#0-9-=/:()|*?]*$/;
  let value = textbox.value;
  let result = value.match(regex);

  // Cleaning the Textbox
  textbox.value = result;
};
let checkNumber = (textbox) => {
  let regex = /^[0-9 +.]*$/;
  let value = textbox.value;
  let result = value.match(regex);

  // Cleaning the Textbox
  textbox.value = result;
};
let checkEmail = (textbox) => {
  let regex = /^[A-Za-z0-9.@&/_-]*$/;
  let value = textbox.value;
  let result = value.match(regex);

  // Cleaning the Textbox
  textbox.value = result;
};
function set_cookie(cname, cvalue) {
  document.cookie = cname + "=" + cvalue;
}
function get_cookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

let calcMonth = (bNo) => {
  switch (bNo) {
    case 1:
      return "January";
      break;
    case 2:
      return "February";
      break;
    case 3:
      return "March";
      break;
    case 4:
      return "April";
      break;
    case 5:
      return "May";
      break;
    case 6:
      return "June";
      break;
    case 7:
      return "July";
      break;
    case 8:
      return "August";
      break;
    case 9:
      return "September";
      break;
    case 10:
      return "October";
      break;
    case 11:
      return "November";
      break;
    case 12:
      return "December";
      break;
    default:
      return "Unknown Number";
  }
};

function check_cookie(name) {
  var user = get_cookie(name);
  if (user != "") {
    return true;
  } else {
    return false;
  }
}
function cookieMaster() {
  if (!check_cookie("admin")) {
    set_cookie("admin", "false");
  } else {
    if (get_cookie("admin") === "true") {
      reDirect("admin.html");
    }
  }
  if (!check_cookie("student")) {
    set_cookie("student", "false");
  } else {
    if (get_cookie("student") === "true") {
      reDirect("studentportal.html");
    }
  }
}
function checkLoggIn(type) {
  if (type === "admin") {
    if (!check_cookie("admin")) {
      set_cookie("admin", "false");
    } else {
      if (get_cookie("admin") !== "true") {
        set_cookie("admin", "false");
        reDirect("join.html");
      } else {
        return;
      }
    }
  } else if (type === "stu") {
    if (!check_cookie("student") || !check_cookie("stID")) {
      set_cookie("student", "false");
      set_cookie("stID", "null");
      alert("Credentials Not Approved !");
      reDirect("join.html");
    } else {
      if (get_cookie("student") !== "true" || get_cookie("stID") === "null") {
        set_cookie("student", "false");
        set_cookie("stID", "null");
        alert("Credentials Not Approved !");
        reDirect("join.html");
      } else {
        fetch("modal/loginCred.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: get_cookie("stID"),
          }),
        })
          .then((res) => {
            return res.text();
          })
          .then((data) => {
            if (data[0] === "<") {
              console.log(data);
              alert(
                "Error: CL (Internal Error). Please Contact the Developers"
              );
              reDirect("join.html");
              set_cookie("student", "false");
              set_cookie("stID", "null");
            } else {
              if (data === "YES") {
                return;
              } else {
                console.log(data);
                alert(
                  "You are kicked out from this Hostel.. Don't Ever try to come back 🙌 !"
                );
                reDirect("join.html");
                set_cookie("student", "false");
                set_cookie("stID", "null");
              }
            }
          })
          .catch((err) => {
            console.log(err);
            alert("Error: CL (Internal Error). Please Contact the Developers");
            reDirect("join.html");
            set_cookie("student", "false");
            set_cookie("stID", "null");
          });
      }
    }
  }
}
function logout() {
  if (check_cookie("admin") && check_cookie("student")) {
    set_cookie("admin", "false");
    set_cookie("student", "false");
    set_cookie("stID", "null");
  }
  reDirect("join.html");
}
function admin_login() {
  var aduser = elem("txtAdUser").value;
  var adpass = elem("txtAdPass").value;

  if (aduser === "" || adpass === "") {
    alert("Please Enter the Username and Pasword !");
  } else {
    fetch("modal/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: aduser,
        password: adpass,
      }),
    })
      .then(function (res) {
        if (!res.ok) {
          alert("There is a problem in the server");
        } else {
          return res.text();
        }
      })
      .then(function (data) {
        if (data === "0") {
          alert("Credientials Incorrect !");
        } else if (data === "1ad") {
          set_cookie("admin", "true");
          reDirect("admin.html");
        } else if (data == "0no") {
          alert("Sorry Wrong Credientials");
        } else if (data == "1st") {
          alert("You are a student. Please Enter Through Student Login");
        } else {
          alert("There was a problem in the server !");
          console.log(data);
        }
      })
      .catch(function (error) {
        alert("There was a error ! Please Try again later !");
        console.log(error);
      });
  }
}
function stfu() {
  var aduser = elem("userMail").value;
  var adpass = elem("userPass").value;

  if (aduser === "" || adpass === "") {
    alert("Please Enter the Username and Pasword !");
  } else {
    fetch("modal/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: aduser,
        password: adpass,
      }),
    })
      .then(function (res) {
        if (!res.ok) {
          alert("There is a problem in the server");
        } else {
          return res.text();
        }
      })
      .then(function (data) {
        if (data[0] !== "<") {
          if (data === "0") {
            alert("Credientials Incorrect !");
          } else if (data === "1ad") {
            alert("There was a problem. Please Try again later !");
          } else if (data == "0no") {
            alert("Sorry Wrong Credientials");
          } else if (data == "1st") {
            set_cookie("stID", aduser);
            set_cookie("student", "true");
            reDirect("studentportal.html");
          } else {
            alert("There was a problem in the server !");
            console.log(data);
          }
        } else {
          alert("Please Register yourself before trying to logging in !");
          reDirect("overview.html");
        }
      })
      .catch(function (error) {
        alert("There was a error ! Please Try again later !");
        console.log(error);
      });
  }
}
function addStudent() {
  fetch("modal/addStudents.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      txtName: dv("txtName"),
      txtNumber: dv("txtNumber"),
      txtPassword: dv("txtPassword"),
      txtFname: dv("txtFname"),
      txtDate: dv("txtDate"),
      txtCourse: dv("txtCourse"),
      txtYear: dv("txtYear"),
      txtAddress: dv("txtAddress"),
      txtHSPhone: dv("txtHSPhone"),
      txtLGName: dv("txtLGName"),
      txtLGAddress: dv("txtLGAddress"),
      txtLGNumber: dv("txtLGNumber"),
    }),
  })
    .then((res) => {
      return res.text();
    })
    .then((data) => {
      if (data === "YES") {
        alert(
          `Hello ${dv(
            "txtName"
          )}, you are in the queue list. Login to your account for latest updates and management !`
        );
        reDirect("join.html");
      } else {
        alert("There was a problem. Please Try again");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
function checkValidation(njn) {
  if (njn.value.length >= 1) {
    if (dv("txtName").length >= 1 && dv("txtNumber").length >= 1) {
      elem("btnSubmit").disabled = false;
    } else {
      elem("btnSubmit").disabled = true;
    }
  } else {
    elem("btnSubmit").disabled = true;
  }
}
function chatDel(id) {
  if (confirm("Are you sure want to delete this news ?")) {
    fetch("modal/delChat.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        if (data[0] === "<") {
          console.log(err);
          alert("Internal Error. Please contact the Developers !");
        } else {
          alert("News Deleted !");
          chatGet();
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Internal Error. Please contact the Developers !");
      });
  }
}
function chatGet() {
  let output = ``;
  fetch("modal/getChats.php")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data[0] === "NO") {
        output = `
                <div class="fsc">
                    <p class="smTxt" style="text-align: center; width: 100%;">No Messages Here ...</p>
                </div>
                `;
      } else {
        data.forEach(function (chat) {
          output += `
                    <div class="fsc">
                        <p class="smTxt">${chat.message}</p>
                        <button class="btn btn-danger btnNOO" onclick="chatDel('${chat.id}')">
                            X
                        </button>
                    </div>
                    `;
        });
      }
      elem("messagesCHAT").innerHTML = output;
    })
    .catch((err) => {
      alert("Internal Error. Please contact the Developers !");
      console.log(err);
    });
}
function chatSend() {
  fetch("modal/chatAdd.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: dv("txtNews"),
      time: todayDate,
    }),
  })
    .then((res) => {
      return res.text();
    })
    .then((data) => {
      if (data[0] === "<") {
        console.log(err);
        alert("Internal Error. Please contact the Developers !");
      } else {
        if (data === "YES") {
          chatGet();
          elem("txtNews").value = "";
          elem("txtNews").focus();
          elem("btnSendChat").disabled = true;
        } else {
          console.log(data);
          alert("There was a problem in uploading the news !");
        }
      }
    })
    .catch((err) => {
      console.log(err);
      alert("Internal Error. Please contact the Developers !");
    });
}
function aDash() {
  fetch("modal/getNoStudents.php")
    .then((res) => {
      return res.text();
    })
    .then((data) => {
      elem("lTotalStudents").innerHTML = data;
    })
    .catch((err) => {
      alert("Internal Error. Please contact the Developers !");
      console.log(err);
    });

  fetch("modal/getNoRooms.php")
    .then((res) => {
      return res.text();
    })
    .then((data) => {
      elem("lTotalRooms").innerHTML = data;
    })
    .catch((err) => {
      alert("Internal Error. Please contact the Developers !");
      console.log(err);
    });

  fetch("modal/getNoRoomsAVA.php")
    .then((res) => {
      return res.text();
    })
    .then((data) => {
      elem("lAVARooms").innerHTML = data;
    })
    .catch((err) => {
      alert("Internal Error. Please contact the Developers !");
      console.log(err);
    });

  chatGet();

  fetch("modal/getRequestAll.php")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let op = ``;
      if (data[0] === "NO") {
        op = `
                <div class="fsc">
                    <p class="smTxt" style="text-align: left; width: 100%;">
                    No Request Here ...
                    </p>
                </div>
                `;
      } else {
        op = `
                <table class="table table-bordered">
                    <thead>
                        <tr class="bg-success text-white">
                            <th>Request Type</th>
                            <th>Request Message</th>
                            <th>Request Student Number</th>
                            <th>Approval</th>
                        </tr>
                    </thead>
                    <tbody>
                `;

        data.forEach(function (req) {
          let apprvv = "";
          if (req.state === "0") {
            apprvv = `
                        <td>
                            <button class="btn btn-success btnNOO" onclick="reqAPP('${req.id}','1')">
                                <i class='fas fa-check'></i>
                            </button>
                            <button class="btn btn-danger btnNOO" onclick="reqAPP('${req.id}', '-1')">
                                <i class='fas fa-times'></i>
                            </button>
                        </td>
                    `;
          } else if (req.state === "1") {
            apprvv = `
                        <td class='text-success'>
                            Accepted 
                            &nbsp;
                            <span onclick='removeRequestADMIN(${req.id})' style='cursor: pointer; color: var(--red); text-decoration: underline; font-weight: bold;'>
                                X
                            </span>
                        </td>
                        `;
          } else if (req.state === "-1") {
            apprvv = ` 
                        <td class='text-danger'> 
                            Rejected  
                            &nbsp; 
                            <span onclick='removeRequestADMIN(${req.id})' style='cursor: pointer; color: var(--red); text-decoration: underline; font-weight: bold;'>
                            X
                            </span>
                        </td>
                        `;
          } else {
            apprvv = ` 
                        <td class='text-danger'> 
                            Error: CL (Internal Error).
                        </td>
                        `;
          }
          op += `
                    <tr>
                        <td class="smTxt">${req.type}</td>
                        <td class="smTxt">${req.reason}</td>
                        <td class="smTxt">${req.student}</td>
                        ${apprvv}
                    </tr>
                    `;
        });
        op += `
                    </tbody>
                </table>
                `;
      }
      elem("requestAR").innerHTML = op;
    })
    .catch((err) => {
      alert("Internal Error. Please contact the Developers !");
      console.log(err);
    });
}

function reqAPP(id, apro) {
  if (confirm("Are you sure want to do this ?")) {
    fetch("modal/requestAPPR.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        decision: apro,
      }),
    })
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        if (data[0] === "<") {
          alert("Internal Error. Please contact the developers !");
          console.log("Error : " + data);
        } else {
          if (data === "YES") {
            if (apro === "1") {
              alert("Request Approved !");
            } else if (apro === "-1") {
              alert("Request Rejected !");
            } else {
              alert("Done !");
            }
            aDash();
          } else {
            alert("There was a problem in the server !");
            console.log(data);
          }
        }
      })
      .catch((err) => {
        alert("Internal Error. Please contact the Developers !");
        console.log(err);
      });
  }
}
function rmFD() {
  fetch("modal/billing.php")
    .then((res) => {
      return res.text();
    })
    .then((data) => {
      if (data == "<") {
        console.error(
          "There was a problem in the billing.php request : " + data
        );
      } else {
        data = JSON.parse(data);
        if (data[0] != "0") {
          elem("el_bill").value = data[0].el_bill;
          elem("wt_bill").value = data[0].wt_bill;
        } else {
          console.error("There was a problem in the billing.php");
        }
      }
    })
    .catch((err) => {
      console.error("There was an problem in the code : " + err);
    });
}
function upBill() {
  fetch("modal/addBilling.php", {
    method: "POST",
    headers: {
      "Content-Type": "applicaiton/json",
    },
    body: JSON.stringify({
      el_bill: elem("el_bill").value,
      wt_bill: elem("wt_bill").value,
    }),
  })
    .then((res) => {
      return res.text();
    })
    .then((data) => {
      if (data == "<") {
        console.error(
          "There was a problem in the addBilling.php request : " + data
        );
      } else {
        data = JSON.parse(data);
        if (data[0] != "0") {
          if (data[0] == "1") {
            alert("Bill Updated");
            rmFD();
          }
        } else {
          console.error("There was a problem in the addBilling.php");
        }
      }
    })
    .catch((err) => {
      console.error("There was an problem in the code : " + err);
    });
  setTimeout(() => {
    elem("btnUPP").disabled = true;
  }, 200);
}
function addRoom() {
  if (dv("txtRoomNO") != "" && dv("txtRoomFees") != "") {
    fetch("modal/addRooms.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        room: dv("txtRoomNO"),
        fees: dv("txtRoomFees"),
      }),
    })
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        if (data[0] === "<") {
          alert("Internal Error. Please contact the developers !");
          console.log("Error : " + data);
        } else {
          if (data === "YES") {
            alert("Room Added !");
            elem("txtRoomNO").value = "";
            elem("txtRoomFees").value = "";
            elem("txtRoomNO").focus();
          } else if (data === "AE") {
            alert("This room number already exists");
            elem("txtRoomNO").value = "";
            elem("txtRoomNO").focus();
          } else {
            alert("There was a problem in adding the room !");
            console.log(data);
          }
        }
      })
      .catch((err) => {
        alert("Internal Error. Please contact the Developers !");
        console.log(err);
      });
  }
}
function roomManage() {
  fetch("modal/roomData.php")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data[0] === "NO") {
        elem("mainTTBB").innerHTML = `
                    <br />
                    <h5 class='text-danger' style='text-align: center;'>No Room are there still Now</h5>
                    <br />
                    <p onclick='reDirect("addroom.html")' style='cursor: pointer; user-select: none; text-decoration: underline; color: var(--indigo); text-align: center;'>Go to Add Rooms</p>
                `;
      } else {
        let output = "";
        data.forEach(function (rooms) {
          let btnTemp;
          if (rooms.state === "1") {
            btnTemp = `
                    <button class="btn btn-danger btn-sm" onclick="deAllocate('${rooms.user}','${rooms.room}')" type="button">
                        deallocate room &nbsp; x
                    </button>
                    `;
          } else if (rooms.state === "0") {
            btnTemp = `
                    <button class="btn btn-danger btn-sm" onclick="remRoom('${rooms.id}')" type="button">
                        remove room &nbsp; x
                    </button>
                    `;
          } else {
            btnTemp = `
                    <button class="btn btn-danger btn-sm" type="button" disabled>
                        remove &nbsp; x
                    </button>
                    `;
          }
          output += `
                <tr>
                    <td>${rooms.id}</td>
                    <td>${rooms.room}</td>
                    <td onclick="priceChange(this,'${rooms.room}')">${rooms.price}</td>
                    <td style='user-select: all;'>${rooms.user}</td>
                    <td>
                        ${btnTemp}
                    </td>
                </tr>  
                `;
        });
        elem("tBody").innerHTML = output;
      }
    })
    .catch((err) => {
      alert("Internal Error. Please contact the Developers !");
      console.log(err);
    });
}
function priceDefault(txt) {
  if (txt.value === "" || txt.value === " ") {
    roomManage();
  }
}
function priceChange(place, roomno) {
  place.innerHTML = `
        <input 
            class='form-control' 
            placeholder='fees in ₹'
            id="txt${roomno}"
            onblur="priceDefault(this)" 
            oninput="checkNumber(this)"
        />
        <button class='btn btn-primary' style='width: 100%' onclick="changePrice('txt${roomno}', '${roomno}')">Change</button>
    `;
  elem(`txt${roomno}`).focus();
}
function changePrice(txtPrice, roomno) {
  fetch("modal/roomPrice.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      room: roomno,
      price: dv(txtPrice),
    }),
  })
    .then((res) => {
      return res.text();
    })
    .then((data) => {
      if (data[0] === "<") {
        alert("Internal Error. Please contact the developers !");
        console.log("Error : " + data);
      } else {
        if (data === "YES") {
          alert("Fees Updated !");
          roomManage();
        } else {
          alert("There was a problem in updating the fees of this room !");
          console.log(data);
        }
      }
    })
    .catch((err) => {
      alert("Internal Error. Please contact the Developers !");
      console.log(err);
    });
}
function deAllocate(phone, roomno) {
  if (confirm("Are you sure want to clear the room ?")) {
    fetch("modal/deallocate.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: phone,
        room: roomno,
      }),
    })
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        if (data[0] === "<") {
          console.log(data);
          alert("Error: CL (Internal Error). Please contact the developer !");
        } else {
          if ((data = "YES")) {
            alert("The room has been cleared !");
            roomManage();
          } else if ((data = "NO")) {
            console.log(data);
            alert("Error: Problem in deallocating the room");
          } else {
            console.log(data);
            alert("Error: CL (Internal Error). Please contact the developer !");
          }
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error: CL (Internal Error). Please contact the administrator !");
      });
  }
}
function remRoom(id) {
  if (confirm("Are you sure want to delete ?")) {
    fetch("modal/delRoom.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        if (data[0] === "<") {
          alert("Internal Error. Please contact the developers !");
          console.log("Error : " + data);
        } else {
          if (data === "YES") {
            alert("Room Deleted !");
            roomManage();
          } else {
            alert("There was a problem in deleting the room !");
            console.log(data);
          }
        }
      })
      .catch((err) => {
        alert("Internal Error. Please contact the Developers !");
        console.log(err);
      });
  } else {
    return;
  }
}
function stuManage() {
  fetch("modal/studentData.php")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data[0] === "NO") {
        elem("mmnnmm").innerHTML = `
                <p class='text-warning' style='text-align: center'>
                No Students Are there !
                </p>`;
      } else {
        let output = "";
        data.forEach(function (rooms) {
          let delSTU = `Error: CL (Internal Error)`;
          if (rooms.allocation === "N/A") {
            delSTU = `
                    <button class='btn btn-danger' onclick="delSTUDENT('${rooms.phone}', '${rooms.name}')">
                        <i class='fas fa-times'></i>
                    </button>
                    `;
          } else {
            delSTU = `
                    <button class='btn btn-danger' onclick="alert('Deallocate ${rooms.name} from room no.: ${rooms.allocation} to kick him out from Hostel !')">
                        <i class='fas fa-times'></i>
                    </button>
                    `;
          }
          output += `
                <tr>
                    <td>${rooms.id}</td>
                    <td>${rooms.name}</td>
                    <td>${rooms.phone}</td>
                    <td>${rooms.f_name}</td>
                    <td>${rooms.dob}</td>
                    <td>${rooms.course}</td>
                    <td>${rooms.ac_year}</td>
                    <td>${rooms.p_addr}</td>
                    <td>${rooms.p_ph}</td>
                    <td>${rooms.lg_name}</td>
                    <td>${rooms.lg_addr}</td>
                    <td>${rooms.lg_ph}</td>
                    <td>${rooms.allocation}</td>
                    <td>${delSTU}</td>
                </tr >
                `;
        });
        elem("tBody").innerHTML = output;
      }
    })
    .catch((err) => {
      alert("Internal Error. Please contact the Developers !");
      console.log(err);
    });
}

function delSTUDENT(phone, name) {
  if (confirm(`Are you sure you want to kick out ${name} from this Hostel ?`)) {
    fetch("modal/kickStu.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: phone,
      }),
    })
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        if (data[0] === "<") {
          alert("Internal Error. Please contact the developers !");
          console.log("Error : " + data);
        } else {
          if (data === "YES") {
            alert(`${name} is kicked out from this hostel !`);
            reDirect("admin.html");
          } else {
            alert("There was a problem in deleting the room !");
            console.log(data);
          }
        }
      })
      .catch((err) => {
        alert("Internal Error. Please contact the Developers !");
        console.log(err);
      });
  }
}

function initAl() {
  let output = "";
  let output1 = "";
  elem("txtRoomNumber").disabled = true;
  elem("txtStudent").disabled = true;
  fetch("modal/getFreeRooms.php")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data[0] === "NO") {
        elem("txtRoomNumber").disabled = false;
        elem("txtRoomNumber").innerHTML = `
                    <option value="" hidden selected disabled >
                        No Rooms Available
                    </option>
                    `;
      } else {
        elem("txtRoomNumber").disabled = false;
        output = `
                    <option value="" hidden selected disabled >
                        Select a Room
                    </option >
                    `;
        data.forEach(function (rooms) {
          output += `
                        <option value="${rooms.room}" >
                            ${rooms.room}
                        </option>
                        `;
        });
        elem("txtRoomNumber").innerHTML = output;
      }
    })
    .catch((err) => {
      console.log(err);
      alert("Error: CL (Internal Error). Please Contact the Developers");
    });
  fetch("modal/getFreeStudents.php")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data[0] === "NO") {
        elem("txtStudent").disabled = false;
        elem("txtStudent").innerHTML = `
                    <option value="" hidden selected disabled >
                        No Students are there
                    </option >
        `;
      } else {
        elem("txtStudent").disabled = false;
        output1 = `
                    <option value="" hidden selected disabled >
                        Select Student
                    </option >
                    `;
        data.forEach(function (students) {
          output1 += `
                    <option value = '${students.name},${students.phone}' >
                        ${students.name}
                    </option >
                    `;
        });
        elem("txtStudent").innerHTML = output1;
      }
    })
    .catch((err) => {
      console.log(err);
      alert("Error: CL (Internal Error). Please Contact the Developers");
    });
}
function allocateRoom(btn) {
  if (elem("txtRoomNumber").value === "") {
    alert("Please Select the room number");
    elem("txtRoomNumber").focus();
  } else if (elem("txtStudent").value === "") {
    alert("Please Select the Student Name");
    elem("txtStudent").focus();
  } else {
    let temp_name = elem("txtStudent").value.split(",")[0];
    let temp_phone = elem("txtStudent").value.split(",")[1];
    fetch("modal/allocateRoom.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: temp_phone,
        room: elem("txtRoomNumber").value,
      }),
    })
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        if (data[0] === "<") {
          alert("Internal Error. Please contact the developers !");
          console.log("Error : " + data);
        } else {
          if (data === "YES") {
            alert(
              temp_name +
                " is allocated in room number : " +
                elem("txtRoomNumber").value
            );
            initAl();
          } else {
            console.log(data);
            alert("There was a problem in allocating the room !");
          }
        }
      })
      .catch((err) => {
        alert("Internal Error. Please contact the Developers !");
        console.log(err);
      });
  }
}
function searchStudentsINN(btn) {
  let txt = elem("txtSearchStudents");

  fetch("modal/getStudents.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone: txt.value,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data[0] === "<") {
        elem("modalBody").innerHTML =
          "<p style='text-align: center;'>Error: CL (Internal Error). Please contact the administrator ! </p>";
        console.log("Error : " + data);
      } else {
        if (data[0] === "NO") {
          elem("modalBody").innerHTML =
            "<p style='text-align: center;'>No Students with this Phone Number </p>";
        } else {
          elem("modalBody").innerHTML = `
                        <p><strong>ID : </strong>${data[0].id}</p>
                        <p><strong>Name : </strong>${data[0].name}</p>
                        <p><strong>Phone : </strong>${data[0].phone}</p>
                        <p><strong>Father's Name : </strong>${data[0].f_name}</p>
                        <p><strong>Date of Birth : </strong>${data[0].dob}</p>
                        <p><strong>Course : </strong>${data[0].course}</p>
                        <p><strong>Studying Course : </strong>${data[0].ac_year}</p>
                        <p><strong>Parent Address : </strong>${data[0].p_addr}</p>
                        <p><strong>Parent Phone Number : </strong>${data[0].p_ph}</p>
                        <p><strong>Local Guardian Name : </strong>${data[0].lg_name}</p>
                        <p><strong>Local Guardian Address : </strong>${data[0].lg_addr}</p>
                        <p><strong>Local Guardian Phone : </strong>${data[0].lg_ph}</p>
                        <p><strong>Allocated Room No. : </strong>${data[0].allocation}</p>
                    `;
        }
      }
    })
    .catch((err) => {
      elem("modalBody").innerHTML =
        "<p style='text-align: center;'>Error: CL (Internal Error). Please contact the administrator ! </p>";
      console.log(err);
    });
}
function searchOpen(txt) {
  if (txt.value === "" || txt.value === " ") {
    elem("btnSearchStu").disabled = true;
  } else {
    elem("btnSearchStu").disabled = false;
  }
}
function SendOpen(txt) {
  if (txt.value === "" || txt.value === " ") {
    elem("btnSendChat").disabled = true;
  } else {
    elem("btnSendChat").disabled = false;
  }
}
/* Student Portal */
function initStudentPORT() {
  let output = ``;
  fetch("modal/getChats.php")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data[0] === "NO") {
        output = `
                <li class="list-group-item"><span>No News Here ...</span></li>
                `;
      } else {
        data.forEach(function (chat) {
          output += `
                    <li class="list-group-item rellll">
                        <p class='messageTTT'>${chat.message}</p>
                        <p class='timeeeSS'>${chat.time}</p>
                    </li>
                    `;
        });
      }
      elem("messagesCHAT").innerHTML = output;
    })
    .catch((err) => {
      alert("Internal Error. Please contact the Developers !");
      console.log(err);
    });
}
function stuProfile() {
  fetch("modal/studentProfile.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone: get_cookie("stID"),
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data[0] === "NO") {
        alert("No Such Student... Please Log in with correct credentials !");
        set_cookie("student", "false");
        set_cookie("stID", "null");
        reDirect("join.html");
      } else {
        elem("nameProfile").innerHTML = `${data[0].name}'s Profile`;
        elem("txtName").value = `${data[0].name}`;
        elem("txtFName").value = `${data[0].f_name}`;
        elem("txtDOB").value = `${data[0].dob}`;
        elem("txtCourse").value = `${data[0].course}`;
        elem("txtYear").value = `${data[0].ac_year}`;
        elem("txtPAddress").value = `${data[0].p_addr}`;
        elem("txtPPhone").value = `${data[0].p_ph}`;
        elem("txtLGName").value = `${data[0].lg_name}`;
        elem("txtLGAddress").value = `${data[0].lg_addr}`;
        elem("txtLGPhone").value = `${data[0].lg_ph}`;
      }
    })
    .catch((err) => {
      alert("Internal Error. Please contact the Developers !");
      console.log(err);
    });
}
function updateProfile() {
  if (get_cookie("stID") !== "null" || get_cookie("stID") !== "false") {
    fetch("modal/editStuProfile.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: get_cookie("stID"),
        name: dv("txtName"),
        f_name: dv("txtFName"),
        dob: dv("txtDOB"),
        course: dv("txtCourse"),
        ac_year: dv("txtYear"),
        p_addr: dv("txtPAddress"),
        p_ph: dv("txtPPhone"),
        lg_name: dv("txtLGName"),
        lg_addr: dv("txtLGAddress"),
        lg_phone: dv("txtLGPhone"),
      }),
    })
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        if (data[0] === "<") {
          console.log(data);
          alert("Error: CL (Internal Error). Please contact the admin !");
        } else {
          if (data === "NO") {
            console.log(data);
            alert("There was a problem in updating the data !");
          } else if (data === "YES") {
            alert("Your Profile has been updated successfully !");
            stuProfile();
          } else {
            console.log(data);
            alert("There was a problem... Please Try again Later !");
          }
        }
      })
      .catch((err) => {
        alert("Internal Error. Please contact the Developers !");
        console.log(err);
      });
  } else {
    alert("No Such Student... Please Log in with correct credentials !");
    set_cookie("student", "false");
    set_cookie("stID", "null");
    reDirect("join.html");
  }
}
function stuRoomInit() {
  fetch("modal/stuRoom.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone: get_cookie("stID"),
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data[0] === "NO") {
        elem("roomRelated").innerHTML = `
                <p class='text-danger mt-5 mb-5' style='text-align:center;display: flex; justify-content:center; align-items: center;'>You are aren't allotted in a hostel room ! Request your administrator for allotting a Bed for you...</p>
                `;
      } else {
        elem("roomNo").innerHTML = `<strong>${data[0].room}</strong>`;
        elem("roomFees").innerHTML = `<strong>${data[0].price}</strong>`;
        let ddtt = new Date();
        elem("thismonth").innerHTML = calcMonth(parseInt(ddtt.getMonth() + 1));
        fetch("modal/getBills.php")
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            elem("el_bill").innerHTML = `${data[0].el_bill}`;
            elem("wt_bill").innerHTML = `${data[0].wt_bill}`;
          })
          .catch((err) => {
            console.error("There was a problem in the code : " + err);
          });
        fetch("modal/getPNP.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: get_cookie("stID"),
          }),
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            if (data[0] == "NO") {
              elem("pntp").classList.add("text-danger");
              elem("pntp").innerHTML = `NOT PAID`;
            } else {
              let tMonth = ddtt.getMonth() + 1;
              let tYear = ddtt.getFullYear();
              let paid = false;
              data.forEach((item) => {
                if (item.p_month == tMonth && item.p_year == tYear) {
                  paid = true;
                }
              });
              if (paid) {
                elem("pntp").classList.add("text-success");
                elem("pntp").innerHTML = `PAID`;
              } else {
                elem("pntp").classList.add("text-danger");
                elem("pntp").innerHTML = `NOT PAID`;
              }
            }
          })
          .catch((err) => {
            console.error("There was a problem in the code : " + err);
          });
      }
    })
    .catch((err) => {
      alert("Internal Error. Please contact the Developers !");
      console.log(err);
    });

  fetch("modal/getRequestStu.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone: get_cookie("stID"),
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data[0] === "NO") {
        elem("changeRequest").innerHTML = `
                <p class='text-danger mt-5 mb-5' style='text-align:center;display: flex; justify-content:center; align-items: center;'>
                    No Request made with your account....
                </p>
                `;
      } else {
        let output = "";
        data.forEach(function (req) {
          let approval = `<td`;
          if (req.state === "0") {
            approval += ` class='text-warning'> Pending...`;
          } else if (req.state === "1") {
            approval += ` class='text-success'> Accepted 
                        &nbsp;
                        <span onclick='removeRequest(${req.id})' style='cursor: pointer; color: var(--red); text-decoration: underline; font-weight: bold;'>
                            X
                        </span>
                        `;
          } else if (req.state === "-1") {
            approval += ` class='text-danger'> Rejected  
                        &nbsp; 
                        <span onclick='removeRequest(${req.id})' style='cursor: pointer; color: var(--red); text-decoration: underline; font-weight: bold;'>
                          X
                        </span>
                        `;
          } else {
            console.log(data.req);
            approval += ` class='text-primary'> Error: CL`;
          }
          approval += `</td>`;
          output += `
                    <tr>
                        <td>${req.type}</td>
                        <td>${req.reason}</td>
                        ${approval}
                    </tr>
                    `;
        });
        elem("dyRequest").innerHTML = output;
      }
    })
    .catch((err) => {
      alert("Internal Error. Please contact the Developers !");
      console.log(err);
    });
}

function requestLeave() {
  if (dv("txtTOL") === "" || dv("txtWHY") === "") {
    if (dv("txtTOL") === "") {
      alert("Please Select the Type of Leave !");
    } else if (dv("txtWHY") === "") {
      alert("Please write the reason for your leave...");
    } else {
      alert("Please make sure you gave the correct data !");
    }
  } else {
    fetch("modal/rfl.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tol: dv("txtTOL"),
        why: dv("txtWHY"),
        phone: get_cookie("stID"),
      }),
    })
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        if (data[0] === "<") {
          console.log(data);
          alert("Error: CL (Internal Error). Please Contact the admin !");
        } else {
          if (data === "YES") {
            alert(
              "Request Made sucessfully ! You will be notified when admin accepts the request.. Please check the room details page for updates !"
            );
            reDirect("studentportal.html");
          } else {
            console.log(data);
            alert(
              "There was a problem in requesting. Please Try again later !"
            );
          }
        }
      })
      .catch((err) => {
        alert("Internal Error. Please contact the Developers !");
        console.log(err);
      });
  }
}

function removeRequest(id) {
  if (confirm("Are you sure want to delete this request ?")) {
    fetch("modal/deleteRequest.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        if (data[0] === "<") {
          console.log(data);
          alert("Error: CL (Internal Error). Please contact the admin !");
        } else {
          if (data === "NO") {
            console.log(data);
            alert("There was a problem in deleting the the request !");
          } else if (data === "YES") {
            alert("Request Deleted Successfully !");
            stuRoomInit();
          } else {
            console.log(data);
            alert("There was a problem... Please Try again Later !");
          }
        }
      })
      .catch((err) => {
        alert("Internal Error. Please contact the Developers !");
        console.log(err);
      });
  }
}

function removeRequestADMIN(id) {
  if (confirm("Are you sure want to delete this request ?")) {
    fetch("modal/deleteRequest.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        if (data[0] === "<") {
          console.log(data);
          alert("Error: CL (Internal Error). Please contact the admin !");
        } else {
          if (data === "NO") {
            console.log(data);
            alert("There was a problem in deleting the the request !");
          } else if (data === "YES") {
            alert("Request Deleted Successfully !");
            aDash();
          } else {
            console.log(data);
            alert("There was a problem... Please Try again Later !");
          }
        }
      })
      .catch((err) => {
        alert("Internal Error. Please contact the Developers !");
        console.log(err);
      });
  }
}

async function showPayBtn() {
  if (elem("txtPhone").value == "" || elem("txtPhone").value == " ") {
    return;
  } else {
    await fetch("modal/chkStuRm.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: elem("txtPhone").value,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data[0] == "NO") {
          console.error(
            elem("txtPhone").value +
              ": this is not a Registered Phone Number to any room or hostel"
          );
          alert("Phone Number Doesn't Exist or Not Allocated to any room..");
        } else {
          elem("txtName").value = data[0].name;
          fetch("modal/getStdRC.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phone: elem("txtPhone").value,
            }),
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              if (data[0] == "NO") {
                elem("stRC").innerHTML = `
                  <p class='text-danger h5'>
                    <strong style="text-decoration: underline;">${
                      elem("txtName").value
                    }</strong> has still not made any payments !
                  </p>                  
                `;
              } else {
                let mxLn = data.length - 1;
                elem("stRC").innerHTML = `
                <p class='text-dark h4'>
                  <strong style="text-decoration: underline;">${
                    elem("txtName").value
                  }</strong> has last paid fees on : ${data[mxLn].paydate}
                  for <span class="font-weight-bold">${calcMonth(
                    parseInt(data[mxLn].p_month)
                  )}-${data[mxLn].p_year}</span> 
                </p>                  
              `;
              }
            })
            .catch((err) => {
              console.error("There was an error in the code : " + err);
            });
        }
      })
      .catch((err) => {
        console.error("There was an error in the code : " + err);
      });
  }
  if (elem("txtName").value != 0) {
    elem("btnAddRC").disabled = false;
  } else {
    return;
  }
}

(function payBill() {
  if (elem("paymentCtrl")) {
    elem("paymentCtrl").addEventListener("submit", function (e) {
      e.preventDefault();
      let nDte = new Date();
      fetch("modal/addBillRC.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: elem("txtPhone").value,
          name: elem("txtName").value,
          p_m: elem("txtMonth").value,
          p_y: elem("txtYear").value,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data[0] == "NO") {
            console.error("There was a problem : " + data);
          } else {
            alert(elem("txtName").value + " Room Payment has been Paid!");
            let mxLn = data.length - 1;
            elem("stRC").innerHTML = `
            <p class='text-dark h4'>
              <strong style="text-decoration: underline;">${
                elem("txtName").value
              }</strong> has last paid fees on : ${data[mxLn].paydate}
              for <span class="font-weight-bold">${calcMonth(
                parseInt(data[mxLn].p_month)
              )}-${data[mxLn].p_year}</span> 
            </p>                  
          `;
          }
        })
        .catch((err) => {
          console.error("There was an error in the code : " + err);
        });
    });
    let nDt = new Date();
    elem("txtMonth").value = nDt.getMonth() + 1;
    elem("txtYear").value = nDt.getFullYear();
  } else {
    return;
  }
})();
