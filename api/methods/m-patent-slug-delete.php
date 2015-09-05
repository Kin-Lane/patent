<?php
$route = '/patent/:slug/';
$app->delete($route, function ($slug) use ($app){

	$request = $app->request();
	$_GET = $request->params();

	$Query = "DELETE FROM patent WHERE slug = '" . $slug . "'";

	mysql_query($Query) or die('Query failed: ' . mysql_error());

	$ReturnObject = array();
	$ReturnObject['message'] = "Patent Deleted!";
	$ReturnObject['slug'] = $slug;

	$app->response()->header("Content-Type", "application/json");
	echo stripslashes(format_json(json_encode($ReturnObject)));

	});
?>
