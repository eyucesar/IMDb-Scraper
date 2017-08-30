
// Grab the articles as a json
$.getJSON("/movies", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // append to page
    $(".collection").append("<a data-id='" + data[i]._id + "'class='collection-item'>" + [i + 1] + ". " + data[i].title + "<div class='right-align' id='viewMovie'><object><a class='movieLink waves-effect waves-light btn' href='" + data[i].link + "' target='_blank'>View Movie" + "</a></object></div><br>" + "<h3>" + data[i].link + "</h3></a>");
  }
});

// Whenever someone clicks an a tag
$(document).on("click", "a", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the a tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/movies/" + thisId
  })
    // With that done, add the note information to the page
    .done(function(data) {
      console.log(data);
      // Movie name
      $("#notes").append("<h4 class='center-align'>" + data.title + "</h4>");
      // Note title
      $("#notes").append("<input id='titleInput' name='title' placeholder='note title'>");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyInput' name='body' placeholder='note content'></textarea>");
      // A button to submit a new note, with the id of the movie saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='saveNote' class='btn waves-effect waves-light'>Save Note</button><button data-id='" + data._id + "' id='deleteNote' class='btn waves-effect waves-light'>Delete Note</button>");

      // If there's a note in the movie
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleInput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyInput").val(data.note.body);
      }
    });
});

// When you click the save note button
$(document).on("click", "#saveNote", function() {
  // Grab the id associated with the movie from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/movies/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleInput").val(),
      // Value taken from note textarea
      body: $("#bodyInput").val()
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
    });
});

// When you click the delete note button - update the note with empty fields
$(document).on("click", "#deleteNote", function() {
  // Grab the id associated with the movie from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/movies/" + thisId,
    data: {
      // empty the title
      title: "",
      // empty the body
      body: ""
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleInput").val("");
  $("#bodyInput").val("");
  
});

//scrolling div
$().ready(function() {
  var $scrollingDiv = $(".scrollingDiv");

  $(window).scroll(function(){      
    $scrollingDiv
      .stop()
      .animate({"marginTop": ($(window).scrollTop() + 0) + "px"}, "slow" );      
  });
});

//materialize toasts (currently not working, will fix)
$("#saveNote").on("click", function() {
  Materialize.toast('Saved', 4000);
})

$("#deleteNote").on("click", function() {
  Materialize.toast('Saved', 4000);
})

