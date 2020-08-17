<?php
include "connect.php";
$data = json_decode(file_get_contents("php://input"));
$message = $data->message;
$time = $data->time;
$sql = "INSERT INTO news(message, time) VALUES ('" . $message . "','" . $time . "')";
$result = mysqli_query($cn, $sql) or die(mysqli_error($cn));
if ($result) {
    echo "YES";
} else {
    echo "NO";
}

mysqli_close($cn);
