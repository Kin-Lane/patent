<?php
// Custom
$route = '/patent/utilities/generateslugs/';
$app->get($route, function () use ($app){

	$request = $app->request();
	$_GET = $request->params();

	$ReturnObject = array();

	$Query = "SELECT * FROM patent WHERE slug = '' OR slug IS NULL";
	//echo $Query . "<br />";
	$DatabaseResult = mysql_query($Query) or die('Query failed: ' . mysql_error());

	while ($Database = mysql_fetch_assoc($DatabaseResult))
		{
		$name = $Database['name'];
		$summary = $Database['summary'];
		$abstract = $Database['abstract'];
		$url = $Database['url'];
		$owner = $Database['owner'];
		$number = $Database['number'];
		$filing_date = $Database['filing_date'];
		$tags = $Database['tags'];

		$slug = PrepareFileName($name);

		$UpdateQuery = "UPDATE patent SET";
		$UpdateQuery .= " slug = '" . strip_tags(mysql_real_escape_string($slug)) . "'";
		$UpdateQuery .= " WHERE number = '" . $number . "'";
		//echo $UpdateQuery . "<br />";
		$UpdateResult = mysql_query($UpdateQuery) or die('Query failed: ' . mysql_error());

		$F = array();
		$F['name'] = $name;
		$F['summary'] = $summary;
		$F['abstract'] = $abstract;
		$F['url'] = $url;
		$F['filing_date'] = $filing_date;
		$F['owner'] = $owner;
		$F['number'] = $number;
		$F['tags'] = $tags;
		$F['slug'] = $slug;

		array_push($ReturnObject, $F);

		}

	$app->response()->header("Content-Type", "application/json");
	echo stripslashes(format_json(json_encode($ReturnObject)));

	});
?>
