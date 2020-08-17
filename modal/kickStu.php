<?php
include "connect.php";
$data = json_decode(file_get_contents("php://input"));
$phone = $data->phone;
$sql = "DELETE FROM student_reg WHERE phone='" . $phone . "'";
$result = mysqli_query($cn, $sql) or die(mysqli_error($cn));
if ($result) {
    $out = "YES";
    $phone = $data->phone;
    $sql1 = "DELETE FROM login WHERE uname='" . $phone . "'";
    $result1 = mysqli_query($cn, $sql1) or die(mysqli_error($cn));
    if ($result1) {
        $out = "YES";
    } else {
        $out = "NO";
    }
} else {
    $out = "NO";
}

echo $out;

mysqli_close($cn);
