$('form').submit(function(e) {
	// Prevent form from submitting
	e.preventDefault();
	// Get search field element
	var $searchField = $('#search');
	// Get submit button
	var $submitButton = $('#submit');

	// Disable search field
	$searchField.prop('disabled', true);
	// Disable submit button and change it's value to let user know it's searching
	$submitButton.attr('disabled', true).val('searching...');

	/**************
	Ajax starts
	**************/

	// Url to flikrs api
	var flikrAPI = 'https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?';
	// Get the text inside search field
	var searchTerm = $searchField.val();
	var flickrOptions = {
		// Send back images tagged with search term
		tags: searchTerm,
		// Send back json formatted data
		format: "json"
	};

	function displayPhotos(data) {
		// Create un-ordered list
		var imageHTML = '<div class="row">';
		// Go through each item returned
		$.each(data.items, function(i, image) {
			// Create a list item
			imageHTML += '<div class="col-md-4 col-sm-6">';
			// Create an anchor element and set it's link to the link poperties value
			imageHTML += '<a class="image" href="' + image.link + '" target="_blank"><div class="image-container">';
			/* 
			- Create an image element and set it's source to the media property/object m properties value 
			- Close the anchor and list item elements
			*/
			imageHTML += '<img class="img-responsive flickr-image" src="' + image.media.m + '"></div></a></div>';
		});
		// Close the un-ordered list
		imageHTML += '</div>';

		// Add html to images container
		$('#photos').html(imageHTML);

		// Clear and re-enable search field
		$searchField.prop('disabled', false).val('');
		// Re-enable submit button and change value back to search
		$submitButton.attr('disabled', false).val('Search');
	};

	
	$.getJSON(flikrAPI, flickrOptions, displayPhotos);
});