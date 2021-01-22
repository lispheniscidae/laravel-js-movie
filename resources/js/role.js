import roleModal from "./roleModals";
const role = {
    show(response){
        let title = `Roles`;
        let    tableContent = `
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
                    `;
                let   addButton = `<button type="button" class="btn " data-bs-toggle="modal" data-bs-target="#addRole"><i class="fas fa-plus"></i></button>`;
    
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
                        <td align='center'><i class="fas fa-edit" data-bs-toggle="modal" data-id="${element.id}" data-bs-target="#editRole"></i></td>
                        <td align='center'><i class="fas fa-trash-alt roleDelete" data-id="${element.id}"></i></td>
                
                        </tr>
                        `)
                    });

    $("#content").append(roleModal);

    $('#addRole').on('shown.bs.modal', (e) => {
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
        });

        //CREATE-ROLE
        $('#roleCreate').validate({
            rules: {
                movie_id: { required:true },
                producer_id: { required:true},
                name: { required:true, minlength:5 }
            },
            messages: {
                movie_id: { required:'required' },
                producer_id: { required:'required'},
                name: { required:'required'}
            },
            errorPlacement: function(error, element){
                error.insertAfter(element)
            },
            submitHandler: function(form,e) {
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
                        //clear input
                    $('#roleCreate :input').each(function () {
                        let input = $(this)
                        input.val('')
                    });
                            $('#addRole').modal('hide');
                            
                        $('#roleBody').append(`
            
                        <tr>
                        <td>${data.id}</td>
                        <td>${data.name}</td>
                        <td>${data.actor_id}</td>
                        <td>${data.movie_id}</td>
                        <td align='center'><i class="fas fa-edit" data-bs-toggle="modal" data-bs-target="#editRole"></i></td>
                        <td align='center'><i class="fas fa-trash-alt actorDelete" data-id="${data.id}"></i></td>
                
                        </tr>
                        `)

                    },
                    error: function(error) {
                        console.log('error');
                    }
                });
            }
        });

            $('#editRole').on('show.bs.modal', function(e) {

                var id = $(e.relatedTarget).attr('data-id');
                console.log(id);

                 //ITERATE-MOVIE-MODAL
                $.ajax({
                    type: "GET",
                    url: "/api/Movie",
                    dataType: "json",
                
                    success: function(data) {
                        console.log(data);
                        
                            var select = $('.producerMovie_id');
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
                        
                            var select = $('.producerActor_id');
                            $.each(data,function(data, result){
                                select.append('<option name=\'id\' value=\''+ result.id +' \'>'+ result.fname +' '+  result.lname +'</option>');

                            });

                    },
                    error: function(error) {
                        console.log('error');
                    }
                });  
                $('<input>').attr({type: 'hidden', id:'id',name: 'id',value: id}).appendTo('#editRole');
                $.ajax({
                    type: "GET",
                    url: "api/Role/" + id + "/edit",
                    success: function(data){
                        console.log(data);
                        $(".roleName").val(data.name);
                    },
                    error: function(){
                    console.log('AJAX load did not work');
                    alert("error");
                    }
                });
            });
    
            $('#roleEdit').validate({
                rules: {
                    movie_id: { required:true },
                    producer_id: { required:true},
                    name: { required:true, minlength:5 }
                },
                messages: {
                    movie_id: { required:'required' },
                    producer_id: { required:'required'},
                    name: { required:'required'}
                },
                errorPlacement: function(error, element){
                    error.insertAfter(element)
                },
                submitHandler: function(form,e) {
                    var id = $('#id').val();
                    var data = $("#roleEdit").serialize();
                    console.log(data);
                    $.ajax({
                        type: "PUT",
                        url: "/api/Role/"+ id ,
                        data: data,
                        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                        dataType: "json",
                        success: function(data) {
                            console.log(data);
                            $('#editRole').each(function(){
                                    $(this).modal('hide'); 
                                });
                        },
                        error: function(error) {
                            console.log('error');
                        }
                    });
                }
            });
        
            $('#addRole').on('hidden.bs.modal', (e) => {
                $('#actor_id').empty();
                $('#movie_id').empty();
                $('#name').empty();
            });
        
            $('#editRole').on('hidden.bs.modal', (e) => {
                $('.producerMovie_id').empty();
                $('.producerActor_id').empty();
                $('.roleName').empty();
            });

            //Delete
    $( ".roleDelete" ).on( "click", function(e) {
        var id = $(e.currentTarget).attr('data-id');
        var $tr = $(this).closest('tr')
        console.log(id);
        if (confirm(`Are you sure you want to delete Role Number ${id}?`)) {
            $.ajax({
                type: "DELETE",
                url: "/api/Role/" + id,
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
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
    }
}

export default role;