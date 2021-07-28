jQuery(function( $ ) {
    // Your code using failsafe $ alias here...

    //Type Category of the activity
    //put into drop down menu
    // ["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"]
    var categoryUrl = 'https://www.boredapi.com/api/activity?type=recreational'
    fetch(categoryUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log('Search by Type of Activity-----');
                    console.log(data)
                    console.log(data.activity)
                    //pass activity to search yt videos
                    // searchVideos(data.activity);
                })
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Error connecting to API server');
        });

        console.log($('option'));
  });
