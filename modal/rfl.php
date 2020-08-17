<?php
include "connect.php";
$data = json_decode(file_get_contents("php://input"));
$type = $data->tol;
$reason = $data->why;
$phone = $data->phone;
$sql = "INSERT INTO rfl (type,reason,student,state) VALUES ('" . $type . "','" . $reason . "','" . $phone . "','0')";
$result = mysqli_query($cn, $sql) or die(mysqli_error($cn));
if ($result) {
    echo "YES";
} else {
    echo "NO";
}

mysqli_close($cn);
