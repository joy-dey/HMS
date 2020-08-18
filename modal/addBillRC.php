<?php
include "connect.php";
$data = json_decode(file_get_contents("php://input"));
$phone = $data->phone;
$name = $data->name;
$p_m = $data->p_m;
$p_y = $data->p_y;
$pd = date("d/m/y");
$sql = "INSERT INTO bill_rec (phone,name,p_month,p_year,paydate) VALUES ('" . $phone . "','" . $name . "','" . $p_m . "','" . $p_y . "','" . $pd . "')";
$result = mysqli_query($cn, $sql) or die(mysqli_error($cn));
if ($result) {
    $sql1 = "SELECT * FROM bill_rec WHERE phone='" . $phone . "'";
    $result1 = mysqli_query($cn, $sql1) or die(mysqli_error($cn));
    if (mysqli_num_rows($result1)) {
        while ($row = mysqli_fetch_assoc($result1)) {
            $output[] = $row;
        }
    } else {
        $output[] = "NO";
    }
} else {
    $output[] = "NO";
}

echo json_encode($output);

mysqli_close($cn);
