# Pagination-Plugin

how to use the plugin
1- import the dependencies 
<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css"/>
<script src="js/jquery-1.11.3.min.js"></script>

2- import the plugin
<script src="js/7pagination.js"></script>

3- create object for the table
var firstTable = document.getElementById("hossam");

4- create object of ITS_Navigation 
var customNavigation = new ITS_Navigation("hossam",5,true);

5-add createNavigation method to onload event
firstTable.onload = customNavigation.createNavigation();