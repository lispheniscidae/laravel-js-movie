import movieModal from './movieModals';
const movie = {        
    //SHOW-MOVIE-TABLE
    show(response){

        //INITIATE DATA TO APPEND TO INDEX BLADE
        let  title = `Movies`;
        let tableContent = `<thead>
                <tr>
                <th>ID</th>
                <th>title</th>
                <th>description</th>
                <th>release</th>
                <th>genre_id</th>
                <th>producer_id</th>
                <th>Edit</th>
                <th>Delete</th>
                </tr>
                </thead>
                <tbody id="movieBody">
                        
                </tbody>
        `;
    
        let addButton = `<button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#addMovie"><i class="fas fa-plus"></i></button>`;

        //APPEND TABLE FORMAT TO INDEX
        $('#tableContent').html(tableContent);
        $('#addButton').html(addButton);
        $('#title').html(title);

        //APPEND TABLE DATA TO INDEX
        response.forEach(element => {
            $('#movieBody').append(`
            <tr>
            <td>${element.id}</td>
            <td>${element.title}</td>
            <td>${element.description}</td>
            <td>${element.release}</td>
            <td>${element.genre_id}</td>
            <td>${element.producer_id}</td>
            <td align='center'><i class="fas fa-edit" data-bs-toggle="modal" data-bs-target="#editMovie" data-id="${element.id}"></i></td>
            <td align='center'><i class="fas fa-trash-alt movieDelete" data-id="${element.id}"></i></td>
    
            </tr>
            `)
        });

    //APPEND MODAL FORM
    $('#content').append(movieModal);


    // GET GENRE AND PRODUCER ON SHOW OF MOVIE FORM MODAL
    $('#addMovie').on('shown.bs.modal', (e) => {

        // ITERATE-GENRE-MODAL ON DROPDOWN
            $.ajax({
                type: "GET",
                url: "/api/Genre",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                },
                dataType: "json",
                success: function(data) {
                    console.log(data);
                    //clear input
                    $('#movieCreate :input').each(function () {
                        let input = $(this)
                        input.val('')
                    });
                        var select = $('#genre_id');
                        $.each(data,function(data, result){
                            select.append('<option name=\'id\' value=\''+ result.id +' \'>'+ result.name +'</option>');
                        });

                },
                error: function(error) {
                    console.log('error');
                }
            });  
        
        //ITERATE-PRODUCER-MODAL ON DROPDOWN
            $.ajax({
                type: "GET",
                url: "/api/Producer",
                headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                },
                dataType: "json",
            
                success: function(data) {
                    console.log(data);
                    
                        var select = $('#producer_id');
                        $.each(data,function(data, result){
                            select.append('<option name=\'id\' value=\''+ result.id +' \'>'+ result.name +'</option>');

                        });

                },
                error: function(error) {
                    console.log('error');
                }
            });
    });


     //CREATE-MOVIE WITH JQUERY VALIDATION
    var validObj = $('#movieCreateForm').validate({
        rules: {
        title: { required:true, minlength:5 },
        description: { required:true, minlength:10 },
        release: { required:true, date: true},
        genre_id: { required:true},
        producer_id: { required:true},
    },
    messages: {
        title: { required:'required'},
        description: { required:'required'},
        release: { required:'required'},
        genre_id: { required:'required'},
        producer: { required:'required'},
        
    },
    errorPlacement: function(error, element){
        error.insertAfter(element)
    },
    submitHandler: function(form,e) {
        
        var data = $("#movieCreate").serialize();
        console.log(data);
        
        }
    });
    validObj.form();
    $('#saveMovie').on('click', function (e) {
        if(!validObj.form()){
            e.preventDefault();
        }
        var data = $('#movieCreateForm').serialize();
        $.ajax({
            type: "post",
            url: "/api/Movie",
            data: data,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            },
            dataType: "json",
            success: function(data) {
                console.log(data);
                    $("#addMovie").modal("hide");
                    
                $('#movieBody').append(`
    
                <tr>
                <td>${data.id}</td>
                <td>${data.title}</td>
                <td>${data.description}</td>
                <td>${data.release}</td>
                <td>${data.genre_id}</td>
                <td>${data.producer_id}</td>
                <td align='center'><i class="fas fa-edit" data-bs-toggle="modal" data-id="${data.id}" data-bs-target="#editMovie"></i></td>
                <td align='center'><i class="fas fa-trash-alt movieDelete" data-id="${data.id}"></i></td>
        
                </tr>
                `)

            },
            error: function(error) {
                console.log(error);
            }
        });
    })

    //APPEND ROW DATA ON MODAL FORM
    $('#editMovie').on('shown.bs.modal', function(e){
        var id = $(e.relatedTarget).attr('data-id');
        console.log(id);

         // ITERATE-GENRE-MODAL
        $.ajax({
            type: "GET",
            url: "/api/Genre",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            },
            dataType: "json",
        
            success: function(data) {
                console.log(data);
                
                var select = $('.movieGenre_id');
                $.each(data,function(data, result){
                    select.append('<option name=\'id\' value=\''+ result.id +' \'>'+ result.name +'</option>');

                });

            },
            error: function(error) {
                console.log('error');
            }
        });  
    
    //ITERATE-PRODUCER-MODAL
        $.ajax({
            type: "GET",
            url: "/api/Producer",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            },
            dataType: "json",
            success: function(data) {
                console.log(data);
                
                var select = $('.movieProducer_id');
                $.each(data,function(data, result){
                    select.append('<option name=\'id\' value=\''+ result.id +' \'>'+ result.name +'</option>');

                });
            },
            error: function(error) {
                console.log('error');
            }
        });  

        //ADD ROW ID ON HIDDEN FORM
        $('<input>').attr({type: 'hidden', id:'id',name: 'id',value: id}).appendTo('#movieEdit');

        //GET DATA OF ROW FROM DATABASE
        $.ajax({
            type: "GET",
            url: "api/Movie/" + id + "/edit",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            },
            success: function(data){
                console.log(data);
                $(".movieTitle").val(data.title);
                $(".movieDescription").val(data.description);
                $(".movieRelease").val(data.release);
                $(".movieGenre_id").val(data.genre_id);
                $(".movieProducer_id").val(data.producer_id);
            },
            error: function(){
            console.log('AJAX load did not work');
            alert("error");
            }
        });
    });
    


//UPDATE ROW DATA ON DATABASE WITH JQUERY VALIDATION
    $('#movieEdit').validate({
    rules: {
        title: { required:true, minlength:5 },
        description: { required:true, minlength:10 },
        release: { required:true, date: true},
        genre_id: { required:true},
        producer_id: { required:true},
    },
    messages: {
        title: { required:'required'},
        description: { required:'required'},
        release: { required:'required'},
        genre_id: { required:'required'},
        producer: { required:'required'},
        
    },
    errorPlacement: function(error, element){
        error.insertAfter(element)
    },
    submitHandler: function(form,e) {
            var id = $('#id').val();
            var data = $("#movieEdit").serialize();
            console.log(data);
            $.ajax({
                type: "PUT",
                url: "/api/Movie/"+ id ,
                data: data,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                },
                dataType: "json",
                success: function(data) {
                    $("#editMovie").modal("hide");
                    console.log(data);
                    
                },
                error: function(error) {
                    console.log('error');
                }
            });
        }
    });


     //DELETE ROW FROM DATABASE
    $( ".movieDelete" ).on( "click", function(e) {
        var id = $(e.currentTarget).attr('data-id');
        var $tr = $(this).closest('tr')
        console.log(id);
        if (confirm(`Are you sure you want to delete Movie Number ${id}?`)) {
            $.ajax({
                type: "DELETE",
                url: "/api/Movie/" + id,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                },
                dataType: "json",
                success: function (data) {
                    // console.log(data);
                    $tr.remove();
                },
                error:function(data){
                    console.log('Error:',data);
                }
            })
        }
    });

    //EMPTY DROPDOWN DATA WHEN MODAL FORM IS CLOSED
        $('#addMovie').on('hidden.bs.modal', (e) => {
            $('#genre_id').empty();
            $('#producer_id').empty();
        });

        $('#editMovie').on('hidden.bs.modal', (e) => {
            $('.movieGenre_id').empty();
            $('.movieProducer_id').empty();
        });

    }
}
export default movie;
