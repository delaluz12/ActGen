jQuery(function ($) {
    // Your code using failsafe $ alias here...


    //capture value of selected category from dropdown
    $('#categorySearch').on('click', function () {
        // console.log($('.browser-default').val());
        var categoryClicked = $('.browser-default').val();
        //pass value to make api call
        categoryCall(categoryClicked);
    })

    var categoryCall = function (category) {

        //make call to gather category endpoint data
        
        var categoryUrl = 'https://www.boredapi.com/api/activity?type=' + category
        fetch(categoryUrl)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log('Search by Type of Activity-----');
                        console.log(data)
                        // console.log(data.activity);
                        var catActivity = data.activity;
                        console.log(catActivity);
                        // console.log(((data.accessibility)*100) + '%')
                        var catAccess = ((data.accessibility)*100) + '%';
                        console.log(catAccess);
                        // console.log(data.type)
                        var catCategory= data.type;
                        console.log(catCategory);
                        // console.log(data.participants)
                        var catParticipants = data.participants;
                        console.log(catParticipants);
                        // console.log(data.price)
                        var catPrice = data.price;
                        console.log(catPrice);
                        //DisplayResults (catActivity, catAccess, catCategory, catParticipants, catPrice)
                        //pass activity to search yt videos ====> searchVideos(catActivity);
                    })
                } else {
                    alert('Error: ' + response.statusText);
                }
            })
            .catch(function (error) {
                alert('Error connecting to API server');
            });

    }


    //Materialize 
    $('select').formSelect();

    //Random search button
    function randomgenerator(){
        var randomurl = 'http://www.boredapi.com/api/activity/'
        fetch(randomurl)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log('Random Search');
                        console.log(data)
                        // console.log(data.activity);
                        var catActivity = data.activity;
                        console.log(catActivity);
                        // console.log(((data.accessibility)*100) + '%')
                        var catAccess = ((data.accessibility)*100) + '%';
                        console.log(catAccess);
                        // console.log(data.type)
                        var catCategory= data.type;
                        console.log(catCategory);
                        // console.log(data.participants)
                        var catParticipants = data.participants;
                        console.log(catParticipants);
                        // console.log(data.price)
                        var catPrice = data.price;
                        console.log(catPrice);
                        //DisplayResults (catActivity, catAccess, catCategory, catParticipants, catPrice)
                        //pass activity to search yt videos ====> searchVideos(catActivity);
                    })
                } else {
                    alert('Error: ' + response.statusText);
                }
            })
            .catch(function (error) {
                alert('Error connecting to API server');
        });}

 //Button Listener for random search 

$('#random').on('click', randomgenerator)

});



