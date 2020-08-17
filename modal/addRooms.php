<?php
include "connect.php";
$data = json_decode(file_get_contents("php://input"));
$room = $data->room;
$fees = $data->fees;
$checkSQL = "SELECT * from rooms where room='" . $room . "'";
$checkRes = mysqli_query($cn, $checkSQL) or die(mysqli_error($cn));
if (mysqli_num_rows($checkRes) == 1) {
    echo "AE";
} else {
    $sql = "INSERT INTO rooms(room,price,state,user) VALUES ('" . $room . "','₹" . $fees . "','0','NA')";
    $result = mysqli_query($cn, $sql) or die(mysqli_error($cn));
    if ($result) {
    echo "YES";
    } else {
    echo "NO";
    }
}

mysqli_close($cn);
    