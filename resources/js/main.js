import movie from './movie';
import actor from './actor';
import producer from './producer';
import genre from './genre';
import role from './role';

$(document).ready(function(){
$('.link').on('click', (e) => {
    const link = e.currentTarget.dataset.id;
    console.log(link)
    $.ajax({
      type: "GET",
      url: "/api/" + link,
      dataType: 'json',
      success: function (response) {
        switch (link) {
          case "Movie":
            console.log(response);
            movie.show(response);
            break;

          case "Actor":
            actor.show(response);
            break;

          case "Producer":
            producer.show(response);
            break;

          case "Genre":
            genre.show(response);
            break;

          case "Role":
            role.show(response);
            break;
            
        
          default:
            break;
        }
      
        
      },
      error: function(err){
        console.log(err)
        console.log('AJAX load did not work');
        alert("error");
      }
  });
  $( "#resizable" ).resizable();
});
});
