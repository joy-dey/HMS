<?php
include "connect.php";

$sql = "SELECT * FROM billing";
$request = mysqli_query($cn, $sql) or die(mysqli_error($cn));

if ($request) {
    if (mysqli_num_rows($request)) {
        while ($row = mysqli_fetch_assoc($request)) {
            $output[] = $row;
        }
    } else {
        $output = ["No Data"];
    }
} else {
    $output = ["0"];
}

echo json_encode($output);

mysqli_close($cn);
