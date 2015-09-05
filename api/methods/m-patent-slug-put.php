<?php
$route = '/patent/:slug/';
$app->put($route, function ($slug) use ($app){

	$request = $app->request();
	$_GET = $request->params();

	if(isset($_GET['name'])){ $name = $_GET['name']; } else { $name = '';}
	if(isset($_GET['summary'])){ $summary = $_GET['summary']; } else { $summary = '';}
	if(isset($_GET['abstract'])){ $abstract = $_GET['abstract']; } else { $abstract = '';}
	if(isset($_GET['url'])){ $url = $_GET['url']; } else { $url = '';}
	if(isset($_GET['owner'])){ $owner = $_GET['owner']; } else { $owner = '';}
	if(isset($_GET['number'])){ $number = $_GET['number']; } else { $number = '';}
	if(isset($_GET['tags'])){ $tags = $_GET['tags']; } else { $tags = '';}

	$Query = "SELECT * FROM patent WHERE slug = '" . $slug . "'";

	$Database = mysql_query($Query) or die('Query failed: ' . mysql_error());

	if($Database && mysql_num_rows($Database))
		{
		$query = "UPDATE patent SET";

		if(isset($name))
			{
			$query .= "name='" . mysql_real_escape_string($name) . "'";
			}
		if(isset($summary))
			{
			$query .= "summary='" . mysql_real_escape_string($summary) . "'";
			}
		if(isset($abstract))
			{
			$query .= "abstract='" . mysql_real_escape_string($abstract) . "'";
			}
		if(isset($url))
			{
			$query .= "url='" . mysql_real_escape_string($url) . "'";
			}
		if(isset($owner))
			{
			$query .= "owner='" . mysql_real_escape_string($owner) . "'";
			}
		if(isset($number))
			{
			$query .= "number='" . mysql_real_escape_string($number) . "'";
			}
		if(isset($tags))
			{
			$query .= "tags='" . mysql_real_escape_string($tags) . "'";
			}
		if(isset($slug))
			{
			$query .= "slug='" . mysql_real_escape_string($slug) . "'";
			}

		$query .= " WHERE slug = '" . $slug . "'";
		mysql_query($query) or die('Query failed: ' . mysql_error());

		$ReturnObject = array();
		$ReturnObject['message'] = "Patent Updated!";
		$ReturnObject['slug'] = $slug;
		}

	$app->response()->header("Content-Type", "application/json");
	echo stripslashes(format_json(json_encode($ReturnObject)));

	});
?>
