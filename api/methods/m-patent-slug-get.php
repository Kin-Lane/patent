<?php
$route = '/patent/:slug/';
$app->get($route, function ($slug) use ($app){

	$request = $app->request();
	$_GET = $request->params();

	$ReturnObject = array();

	$Query = "SELECT * FROM patent WHERE slug = '" . $slug . "'";
	$DatabaseResult = mysql_query($Query) or die('Query failed: ' . mysql_error());

	while ($Database = mysql_fetch_assoc($DatabaseResult))
		{
		$name = $Database['name'];
		$summary = $Database['summary'];
		$abstract = $Database['abstract'];
		$url = $Database['url'];
		$owner = $Database['owner'];
		$number = $Database['number'];
		$tags = $Database['tags'];
		$slug = $Database['slug'];
		$publication_number = $Database['publication_number'];
		$publication_date = $Database['publication_date'];
		$publication_date = date('m-d-Y', strtotime($publication_date));
		$application_number = $Database['application_number'];
		$application_date = $Database['application_date'];
		$application_date = date('m-d-Y', strtotime($application_date));

		$F = array();
		$F['name'] = $name;
		$F['summary'] = $summary;
		$F['abstract'] = $abstract;
		$F['url'] = $url;
		$F['owner'] = $owner;
		$F['publication_number'] = $publication_number;
		$F['publication_date'] = $publication_date;
		$F['application_number'] = $application_number;
		$F['application_date'] = $application_date;
		$F['tags'] = $tags;
		$F['slug'] = $slug;

		array_push($ReturnObject, $F);

		}

	$app->response()->header("Content-Type", "application/json");
	echo stripslashes(format_json(json_encode($ReturnObject)));

	});
?>
