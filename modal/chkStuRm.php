<?php
include "connect.php";
$data = json_decode(file_get_contents("php://input"));
$phone = $data->phone;
$sql = "SELECT * FROM student_reg WHERE phone='" . $phone . "'";
$result = mysqli_query($cn, $sql) or die(mysqli_error($cn));

if (mysqli_num_rows($result)) {
    $sql1 = "SELECT * FROM rooms WHERE user='" . $phone . "'";
    $result1 = mysqli_query($cn, $sql1) or die(mysqli_error($cn));
    if (mysqli_num_rows($result1)) {
        while ($row = mysqli_fetch_assoc($result)) {
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
