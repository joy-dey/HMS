<?php
include "connect.php";
$data = json_decode(file_get_contents("php://input"));
$phone = $data->phone;
$name = $data->name;
$f_name = $data->f_name;
$dob = $data->dob;
$course = $data->course;
$ac_year = $data->ac_year;
$p_addr = $data->p_addr;
$p_ph = $data->p_ph;
$lg_name = $data->lg_name;
$lg_addr = $data->lg_addr;
$lg_ph = $data->lg_phone;
$sql = "UPDATE student_reg SET name='" . $name . "', f_name='" . $f_name . "', dob='" . $dob . "',course='" . $course . "',ac_year='" . $ac_year . "',p_addr='" . $p_addr . "', p_ph='" . $p_ph . "',lg_name='" . $lg_name . "',lg_addr='" . $lg_addr . "', p_ph='" . $p_ph . "', lg_ph='" . $lg_ph . "' WHERE phone='" . $phone . "'";
$result = mysqli_query($cn, $sql) or die(mysqli_error($cn));
if ($result) {
    echo "YES";
} else {
    echo "NO";
}

mysqli_close($cn);
