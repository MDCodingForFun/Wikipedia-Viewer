$(document).ready(function(){

  $('#searchBox').focus();
  //Autocomplete function
$('#searchBox').keyup(autoCompleteReady);

function autoCompleteReady(){
    $('#searchBox').autocomplete({
      cacheLength: 1,
      delay:100,
      source: function(request, response){
        $.ajax({
          url:"https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=",
          dataType: "jsonp",
          data:{
            'action': "opensearch",
            'format':"json",
            'search':request.term
          },
          success: function(data){
            response(data[1]);
          }
        })
      },
      select: function(event,ui){
        $('#searchBox').val(ui.item.value);
        $('#searchBtn').click();
      }
    })
}
  //Get articles function
  $('#searchBtn').on('click', getWikiData);
  $('#searchBox').keypress(function(event){
    if(event.keyCode === 13){
      event.preventDefault();
      $("#searchBox").autocomplete("close");
      getWikiData();
    }
  })

function getWikiData(e){
  event.preventDefault();

  $('#results').empty();
  $('#term_searched').empty();

  var keyWord = $.trim($('#searchBox').val());
  var searchUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=";
  
  // console.log(keyWord); 

  if (keyWord.length > 0){
    $.ajax({
      url:"https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search="+keyWord,
      dataType: "jsonp",
      success: function(data){
        // console.log(data);

        var title = data[1];
        var content = data[2];
        var articleLnk = data[3];
        var searchTitle ="";
        var searhContent ="";
        var articleLink="";

        if(title.length === 0){
          $('#term_searched').html(
            "<div class='notFound'><p>No results found for <i>\"" + keyWord + "\"</i>.</p></div>"
            );
          $('#term_searched').show();
        }
        for (i=0; i<title.length; i++){

          searchTitle ="<h2>" +title[i]+"</h2>";
          searhContent ="<p>" +content[i]+ "</p>";
          articleLink ="<p class='link'><a target='_blank' href='"+articleLnk[i]+"'>READ MORE</a></p>"

          if(content[i].length ===0){
            searhContent ="<p> No description available.</p>";
          }
          console.log(searchTitle);
          console.log(searhContent);
          console.log(articleLink);
          $('#results').append(
            "<div class='resultFound'>" +searchTitle+"<hr>"+searhContent+articleLink+"</div>"
          );

        }

      }
    })
  }
}
  //Generate random article
  $('#randomBtn').on('click', function(){
    window.open("https://en.wikipedia.org/wiki/Special:Random");
  });

});

