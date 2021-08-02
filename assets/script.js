$(document).ready(function () {
    //hide results container on load
    $('.resultsContainer').addClass('hidden')


    var categoryCall = function (category) {
        //make call to gather category endpoint data

        var categoryUrl = 'https://www.boredapi.com/api/activity?type=' + category;
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
                    $('#modal2 .alert-text').text('Error: ' + response.status);
                    $('#modal2').modal('open','onCloseEnd');


                }
            })
            .catch(function (error) {
                $('#modal2 .alert-text').text(error);
                $('#modal2').modal('open', 'onCloseEnd');
                

            })



    }



    //Random search button
    function randomgenerator() {
        //fade out search container on click
        $('.searchContainer').hide('fade');
        $('.resultsContainer').show('slide');
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
                    $('#modal2 .alert-text').text('Error: ' + response.status);
                    $('#modal2').modal('open','onCloseEnd');
                }
            })
            .catch(function (error) {
                $('#modal2 .alert-text').text(error);
                $('#modal2').modal('open', 'onCloseEnd');
            });
    }


    //yt call function
    var searchVideos = function (keywords) {
        //youtube call to get search results of activity searched & video ids
        var apiKey = 'AIzaSyDDD98Fh1ECFSuqm-WQwTK1dU7DGg7lgj4';
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
                    $('#modal2 .alert-text').text('Error: ' + response.status);
                    $('#modal2').modal('open','onCloseEnd');
                }
            })
            .catch(function (error) {
                $('#modal2 .alert-text').text(error);
                $('#modal2').modal('open', 'onCloseEnd');
            });
    }

    //displayVideo function
    var displayVideos = function (array) {
        //each method to loop through each element with class=player and change src
        $('.player').each(function (index) {
            $(this).attr('src', `https://www.youtube.com/embed/${array[index]}?enablejsapi=1`)
        });

    }
    //Save function
    $('#save').on('click', function () {

        var newfav = []
        $("#actcontainer").find("li").each(function () {
            var $li = $(this);
            newfav.push($li.text())
        })
        console.log(newfav)
        favorites = JSON.parse(localStorage.getItem('favs')) || []
        favorites.push(newfav)
        console.log(favorites)

        localStorage.setItem("favs", JSON.stringify(favorites));


    });
    //Render saved activities
    function displayfavs(favorites) {
        favorites = JSON.parse(localStorage.getItem('favs')) || []
        cardcont = $('#container')

        for (let i = 0; i < favorites.length; i++) {

            var card = '<div class="col s12 m12 l4">' +
                '<div class="card teal darken-1">' +
                '<div class="card-content white-text">' +
                '<span class="card-title">Idea For You</span>' +
                '<ul id="list">' +
                '<li>' + favorites[i][0] + '</li>' +
                '<li>' + favorites[i][1] + '</li>' +
                '<li>' + favorites[i][2] + '</li>' +
                '<li>' + favorites[i][3] + '</li>' +
                '<li>' + favorites[i][4] + '</li>' +

                '</ul>' +
                '</div>' +
                '</div>' +
                '</div>';
            cardcont.append(card)
        }

        //Reset Favorites
        $('#reset').on('click', function () {
            localStorage.removeItem("favs");
            location.reload()

        })

    }


    //Materialize 
    $('select').formSelect();
    $('.modal').modal({
        onCloseEnd: function () { location.reload(); }
    });
    //Button Listener for random search 
    $('#random').on('click', randomgenerator);
    //capture value of selected category from dropdown on click & initiate call
    $('#categorySearch').on('click', function clickSearch(x) {
        // console.log($('.browser-default').val());
        var categoryClicked = $('.browser-default').val();
        console.log(categoryClicked);

        //validate category
        if (categoryClicked !== null) {
            //pass value to make api call
            categoryCall(categoryClicked);
            //fade out search container on click
            $('.searchContainer').hide('fade');
            $('.resultsContainer').show('slide');
        } else {
            // alert('pick a category')

            $('#modal1').modal('open');

        }

    });
    //home button click within search results
    $('#home').on('click', function () {
        location.reload();
    })
    displayfavs();









});



