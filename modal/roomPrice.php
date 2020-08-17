<?php
include "connect.php";
$data = json_decode(file_get_contents("php://input"));
$room = $data->room;
$price = $data->price;
$sql = "UPDATE rooms SET price='₹" . $price . "' WHERE room='" . $room . "'";
$result = mysqli_query($cn, $sql) or die(mysqli_error($cn));
if ($result) {
    echo "YES";
} else {
    echo "NO";
}

mysqli_close($cn);
