<?php
include "connect.php";
$data = json_decode(file_get_contents("php://input"));
$el_bill = $data->el_bill;
$wt_bill = $data->wt_bill;
$sql = "UPDATE billing SET el_bill='" . $el_bill . "', wt_bill='" . $wt_bill . "' WHERE id='1'";
$result = mysqli_query($cn, $sql) or die(mysqli_error($cn));
if ($result) {
    $output = ["1"];
} else {
    $output = ["0"];
}

echo json_encode($output);

mysqli_close($cn);
