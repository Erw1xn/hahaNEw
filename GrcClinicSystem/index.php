<?php
session_start();

// If the user is not logged in, redirect to login page
if (!isset($_SESSION['user_id'])) {
    header("Location: login.html");
    exit;
}

// If logged in, display the dashboard (index.html)
include "index.html";
?>