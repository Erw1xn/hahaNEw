<?php
include 'db_connect.php'; // your database connection file

$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'];
$course = $data['course'];
$id_no = $data['id']; // ID No#
$complaint = $data['complaint'];
$medicine = $data['medicine'];

$sql = "INSERT INTO cellsus 
(date_time, name, course_section, id_no, complaint, medicine_given) 
VALUES (NOW(), ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssss", $name, $course, $id_no, $complaint, $medicine);

if ($stmt->execute()) {
  echo "✅ Patient added successfully!";
} else {
  echo "❌ Error: " . $conn->error;
}

$stmt->close();
$conn->close();
?><?php
include 'db_connect.php'; // your database connection file

$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'];
$course = $data['course'];
$id_no = $data['id']; // ID No#
$complaint = $data['complaint'];
$medicine = $data['medicine'];

$sql = "INSERT INTO cellsus 
(date_time, name, course_section, id_no, complaint, medicine_given) 
VALUES (NOW(), ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssss", $name, $course, $id_no, $complaint, $medicine);

if ($stmt->execute()) {
  echo "✅ Patient added successfully!";
} else {
  echo "❌ Error: " . $conn->error;
}

$stmt->close();
$conn->close();
?><?php
include 'db_connect.php'; // your database connection file

$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'];
$course = $data['course'];
$id_no = $data['id']; // ID No#
$complaint = $data['complaint'];
$medicine = $data['medicine'];

$sql = "INSERT INTO cellsus 
(date_time, name, course_section, id_no, complaint, medicine_given) 
VALUES (NOW(), ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssss", $name, $course, $id_no, $complaint, $medicine);

if ($stmt->execute()) {
  echo "✅ Patient added successfully!";
} else {
  echo "❌ Error: " . $conn->error;
}

$stmt->close();
$conn->close();
?>