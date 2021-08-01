$(document).ready(function () {
  var categoryCall = function (category) {
    //make call to gather category endpoint data
    var categoryUrl = "https://www.boredapi.com/api/activity?type=" + category;
    fetch(categoryUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            var catActivity = data.activity;
            var catAccess = data.accessibility;
            var catCategory = data.type;
            var catParticipants = data.participants;
            var catPrice = data.price;
            var catKey = data.key;
            DisplayResults(
              catActivity,
              catAccess,
              catCategory,
              catParticipants,
              catPrice
            );
            //pass activity to search yt videos
            searchVideos(catActivity);
          });
        } else {
          alert("Error: " + response.statusText);
        }
      })
      .catch(function (error) {
        alert("Error connecting to API server");
      });
  };
  //passing string to cost,Accessibility.
  function DisplayResults(param1, param2, param3, param4, param5) {
    var access = "";
    var costAll = "";

    if (param5 <= 0.3) {
      //easy
      costAll = "Low";
    } else if (param5 > 0.3 && param5 < 0.8) {
      //meduim
      costAll = "Meduim";
    } else if (param5 > 0.7) {
      //high
      costAll = "High";

    } else {
      costAll = param5;
    }

    if (param2 <= 0.3) {
      //easy
      access = "Easy";
    } else if (param2 > 0.3 && param2 < 0.8) {
      //meduim
      access = "Meduim";
    } else if (param2 > 0.7) {
      //hard
      access = "Hard";

    } else {
      access = param2;
    }
    console.log("accessbility -score ", access);
    $("#allactivity").text(param1);
    $("#allaccess").text(access);
    $("#alltype").text(param3);
    $("#allparticipants").text(param4);
    $("#allprice").text(costAll);
  }

  //Random search button
  function randomgenerator() {
    var randomurl = "http://www.boredapi.com/api/activity/";
    fetch(randomurl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            var Activity = data.activity;
            var Access = data.accessibility;
            var Category = data.type;
            var Participants = data.participants;
            var Price = data.price;
            var Key = data.key;
            DisplayResults(Activity, Access, Category, Participants, Price);
            //pass activity to search yt videos
            searchVideos(Activity);
          });
        } else {
          alert("Error: " + response.statusText);
        }
      })
      .catch(function (error) {
        alert("Error connecting to API server");
      });
  }


  //yt call function
  var searchVideos = function (keywords) {
    //youtube call to get search results of activity searched & video ids
    var apiKey = "AIzaSyCVRYtaSMFw5Z8fuAn7_5Pg50iUP4UtRK0";
    var ytUrl =
      "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&q=" +
      keywords +
      `&type=video&videoEmbeddable=true&key=${apiKey}`;
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
            });
            //pass videoIds arr to display video function
            displayVideos(videoIds);
          });
        } else {
          alert("Error " + response.statusText);
        }
      })
      .catch(function (error) {
        alert("Error connecting to API youtube server");
      });
  };

  //displayVideo function
  var displayVideos = function (array) {
    //each method to loop through each element with class=player and change src
    $(".player").each(function (index) {
      $(this).attr(
        "src",
        `https://www.youtube.com/embed/${array[index]}?enablejsapi=1`
      );
    });
  };

  //Materialize
  $("select").formSelect();
  //Button Listener for random search
  $("#random").on("click", randomgenerator);
  //capture value of selected category from dropdown on click & initiate call
  $("#categorySearch").on("click", function () {
    // console.log($('.browser-default').val());
    var categoryClicked = $(".browser-default").val();
    //pass value to make api call
    categoryCall(categoryClicked);
  });

  //Save function
  $("#save").on("click", function () {
    var newfav = [];
    $("#actcontainer")
      .find("span")
      .each(function () {
        var $li = $(this);
        newfav.push($li.text());
      });
    favorites = JSON.parse(localStorage.getItem("favs")) || [];
    favorites.push(newfav);


    localStorage.setItem("favs", JSON.stringify(favorites));
  });

  displayfavs()
  //Render saved activities
  function displayfavs(favorites) {
    favorites = JSON.parse(localStorage.getItem('favs')) || []
    cardcont = $('#container')
    $('#container').empty()

    for (let i = 0; i < favorites.length; i++) {

      var card = '<div class="col s4 clickable"  value="' + favorites[i][0] + '" arraynumber=' + i + '>' +
        '<div class="card blue-grey darken-1">' +
        '<div class="card-content white-text">' +
        '<span class="card-title">Idea For You</span>' +
        '<ul id="list" >' +
        '<li>Activity: ' + favorites[i][0] + '</li>' +
        '<li>Accessibility: ' + favorites[i][1] + '</li>' +
        '<li>Category: ' + favorites[i][2] + '</li>' +
        '<li># of Participants: ' + favorites[i][3] + '</li>' +
        '<li>Cost: ' + favorites[i][4] + '</li>' +

        '</ul>' +
        '</div>' +
        '</div>' +
        '</div>';
      cardcont.append(card)
    }

    //Reset Favorites
    $("#reset").on("click", function () {
      localStorage.removeItem("favs");
      location.reload();
    });
  }

  //Clicking card opens results
  $('.clickable').on('click', function () {
    var clicked = $(this).attr('value');
    var arraynumber = $(this).attr('arraynumber');

    favorites = JSON.parse(localStorage.getItem('favs')) || [];
    favcall = [clicked, arraynumber];
    localStorage.setItem("favcall", JSON.stringify(favcall));
    window.open("../index.html")
  })

  //pull favorite card from storage which will be deleted after functions run
  var favcall = JSON.parse(localStorage.getItem("favcall")) || []

  //if there is a favorite card call send to results page 
  if (favcall.length > 1) {
    favorites = JSON.parse(localStorage.getItem('favs')) || []
    clicked = favcall[0]
    arraynumber = favcall[1]

    DisplayResults(favorites[arraynumber][0], favorites[arraynumber][1], favorites[arraynumber][2], favorites[arraynumber][3], favorites[arraynumber][4]);
    searchVideos(clicked);
    localStorage.removeItem("favcall");
  }


});
