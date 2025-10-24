<?php
include 'db_connect.php';

$sql = "SELECT date_time, name, course_section, id_no, complaint, medicine_given 
        FROM cellsus 
        ORDER BY date_time DESC";
$result = $conn->query($sql);

$patients = [];

while ($row = $result->fetch_assoc()) {
  $patients[] = $row;
}

echo json_encode($patients);
$conn->close();
?>