<?php
include "connect.php";
$data = json_decode(file_get_contents("php://input"));
$username = $data->username;
$password = $data->password;

$sql = "SELECT pass,type FROM login WHERE uname='" . $username . "'";
$result = mysqli_query($cn, $sql);
$row = mysqli_fetch_row($result);
$pass = $row[0];
$type = $row[1];

if ($password == $pass) {
    if ($type == "admin") {
        $out = "1ad";
    } else if ($type == "student") {
        $out = "1st";
    } else {
        $out = "0no";
    }
} else {
    $out = "0";
}

echo $out;

mysqli_close($cn);
