<?php
$route = '/patent/';
$app->get($route, function () use ($app){

	$request = $app->request();
	$_GET = $request->params();

	if(isset($_GET['query'])){ $query = $_GET['query']; } else { $query = ''; }
	if(isset($_GET['year'])){ $year = $_GET['year']; } else { $year = date('Y'); }
	if(isset($_GET['match'])){ $match = $_GET['match']; } else { $match = ''; }

	$ReturnObject = array();

	$Query = "SELECT * FROM patent WHERE LENGTH(NAME) > 2";

	if($year!='all')
		{
		$Query .= " AND YEAR(publication_date) = '" . $year . "'";
		}

	if($query!='')
		{
		$Query .= " AND (name LIKE '%" . $query . "%' OR abstract LIKE '%" . $query . "%')";
		}
	if($match!='')
		{
		$Query .= " AND match_type = '" . $match . "'";
		}

	$Query .= " ORDER BY owner,name ASC";

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
		$tags = $Database['tags'];
		$slug = $Database['slug'];
		$publication_number = $Database['publication_number'];
		$publication_date = $Database['publication_date'];
		$publication_date = date('Y-m-d', strtotime($publication_date));
		$application_number = $Database['application_number'];
		$application_date = $Database['application_date'];
		$application_date = date('Y-m-d', strtotime($application_date));
		$match_type = $Database['match_type'];

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
		$F['match_type'] = $match_type;

		array_push($ReturnObject, $F);

		}

	$app->response()->header("Content-Type", "application/json");
	echo stripslashes(format_json(json_encode($ReturnObject)));

	});
?>
