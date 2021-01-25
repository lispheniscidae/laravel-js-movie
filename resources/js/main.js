import movie from './movie';
import actor from './actor';
import producer from './producer';
import genre from './genre';
import role from './role';
import authModal from './AuthenticationModal';

$(document).ready(function(){

// .link is from navigation bar data-id
  $('.link').on('click', (e) => {
      const link = e.currentTarget.dataset.id;
      console.log(link)
      $.ajax({
        type: "GET",
        url: "/api/" + link,
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        },
        dataType: 'json',

        success: function (response) {
          switch (link) {
            case "Movie":
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
        error: function(error){
          console.log(error)
          console.log('AJAX load did not work');
          alert("error");
        }
    });

    $( "table tbody" ).sortable();
    $( "#resizable" ).resizable();
    
  });

  // APPEND LOGIN AND REGISTRATION MODAL
    $('#content').append(authModal);    

    
  // REGISTRATION
  $('#registerForm').validate({
      rules: {
        name: {required:true},
        email: {  required:true, email:true },
        password: { required:true },
      },
      messages: {
          name: {required:'required',},
          email: { required:'required'},
          password: { required:'required'},
      },
          errorPlacement: function(error, element){
              error.insertAfter(element)
      },
      submitHandler: function(form,e) {
      var data = $('#registerForm').serialize();
      $.ajax({
        type: "post",
        url: "/api/register",
        data: data,
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
        dataType: "json",
        success: function(data) {
            console.log(data);
            $('#registerModal').each(function () {
              $(this).modal('hide');
            });
        },
        error: function(error) {
            console.log('error');
        }
      });
    }
});

  //LOGIN
  $('#loginForm').validate({
    rules: {
      lemail: {  required:true, email:true },
      lpassword: { required:true },
    },
    messages: {
        lemail: { required:'required', email:'Enter Valid Email'},
        lpassword: { required:'required'},
    },
        errorPlacement: function(error, element){
            error.insertAfter(element)
    },
    submitHandler: function(form,e) {
      var data = $('#loginForm').serialize();
      $.ajax({
        type: "post",
        url: "/api/login",
        data: data,
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
        dataType: "json",
        success: function(data) {
            console.log(data);
            window.localStorage.setItem('access_token', data.access_token);

        },
        error: function(error) {
            console.log(error);
            alert('Failed to login. Please Try again');
        }
      });
    }
  });


});
