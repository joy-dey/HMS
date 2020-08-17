<?php
include "connect.php";
$sql = "SELECT * FROM student_reg";
$result = mysqli_query($cn, $sql) or die(mysqli_error($cn));

if (mysqli_num_rows($result)) {
    while ($row = mysqli_fetch_assoc($result)) {
        $output[] = $row;
    }
} else {
    $output[] = "NO";
}

echo json_encode($output);

mysqli_close($cn);
