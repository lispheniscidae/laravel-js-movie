import actorModal from "./actorModals";
const actor = {
    show(response){
//SHOW-ACTOR-TABLE
        let title=`Actors`;
        let tableContent = `
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
                </tbody>
                `;
                
        let addButton = `<button type="button" class="btn " data-bs-toggle="modal" data-bs-target="#addActor"><i class="fas fa-plus"></i></button>`;
        
        //APPEND TABLE FORMAT TO INDEX
        $('#tableContent').html(tableContent);
        $('#addButton').html(addButton);
        $('#title').html(title);
    
        //APPEND TABLE DATA TO INDEX
        response.forEach(element => {
            $('#actorBody').append(`
            <tr id="sortable">
            <td>${element.id}</td>
            <td>${element.fname}</td>
            <td>${element.lname}</td>
            <td>${element.note}</td>
            
            <td align='center'><i class="fas fa-edit" data-bs-toggle="modal" data-bs-target="#editActor" data-id="${element.id}" id="editActorIcon"></i></td>
            <td align='center'><i class="fas fa-trash-alt actorDelete" data-id="${element.id}"></i></td>
    
            </tr>
            `)
        });
    //APPEND MODAL FORM
    $('#content').append(actorModal);


// CREATE-ACTOR WITH JQUERY VALIDATION
    $('#actorCreate').validate({
        rules: {
            fname: { required:true, minlength:5 },
            lname: { required:true, minlength:5 },
            note: { required:true, minlength:5 }
        },
            messages: {
            fname: { required:'required'},
            lname: { required:'required'},
            note: { required:'required'},
        },
            errorPlacement: function(error, element){
                error.insertAfter(element)
        },
        submitHandler: function(form,e) {
                e.preventDefault();
                var data = $("#actorCreate").serialize();
                
                // alert(data);
                console.log(data);
                $.ajax({
                    type: "post",
                    url: "/api/Actor",
                    data: data,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                    },
                    dataType: "json",
                    success: function(data) {
                        console.log(data);
                        //clear input
                        $('#actorCreate :input').each(function () {
                            let input = $(this)
                            input.val('')
                        });
                        $('#addActor').modal('hide');
                        $('#actorBody').append(`
            
                            <tr>
                                <td >${data.id}</td>
                                <td>${data.fname}</td>
                                <td>${data.lname}</td>
                                <td>${data.note}</td>
                                <td align='center'><i class="fas fa-edit" data-toggle="modal" data-target="#editActor" data-id="${data.id}" id=""></i></td>
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

      //APPEND ROW DATA ON MODAL FORM   
        $('#editActor').on('show.bs.modal', function(e) {
            var id = $(e.relatedTarget).attr('data-id');
            console.log(id);
            $('<input>').attr({type: 'hidden', id:'id',name: 'id',value: id}).appendTo('#editActor');
            $.ajax({
                type: "GET",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                },
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


    //UPDATE-ACTOR ON DATABASE WITH JQUERY VALIDATION
    $('#actorEdit').validate({
        rules: {
            fname: { required:true, minlength:5,},
            lname: { required:true, minlength:5,},
            note: { required:true, minlength:5,}
        },
        messages: {
            fname: { required:'required'},
            lname: { required:'required'},
            note: { required:'required'},
        },
        errorPlacement: function(error, element){
            error.insertAfter(element)
        },
        submitHandler: function(form,e) {
            e.preventDefault();
            var id = $('#id').val();
            var data = $("#actorEdit").serialize();
            console.log(data);
                $.ajax({
                    type: "PUT",
                    url: "/api/Actor/"+ id ,
                    data: data,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                    },
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
            }
        });

    //DELETE ROW FROM DATABASE
    $( ".actorDelete" ).on( "click", function(e) {
        var id = $(e.currentTarget).attr('data-id');
        var $tr = $(this).closest('tr')
        console.log(id);
        if (confirm(`Are you sure you want to delete Actor Number ${id}?`)) {
            $.ajax({
                type: "DELETE",
                url: "/api/Actor/" + id,
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


    }
}
export default actor;