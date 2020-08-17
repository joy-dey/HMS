<?php
include "connect.php";
$data = json_decode(file_get_contents("php://input"));
$id = $data->id;
$sql = "DELETE FROM rfl WHERE id='" . $id . "'";
$result = mysqli_query($cn, $sql) or die(mysqli_error($cn));
if ($result) {
    $out = "YES";
} else {
    $out = "NO";
}

echo $out;

mysqli_close($cn);
