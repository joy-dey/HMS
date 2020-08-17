<?php
include "connect.php";
$data = json_decode(file_get_contents("php://input"));
$txtName = $data->txtName;
$txtNumber = $data->txtNumber;
$txtPass = $data->txtPassword;
$txtFname = $data->txtFname;
$txtDate = $data->txtDate;
$txtCourse = $data->txtCourse;
$txtYear = $data->txtYear;
$txtAddress = $data->txtAddress;
$txtHSPhone = $data->txtHSPhone;
$txtLGName = $data->txtLGName;
$txtLGAddress = $data->txtLGAddress;
$txtLGNumber = $data->txtLGNumber;
$sql = "INSERT INTO student_reg(name,phone,pass,f_name,dob,course,ac_year,p_addr,p_ph,lg_name,lg_addr,lg_ph,allocation) VALUES ('" . $txtName . "','" . $txtNumber . "','" . $txtPass . "','" . $txtFname . "','" . $txtDate . "','" . $txtCourse . "','" . $txtYear . "','" . $txtAddress . "','" . $txtHSPhone . "','" . $txtLGName . "','" . $txtLGAddress . "','" . $txtLGNumber . "', 'N/A')";
$result = mysqli_query($cn, $sql) or die(mysqli_error($cn));
if ($result) {
    $sql1 = " INSERT INTO login(uname, pass, type) VALUES ('" . $txtNumber . "','" . $txtPass . "','student')";
    $result1 = mysqli_query($cn, $sql1) or die(mysqli_error($cn));
    if ($result1) {
        echo "YES";
    }
} else {
    echo "NO";
}

mysqli_close($cn);
