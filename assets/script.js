$(document).ready(function () {

    var categoryCall = function (category) {
        //make call to gather category endpoint data
        var categoryUrl = 'https://www.boredapi.com/api/activity?type=' + category
        fetch(categoryUrl)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        var catActivity = data.activity;
                        var catAccess = ((data.accessibility) * 100) + '%';
                        var catCategory = data.type;
                        var catParticipants = data.participants;
                        var catPrice = data.price;
                        var catKey = data.key;
                        //DisplayResults (catActivity, catAccess, catCategory, catParticipants, catPrice)
                        //pass activity to search yt videos
                        searchVideos(catActivity);
                    })
                } else {
                    alert('Error: ' + response.statusText);
                }
            })
            .catch(function (error) {
                alert('Error connecting to API server');
            });

    }


    //Random search button
    function randomgenerator() {
        var randomurl = 'http://www.boredapi.com/api/activity/'
        fetch(randomurl)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        var Activity = data.activity;
                        var Access = ((data.accessibility) * 100) + '%';
                        var Category = data.type;
                        var Participants = data.participants;
                        var Price = data.price;
                        var Key = data.key;
                        //DisplayResults (catActivity, catAccess, catCategory, catParticipants, catPrice)
                        //pass activity to search yt videos
                        searchVideos(Activity);
                    })
                } else {
                    alert('Error: ' + response.statusText);
                }
            })
            .catch(function (error) {
                alert('Error connecting to API server');
            });
    }

    //yt call function
    var searchVideos = function (keywords) {
        //youtube call to get search results of activity searched & video ids
        var apiKey = 'AIzaSyDPqjwbmgS43b7TLONJZcJ8sGbF1tOhepA';
        var ytUrl = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&q=' + keywords + `&type=video&videoEmbeddable=true&key=${apiKey}`
        fetch(ytUrl)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        //build array of video ids from data to pass on to displayVideo function
                        var videoIds = [];
                        data.items.forEach(function (element, index) {
                            var videoObj = element;
                            var videoId = videoObj.id.videoId;
                            videoIds.push(videoId);
                        })
                        //pass videoIds arr to display video function
                        displayVideos(videoIds);

                    })
                } else {
                    alert('Error ' + response.statusText)
                }
            })
            .catch(function (error) {
                alert('Error connecting to API youtube server')
            });
    }

    //displayVideo function
    var displayVideos = function (array) {
        //each method to loop through each element with class=player and change src
        $('.player').each(function(index){
            $(this).attr('src', `https://www.youtube.com/embed/${array[index]}?enablejsapi=1`)
        });

    }


    //Materialize 
    $('select').formSelect();
    //Button Listener for random search 
    $('#random').on('click', randomgenerator);
    //capture value of selected category from dropdown on click & initiate call
    $('#categorySearch').on('click', function () {
        // console.log($('.browser-default').val());
        var categoryClicked = $('.browser-default').val();
        //pass value to make api call
        categoryCall(categoryClicked);
    })



});



