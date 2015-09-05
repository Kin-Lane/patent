<?php
$route = '/patent/';
$app->post($route, function () use ($app){

	$request = $app->request();
	$_GET = $request->params();

	if(isset($_GET['name'])){ $name = $_GET['name']; } else { $name = '';}
	if(isset($_GET['summary'])){ $summary = $_GET['summary']; } else { $summary = '';}
	if(isset($_GET['abstract'])){ $abstract = $_GET['abstract']; } else { $abstract = '';}
	if(isset($_GET['url'])){ $url = $_GET['url']; } else { $url = '';}
	if(isset($_GET['owner'])){ $owner = $_GET['owner']; } else { $owner = '';}
	if(isset($_GET['number'])){ $number = $_GET['number']; } else { $number = '';}
	if(isset($_GET['tags'])){ $tags = "New," . $_GET['tags']; } else { $tags = "New";}
	$slug = PrepareFileName($name);

	if($url!='')
		{
		$Query = "SELECT * FROM patent WHERE url = '" . $url . "'";
		}
	else
		{
		$Query = "SELECT * FROM patent WHERE name = '" . $name . "'";
		}

	$Database = mysql_query($Query) or die('Query failed: ' . mysql_error());

	if($Database && mysql_num_rows($Database))
		{
		$Link = mysql_fetch_assoc($Database);

		$ReturnObject = array();
		$ReturnObject['message'] = "Patent Already Exists!";
		$ReturnObject['slug'] = $slug;

		}
	else
		{
		$query = "INSERT INTO patent(";

		if(isset($name) && $name!=''){ $query .= 'name' . ","; }
		if(isset($summary) && $summary!=''){ $query .= 'summary' . ","; }
		if(isset($abstract) && $abstract!=''){ $query .= 'abstract' . ","; }
		if(isset($url) && $url!=''){ $query .= 'url' . ","; }
		if(isset($owner) && $owner!=''){ $query .= 'owner' . ","; }
		if(isset($number) && $number!=''){ $query .= 'owner' . ","; }
		if(isset($tags) && $tags!=''){ $query .= 'tags'; }

		$query .= ") VALUES(";

		if(isset($name) && $name!=''){ $query .= "'" . mysql_real_escape_string($name) . "',"; }
		if(isset($summary) && $summary!=''){ $query .= "'" . mysql_real_escape_string($summary) . "',"; }
		if(isset($abstract) && $abstract!=''){ $query .= "'" . mysql_real_escape_string($abstract) . "',"; }
		if(isset($url) && $url!=''){ $query .= "'" . mysql_real_escape_string($url) . "',"; }
		if(isset($owner) && $owner!=''){ $query .= "'" . mysql_real_escape_string($owner) . "',"; }
		if(isset($number) && $number!=''){ $query .= "'" . mysql_real_escape_string($number) . "',"; }
		if(isset($tags) && $tags!=''){ $query .= "'" . mysql_real_escape_string($tags) . "'"; }

		$query .= ")";

		mysql_query($query) or die('Query failed: ' . mysql_error());

		$ReturnObject = array();
		$ReturnObject['message'] = "Patent Added!";
		$ReturnObject['slug'] = $slug;
		}

	$app->response()->header("Content-Type", "application/json");
	echo stripslashes(format_json(json_encode($ReturnObject)));

	});
?>
