<?php
$route = '/patent/filters/by-owner/';
$app->get($route, function () use ($app){

	$request = $app->request();
	$_GET = $request->params();

	$ReturnObject = array();

	$Query = "SELECT DISTINCT owner, count(*) as patent_count FROM patent WHERE owner <> '' GROUP BY owner ORDER BY count(*) DESC";
	//echo $Query . "<br />";
	$DatabaseResult = mysql_query($Query) or die('Query failed: ' . mysql_error());

	while ($Database = mysql_fetch_assoc($DatabaseResult))
		{
		$owner = $Database['owner'];
		$patent_count = $Database['patent_count'];

		$F = array();
		$F['owner'] = $owner;
		$F['patent_count'] = $patent_count;

		array_push($ReturnObject, $F);

		}

	$app->response()->header("Content-Type", "application/json");
	echo stripslashes(format_json(json_encode($ReturnObject)));

	});
?>
