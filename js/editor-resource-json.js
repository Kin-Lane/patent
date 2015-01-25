
$WorkingResponse = "";
$resourcecount = 0;
$textEditors = "";

function ResourceShowme($row)
	{
	$thisrow = $row.id;
	$thisslug = $thisrow.replace("-icon","");
	$thisrow = document.getElementById($thisslug).style.display;

	if($thisrow=='none')
		{
		document.getElementById($thisslug).style.display = '';
		}
	else
		{
		document.getElementById($thisslug).style.display = 'none';
		}
	}

function addResource(tinyInstance)
	{

	$resource_name = document.getElementById("add-resource-name").value;
	$resource_summary = document.getElementById("add-resource-summary").value;
	$resource_abstract = document.getElementById("add-resource-abstract").value;
	$resource_url = document.getElementById("add-resource-url").value;
	$resource_owner = document.getElementById("add-resource-owner").value;
	$resource_number = document.getElementById("add-resource-number").value;
	$resource_tags = document.getElementById("add-resource-tags").value;

	$postData = {};

	$postData['appid'] = $APIConfig['3Scale']['appid'];
	$postData['appkey'] = $APIConfig['3Scale']['appkey'];

	$postData['name'] = $resource_name;
	$postData['summary'] = $resource_summary;
	$postData['abstract'] = $resource_abstract;
	$postData['url'] = $resource_url;
	$postData['owner'] = $resource_owner;
	$postData['number'] = $resource_number;
	$postData['tags'] = $resource_tags;

	$hosturl = 'http://patent.api.kinlane.com';
	$baseurl = '/';
	$resource = 'patent/';
	
	$apiurl = $hosturl + $baseurl + $resource;
console.log($apiurl);
		$.ajax({
		url: $apiurl,
		type: 'POST',
		data: $postData,
		success: function(data) {

			$WorkingResponse = data;
			$ResourceCount = 0;

			$.each(data, function(resourceKey, resourceValue) {

				$resource_name = resourceValue['name'];
				$resource_summary = resourceValue['summary'];
				$resource_abstract = resourceValue['abstract'];
				$resource_url = resourceValue['url'];
				$resource_owner = resourceValue['owner'];
				$resource_number = resourceValue['number'];
				$resource_tags = resourceValue['tags'];
				$resource_slug = resourceValue['slug'];

				$html = getResourceListing($resource_name,$resource_summary,$resource_abstract,$resource_url,$resource_owner,$resource_number,$resource_tags,$resource_slug,$resourcecount);
				$('#jsonResourceEditorTable').append($html);

				$resourcecount++;

				});

			}
		});

	}

function getAddResource()
	{

	html = '<tr id="add-resource-post" style="display: none;"><td align="center" style="font-size: 12px; background-color:#CCC; padding:5px;">';

	html = html + '<span style="font-size: 18px;"><strong>Add patent</span></strong>';
	html = html + '<table border="0" width="90%" cellpadding="3" cellspacing="2" id="resource-post-table">';

	html = html + '<tr>';
	html = html + '<td align="right" width="5%"><strong>name:</strong></td>';
	html = html + '<td align="left"><input type="text" id="add-resource-name" value="" style="width:95%;" /></td>';
	html = html + '</tr>';

	html = html + '<tr>';
	html = html + '<td align="right" width="5%"><strong>summary:</strong></td>';
	html = html + '<td align="left"><input type="text" id="add-resource-summary" value="" style="width:95%;" /></td>';
	html = html + '</tr>';

	html = html + '<tr>';
	html = html + '<td align="right" width="5%"><strong>abstract:</strong></td>';
	html = html + '<td align="left"><input type="text" id="add-resource-abstract" value="" style="width:95%;" /></td>';
	html = html + '</tr>';

	html = html + '<tr>';
	html = html + '<td align="right" width="5%"><strong>url:</strong></td>';
	html = html + '<td align="left"><input type="text" id="add-resource-url" value="" style="width:95%;" /></td>';
	html = html + '</tr>';

	html = html + '<tr>';
	html = html + '<td align="right" width="5%"><strong>owner:</strong></td>';
	html = html + '<td align="left"><input type="text" id="add-resource-owner" value="" style="width:95%;" /></td>';
	html = html + '</tr>';

	html = html + '<tr>';
	html = html + '<td align="right" width="5%"><strong>number:</strong></td>';
	html = html + '<td align="left"><input type="text" id="add-resource-number" value="" style="width:95%;" /></td>';
	html = html + '</tr>';

	html = html + '<tr>';
	html = html + '<td align="right" width="5%"><strong>tags:</strong></td>';
	html = html + '<td align="left"><input type="text" id="add-resource-tags" value="" style="width:95%;" /></td>';
	html = html + '</tr>';

	html = html + '<tr>';
	html = html + '<td align="center" style="background-color:#FFF;" colspan="2"><input type="button" name="addAPIButton" value="Add" onclick="addResource();" /></td>';
	html = html + '</tr>';

	 html = html + '</table>';

	html = html + '<br /></td></tr>';

	return html;
	}

function ConfirmDelete($resourcecount)
	{
	if(confirm("Are you Sure?"))
		{
		deleteResource($resourcecount);
		}
	else{

		}
	}

function deleteResource($resourcecount)
	{

	$resource_slug = document.getElementById("edit-resource-slug-" + $resourcecount).value;


	$hosturl = 'http://patent.api.kinlane.com';
	$baseurl = '/';
	$resource = 'patent/';

	$query = '?appid=' + $APIConfig['3Scale']['appid'];
	$query = $query + '&appkey=' + $APIConfig['3Scale']['appkey'];

	$apiurl = $hosturl + $baseurl + $resource + $resource_slug + '/' + $query;

	$.ajax({
		url: $apiurl,
		type: 'DELETE',
		success: function(data) {

			$('#resource-post-' + $resourcecount).remove();
			$('#add-resource-post-' + $resourcecount).remove();
			$('#edit-resource-post-' + $resourcecount).remove();

			}
		});

	}

	function editResource($resourcecount)
		{

		$resource_name = document.getElementById("edit-resource-name-" + $resourcecount).value;
		$resource_summary = document.getElementById("edit-resource-summary-" + $resourcecount).value;
		$resource_abstract = document.getElementById("edit-resource-abstract-" + $resourcecount).value;
		$resource_url = document.getElementById("edit-resource-url-" + $resourcecount).value;
		$resource_owner = document.getElementById("edit-resource-owner-" + $resourcecount).value;
		$resource_number = document.getElementById("edit-resource-number-" + $resourcecount).value;
		$resource_tags = document.getElementById("edit-resource-tags-" + $resourcecount).value;
		$resource_slug = document.getElementById("edit-resource-slug-" + $resourcecount).value;

		$postData = {};

		$postData['appid'] = $APIConfig['3Scale']['appid'];
		$postData['appkey'] = $APIConfig['3Scale']['appkey'];

		$postData['name'] = $resource_name;
		$postData['summary'] = $resource_summary;
		$postData['abstract'] = $resource_abstract;
		$postData['url'] = $resource_url;
		$postData['owner'] = $resource_owner;
		$postData['number'] = $resource_number;
		$postData['tags'] = $resource_tags;
		$postData['slug'] = $resource_slug;

		$hosturl = 'http://patent.api.kinlane.com';
		$baseurl = '/';
		$resource = 'patent/';

		$apiurl = $hosturl + $baseurl + $resource + $resource_slug;

		$.ajax({
			url: $apiurl,
			type: 'PUT',
			data: $postData,
			success: function(data) {

				$WorkingResponse = data;

				$resourcecount = 0;

				$.each(data, function(resourceKey, resourceValue) {

					$resource_name = resourceValue['name'];
					$resource_summary = resourceValue['summary'];
					$resource_abstract = resourceValue['abstract'];
					$resource_url = resourceValue['url'];
					$resource_owner = resourceValue['owner'];
					$resource_number = resourceValue['number'];
					$resource_tags = resourceValue['tags'];
					$resource_slug = resourceValue['slug'];

					});

				}
			});

		}

function getEditResource($resource_name,$resource_summary,$resource_abstract,$resource_url,$resource_owner,$resource_number,$resource_tags,$resource_slug,$resourcecount)
	{

	html = '<tr id="edit-resource-post-' + $resourcecount + '" style="display: none;"><td align="center" style="font-size: 12px; background-color:#CCC; padding:5px;">';

	html = html + '<span style="font-size: 18px;"><strong>Edit Resource</span></strong>';
	html = html + '<table border="0" width="90%" cellpadding="3" cellspacing="2" id="resource-post-table">';

	html = html + '<tr>';
	html = html + '<td align="right" width="5%"><strong>name:</strong></td>';
	html = html + '<td align="left"><input type="text" id="edit-resource-name-' + $resourcecount + '" value="' + $resource_name + '" style="width:95%;" /></td>';
	html = html + '</tr>';

	html = html + '<tr>';
	html = html + '<td align="right" width="5%"><strong>summary:</strong></td>';
	html = html + '<td align="left"><input type="text" id="edit-resource-summary-' + $resourcecount + '" value="' + $resource_summary + '" style="width:95%;" /></td>';
	html = html + '</tr>';

	html = html + '<tr>';
	html = html + '<td align="right" width="5%"><strong>abstract:</strong></td>';
	html = html + '<td align="left"><input type="text" id="edit-resource-abstract-' + $resourcecount + '" value="' + $resource_abstract + '" style="width:95%;" /></td>';
	html = html + '</tr>';

	html = html + '<tr>';
	html = html + '<td align="right" width="5%"><strong>url:</strong></td>';
	html = html + '<td align="left"><input type="text" id="edit-resource-url-' + $resourcecount + '" value="' + $resource_url + '" style="width:95%;" /></td>';
	html = html + '</tr>';

	html = html + '<tr>';
	html = html + '<td align="right" width="5%"><strong>owner:</strong></td>';
	html = html + '<td align="left"><input type="text" id="edit-resource-owner-' + $resourcecount + '" value="' + $resource_owner + '" style="width:95%;" /></td>';
	html = html + '</tr>';

	html = html + '<tr>';
	html = html + '<td align="right" width="5%"><strong>number:</strong></td>';
	html = html + '<td align="left"><input type="text" id="edit-resource-number-' + $resourcecount + '" value="' + $resource_number + '" style="width:95%;" /></td>';
	html = html + '</tr>';

	html = html + '<tr>';
	html = html + '<td align="right" width="5%"><strong>tags:</strong></td>';
	html = html + '<td align="left"><input type="text" id="edit-resource-tags-' + $resourcecount + '" value="' + $resource_tags + '" style="width:95%;" /></td>';
	html = html + '</tr>';

	html = html + '<tr>';
	html = html + '<td align="right" width="5%"><strong>slug:</strong></td>';
	html = html + '<td align="left"><input type="text" id="edit-resource-slug-' + $resourcecount + '" value="' + $resource_slug + '" style="width:95%;" /></td>';
	html = html + '</tr>';

	html = html + '<tr>';
	html = html + '<td align="center" colspan="2"><input type="button" name="editAPIButton" value="Save" onclick="editResource(' + $resourcecount + ')" /></td>';
	html = html + '</tr>';

	html = html + '</table>';

	html = html + '<br /></td></tr>';

	return html;

	}

function getResourceListing($name,$summary,$abstract,$url,$owner,$number,$tags,$slug,$resourcecount)
	{

	html = '<tr id="resource-post-' + $resourcecount + '">';
	html = html + '<td style="padding-top: 5px; padding-bottom: 5px;">';

	html = html + '<a href="#" onclick="ConfirmDelete(' + $resourcecount + '); return false;" id="delete-resource-post-' + $resourcecount + '-icon" title="Delete Resource Post"><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-delete-circle.png" width="35" align="right"  /></a>';
	html = html + '<a href="#" onclick="ResourceShowme(this); return false;" id="edit-resource-post-' + $resourcecount + '-icon" title="Edit Resource Post"><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-edit-circle.png" width="35" align="right"  /></a>';

	html = html + '<span style="font-size:18px;">';
	html = html + '<strong>' + $resource_name + '</strong>';
	html = html + '</span>';
	
	html = html + '<br /><span style="font-size:16px;">';
	html = html + '' + $resource_number + '';
	html = html + '</span>';	

	html = html + '<br /><span style="font-size:16px;">';
	html = html + '' + $resource_abstract + '';
	html = html + '</span>';

	html = html + '<br /><span style="font-size:16px;">';
	html = html + '' + $resource_url + '';
	html = html + '</span>';

	html = html + '</td>';
	html = html + '</tr>';

	return html; 

	}

function loadResourceEditor()
	{

	$response = "";

	$html = getAddResource();
	$('#jsonResourceEditorTable').append($html); 
	$textEditors = "add-resource-post";


	$hosturl = 'http://patent.api.kinlane.com';
	$baseurl = '/';
	$resource = 'patent/';

	$query = '?appid=' + $APIConfig['3Scale']['appid'];
	$query = $query + '&appkey=' + $APIConfig['3Scale']['appkey'];

	$apiurl = $hosturl + $baseurl + $resource + $query;
console.log($apiurl);
	$.ajax({
		url: $apiurl,
		type: 'GET',
		success: function(data) {

			$WorkingResponse = data;

			$.each(data, function(resourceKey, resourceValue) {

				$resource_name = resourceValue['name'];
				$resource_summary = resourceValue['summary'];
				$resource_abstract = resourceValue['abstract'];
				$resource_url = resourceValue['url'];
				$resource_owner = resourceValue['owner'];
				$resource_number = resourceValue['number'];
				$resource_tags = resourceValue['tags'];
				$resource_slug = resourceValue['slug'];

				$html = getResourceListing($resource_name,$resource_summary,$resource_abstract,$resource_url,$resource_owner,$resource_number,$resource_tags,$resource_slug,$resourcecount);
				$('#jsonResourceEditorTable').append($html); 

				$html = getEditResource($resource_name,$resource_summary,$resource_abstract,$resource_url,$resource_owner,$resource_number,$resource_tags,$resource_slug,$resourcecount);
				$('#jsonResourceEditorTable').append($html);

				$textEditors = $textEditors + ",edit-resource-post-" + $resourcecount;

				$resourcecount++;

				});

			tinyMCE.init({
				mode : "textareas",
				theme : "advanced",
				plugins : "spellchecker,pagebreak,layer,table,advhr,advimage,autosave,advlist,advlink,inlinepopups,insertdatetime,preview,media,contextmenu,paste,nonbreaking",
				theme_advanced_buttons1 : "save,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,bullist,numlist,|,outdent,indent,blockquote,|,link,unlink,code,|,hr,|,spellchecker",
				theme_advanced_buttons2 : "",
				theme_advanced_buttons3 : "",
				theme_advanced_toolbar_location : "top",
				theme_advanced_toolbar_align : "left",
				theme_advanced_statusbar_location : "bottom",
				extended_valid_elements : "iframe[src|width|height|name|align]",
				width : "550px",
				height : "300px"
			});

			}
		});

	}

