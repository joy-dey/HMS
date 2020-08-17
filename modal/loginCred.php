<?php
include "connect.php";
$data = json_decode(file_get_contents("php://input"));
$phone = $data->phone;
$sql = "SELECT * FROM student_reg WHERE phone='" . $phone . "'";
$result = mysqli_query($cn, $sql);

if (mysqli_num_rows($result) == 1) {
    $output = "YES";
} else {
    $output = "NO";
}

echo $output;

mysqli_close($cn);
