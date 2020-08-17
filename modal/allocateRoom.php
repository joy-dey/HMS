<?php
include "connect.php";
$data = json_decode(file_get_contents("php://input"));
$phone = $data->phone;
$room = $data->room;
$sql = "UPDATE student_reg login SET allocation='" . $room . "' WHERE phone='" . $phone . "'";
$result = mysqli_query($cn, $sql) or die(mysqli_error($cn));
if ($result) {
    $sql1 = "UPDATE rooms login SET user='" . $phone . "', state='1' WHERE room='" . $room . "'";
    $result1 = mysqli_query($cn, $sql1) or die(mysqli_error($cn));
    if ($result1) {
        echo "YES";
    }
} else {
    echo "NO";
}

mysqli_close($cn);
