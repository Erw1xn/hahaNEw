<?php
session_start();

// If the user is not logged in, redirect to login page
if (!isset($_SESSION['user_id'])) {
    header("Location: login.html");
    exit;
}

// OPTIONAL: Set a fallback in case full_name is missing
$fullName = isset($_SESSION['full_name']) ? $_SESSION['full_name'] : "Guest User";
?>