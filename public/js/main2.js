// CTRL + F to Find shit

//SHOW-MOVIE-TABLE
//SHOW-ACTOR-TABLE
//SHOW-PRODUCER-TABLE
//SHOW-GENRE-TABLE
//SHOW-ROLE-TABLE

//CREATE-MOVIE
//CREATE-ACTOR
//CREATE-PRODUCER
//CREATE-GENRE
//CREATE-ROLE

//ITERATE-GENRE-MODAL
//ITERATE-PRODUCER-MODAL
//ITERATE-ACTOR-MODAL
//ITERATE-MOVIE-MODAL


$(document).ready(function(){
    $('.link').on('click', (e) => {
        let link = e.currentTarget.dataset.id;
        console.log(link);
        $.ajax({
            type: 'GET',
            url: '/api/' + link + '/all',
            error: function(response){
                console.log(response)
            },
            success(response){
    
                let tableContent = ``;
                let addButton = ``;
                let title = ``;
    
                switch (link) {
                    case 'movie':
                
                    //SHOW-MOVIE-TABLE
                        title = `Movies`
                        tableContent = `<thead>
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
                        `
    
                    addButton = `<button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#addMovie" id="openModalMovie"><i class="fas fa-plus"></i></button>`
                    $('#tableContent').html(tableContent);
                    $('#addButton').html(addButton);
                    $('#title').html(title);
    
                    response.forEach(element => {
                        $('#movieBody').append(`
                        <tr>
                        <td>${element.id}</td>
                        <td>${element.title}</td>
                        <td>${element.description}</td>
                        <td>${element.release}</td>
                        <td>${element.genre_id}</td>
                        <td>${element.producer_id}</td>
                        <td align='center'><i class="fas fa-edit" data-bs-toggle="modal" data-bs-target="#editMovie"></i></td>
                        <td align='center'><i class="fas fa-trash-alt"></i></td>
                
                        </tr>
                        `)
                    });
         
    // $('#openModalMovie').on('click', function(e){
    $('#addMovie').on('show.bs.modal', (e) => {
            //ITERATE-GENRE-MODAL
                $.ajax({
                    type: "GET",
                    url: "/api/Genre",
                    dataType: "json",
                
                    success: function(data) {
                        console.log(data);
                        
                            var select = $('#genre_id');
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
    
    
    
    $('#addMovie').on('show.bs.modal', (e) => {

        $('#genres').empty();
        $('#producers').empty();
        
    });
                //CREATE-MOVIE
                $("#saveMovie").on('click', function(e) {
                    e.preventDefault();
                    var data = $("#movieCreate").serialize();
                    console.log(data);
                    $.ajax({
                        type: "post",
                        url: "/api/Movie",
                        data: data,
                        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                        dataType: "json",
                        success: function(data) {
                            console.log(data);
                                $('#addMovie').hide();
                                
                            $('#movieBody').append(`
                
                            <tr>
                            <td>${data.id}</td>
                            <td>${data.title}</td>
                            <td>${data.description}</td>
                            <td>${data.release}</td>
                            <td>${data.genre_id}</td>
                            <td>${data.producer_id}</td>
                            <td align='center'><i class="fas fa-edit" data-bs-toggle="modal" data-bs-target="#editMovie"></i></td>
                            <td align='center'><i class="fas fa-trash-alt"></i></td>
                            </tr>
                            `)
    
                        },
                        error: function(error) {
                            console.log('error');
                        }
                    });
                });


                $('#editActor').on('show.bs.modal', function(e) {
                    var id = $(e.relatedTarget).attr('data-id');
                    // var id = this.id;
                    console.log(id);
                    $('<input>').attr({type: 'hidden', id:'id',name: 'id',value: id}).appendTo('#editActor');
                    $.ajax({
                        type: "GET",
                        url: "api/Actor/" + id + "/edit",
                        success: function(data){
                               console.log(data);
                               $(".actorfname").val(data.fname);
                               $(".actorlname").val(data.lname);
                               $(".actornote").val(data.note);
                          },
                         error: function(){
                        console.log('AJAX load did not work');
                        alert("error");
                          }
                      });
                });
    
               
                    break;
                //SHOW-ACTOR-TABLE
                    case 'actor':
                        title=`Actors`
                        tableContent = `
                                <thead>
                                <tr>
                                <th>ID</th>
                                <th>fname</th>
                                <th>lname</th>
                                <th>note</th>
                                <th>Edit</th>
                                <th>Delete</th>
                                </tr>
                                <thead>
                                <tbody id="actorBody">
                                <tr>
                             
                    
                             </tr>
                                    
                                </tbody>
                                `
                                
                        addButton = `<button type="button" class="btn " data-bs-toggle="modal" data-bs-target="#addActor"><i class="fas fa-plus"></i></button>`
                        
                        $('#tableContent').html(tableContent);
                        $('#addButton').html(addButton);
                        $('#title').html(title);
                  
                    
        
                            response.forEach(element => {
        
                                $('#actorBody').append(`
                                <tr class="rowdata">
                                <td>${element.id}</td>
                                <td>${element.fname}</td>
                                <td>${element.lname}</td>
                                <td>${element.note}</td>
                                
                                <td align='center'><i class="fas fa-edit" data-bs-toggle="modal" data-bs-target="#editActor" data-id="${element.id}" id="editActorIcon"></i></td>
                                <td align='center'><i class="fas fa-trash-alt"></i></td>
                        
                                </tr>
                                `)
                            });
        
                    
                   
                    $('#editActor').on('show.bs.modal', function(e) {
                        // this.off('shown.bs.modal');
                        var id = $(e.relatedTarget).attr('data-id');
                        // var id = this.id;
                        console.log(id);
                        $('<input>').attr({type: 'hidden', id:'id',name: 'id',value: id}).appendTo('#editActor');
                        $.ajax({
                            type: "GET",
                            url: "api/Actor/" + id + "/edit",
                            success: function(data){
                                   console.log(data);
                                   $(".actorfname").val(data.fname);
                                   $(".actorlname").val(data.lname);
                                   $(".actornote").val(data.note);
                              },
                             error: function(){
                            console.log('AJAX load did not work');
                            alert("error");
                              }
                          });

                          
                    });

                   
    

                    $("#updateActor").on('click', function(e) {
                        var id = $('#id').val();
                         var data = $("#actorEdit").serialize();
                        console.log(data);
                        $.ajax({
                            type: "PUT",
                            url: "/api/Actor/"+ id ,
                            data: data,
                            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                            dataType: "json",
                            success: function(data) {
                                console.log(data);
                                $('#editActor').each(function(){
                                        $(this).modal('hide'); 
                                    });
                            },
                            error: function(error) {
                                console.log('error');
                            }
                        });
                    });
    
                    // CREATE-ACTOR
                        $("#saveActor").on('click', function(e) {
                            e.preventDefault();
                            var data = $("#actorCreate").serialize();
                            // alert(data);
                            console.log(data);
                            $.ajax({
                                type: "post",
                                url: "/api/Actor",
                                data: data,
                                headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                                dataType: "json",
                                success: function(data) {
                                    console.log(data);
                                        $('#addActor').hide();
                                        // window.location.reload();
                                    $('#actorBody').append(`
                        
                                        <tr>
                                            <td>${data.id}</td>
                                            <td>${data.fname}</td>
                                            <td>${data.lname}</td>
                                            <td>${data.note}</td>
                                            <td align='center'><i class="fas fa-edit" data-toggle="modal" data-target="#editActor" data-id="${data.id}" id="editActorIcon"></i></td>
                            <td align='center'><i class="fas fa-trash-alt"></i></td>
                                        </tr>
                                    `) 
    
                                },
                                error: function(error) {
                                    console.log('error');
                                }
                            });
                        });
    
    
                        break;
    
    
                    case  'producer':
                    //SHOW-PRODUCER-TABLE
                        title=`Producers`
                        tableContent=
                        `<thead class="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>name</th>
                            <th>email</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody id="producerBody">
                             </tbody>
                        `
                        addButton = `<button type="button" class="btn " data-toggle="modal" data-target="#addProducer"><i class="fas fa-plus"></i></button>`
                        $('#tableContent').html(tableContent);
                        $('#addButton').html(addButton);
                        $('#title').html(title);
                        response.forEach(element => {
                            $('#producerBody').append(`
                            <tr>
                            <td>${element.id}</td>
                            <td>${element.name}</td>
                            <td>${element.email}</td>
                            <td align='center'><i class="fas fa-edit" data-toggle="modal" data-target="#editProducer"></i></td>
                            <td align='center'><i class="fas fa-trash-alt"></i></td>
                    
                            </tr>
                            `)
                        });
    
                    //CREATE-PRODUCER
                    $("#saveProducer").on('click', function(e) {
                        e.preventDefault();
                        var data = $("#producerCreate").serialize();
                        
                        console.log(data);
                        $.ajax({
                            type: "post",
                            url: "/api/Producer",
                            data: data,
                            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                            dataType: "json",
                            success: function(data) {
                                console.log(data);
                                    $('#addProducer').hide();
                                $('#producerBody').append(`
                    
                                    <tr>
                                        <td>${data.id}</td>
                                        <td>${data.name}</td>
                                        <td>${data.email}</td>
                                        <td align='center'><i class="fas fa-edit" data-toggle="modal" data-target="#editProducer"></i></td>
                        <td align='center'><i class="fas fa-trash-alt"></i></td>
                                    </tr>
                                `)
    
                            },
                            error: function(error) {
                                console.log('error');
                            }
                        });
                    });
    
                        break;
                    case 'genre':
                    //SHOW-GENRE-TABLE
                        title = `Genres`
                        tableContent=`
                        <thead class="">
                            <tr>
                            <th>ID</th>
                            <th>genre</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody id="genreBody">
                        </tbody>
                        `
    
                        addButton = `<button type="button" class="btn " data-toggle="modal" data-target="#addGenre"><i class="fas fa-plus"></i></button>`
    
                        $('#tableContent').html(tableContent);
                        $('#addButton').html(addButton);
                        $('#title').html(title);
    
                        response.forEach(element => {
                            $('#genreBody').append(`
                            <tr>
                            <td>${element.id}</td>
                            <td>${element.name}</td>
                            <td align='center'><i class="fas fa-edit" data-toggle="modal" data-target="#editGenre"></i></td>
                            <td align='center'><i class="fas fa-trash-alt"></i></td>
                    
                            </tr>
                            `)
                        });
    
                    // CREATE-GENRE
                        $("#saveGenre").on('click', function(e) {
                            e.preventDefault();
                            var data = $("#genreCreate").serialize();
                            // alert(data);
                            console.log(data);
                            $.ajax({
                                type: "post",
                                url: "/api/Genre",
                                data: data,
                                headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                                dataType: "json",
                                success: function(data) {
                                    // alert(data);
                                    console.log(data);
                                    // $("myModal").modal("hide");
                                    // $('#actorCreateModal').each(function(){
                                        $('#addGenre').hide();
                                    // $.each(data, function(key, value){
                                    $('#genreBody').append(`
                        
                                        <tr>
                                        <td>${data.id}</td>
                                            <td>${data.name}</td>
                                            <td align='center'><i class="fas fa-edit" data-toggle="modal" data-target="#editGenre"></i></td>
                            <td align='center'><i class="fas fa-trash-alt"></i></td>
                                        </tr>
                                    `)
    
                                },
                                error: function(error) {
                                    console.log('error');
                                }
                            });
                        });
    
                        break;
    
                    case 'role':
                    //SHOW-ROLE-TABLE
                    title = `Roles`
                    tableContent = `
                        <thead class="">
                            <tr>
                            <th>ID</th>
                            <th>name</th>
                            <th>actor</th>
                            <th>movie</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody id="roleBody">
                        </tbody>
                    `
                    addButton = `<button type="button" class="btn " data-toggle="modal" data-target="#addRole"><i class="fas fa-plus"></i></button>`
    
                    $('#tableContent').html(tableContent);
                    $('#addButton').html(addButton);
                    $('#title').html(title);
                    response.forEach(element => {
                        $('#roleBody').append(`
                        <tr>
                        <td>${element.id}</td>
                        <td>${element.name}</td>
                        <td>${element.actor_id}</td>
                        <td>${element.movie_id}</td>
                        <td align='center'><i class="fas fa-edit" data-toggle="modal" data-target="#editRole"></i></td>
                        <td align='center'><i class="fas fa-trash-alt"></i></td>
                
                        </tr>
                        `)
                    });
                    
                    //ITERATE-MOVIE-MODAL
                    $.ajax({
                        type: "GET",
                        url: "/api/Movie",
                        dataType: "json",
                    
                        success: function(data) {
                            console.log(data);
                            
                                var select = $('#movie_id');
                                $.each(data,function(data, result){
                                    select.append('<option name=\'id\' value=\''+ result.id +' \'>'+ result.title +'</option>');
    
                                });
    
                        },
                        error: function(error) {
                            console.log('error');
                        }
                    });  
                
                //ITERATE-ACTOR-MODAL
                    $.ajax({
                       
                        type: "GET",
                        url: "/api/Actor",
                        dataType: "json",
                    
                        success: function(data) {
                            console.log(data);
                            
                                var select = $('#actor_id');
                                $.each(data,function(data, result){
                                    select.append('<option name=\'id\' value=\''+ result.id +' \'>'+ result.fname +' '+  result.lname +'</option>');
    
                                });
    
                        },
                        error: function(error) {
                            console.log('error');
                        }
                    });  
    
                //CREATE-ROLE
                    $("#saveRole").on('click', function(e) {
                        e.preventDefault();
                        var data = $("#roleCreate").serialize();
                        console.log(data);
                        $.ajax({
                            type: "post",
                            url: "/api/Role",
                            data: data,
                            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                            dataType: "json",
                            success: function(data) {
                                console.log(data);
                                    $('#addRole').hide();
                                    
                                $('#roleBody').append(`
                    
                                <tr>
                                <td>${data.id}</td>
                                <td>${data.name}</td>
                                <td>${data.actor_id}</td>
                                <td>${data.movie_id}</td>
                                <td align='center'><i class="fas fa-edit" data-toggle="modal" data-target="#editRole"></i></td>
                                <td align='center'><i class="fas fa-trash-alt"></i></td>
                        
                                </tr>
                                `)
        
                            },
                            error: function(error) {
                                console.log('error');
                            }
                        });
                    });
        
    
                    }
                }
            })
        });
    
    });