<?php
include "connect.php";
$sql = "SELECT * FROM student_reg";
$result = mysqli_query($cn, $sql);
$out = mysqli_num_rows($result);

echo $out;

mysqli_close($cn);
