import producerModal from "./producerModals";
const producer ={
    show(response){

     //SHOW-PRODUCER-TABLE
    let title=`Producers`;
    let tableContent=
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
        `;
        let addButton = `<button type="button" class="btn " data-bs-toggle="modal" data-bs-target="#addProducer"><i class="fas fa-plus"></i></button>`;
        $('#tableContent').html(tableContent);
        $('#addButton').html(addButton);
        $('#title').html(title);

        response.forEach(element => {
            $('#producerBody').append(`
            <tr>
            <td>${element.id}</td>
            <td>${element.name}</td>
            <td>${element.email}</td>
            <td align='center'><i class="fas fa-edit" data-bs-toggle="modal" data-id="${element.id}" data-bs-target="#editProducer"></i></td>
            <td align='center'><i class="fas fa-trash-alt producerDelete" data-id="${element.id}"></i></td>
    
            </tr>
            `)
        });
        $( "table tbody" ).sortable();
        $('#content').append(producerModal);



//  CREATE-PRODUCER
    $('#producerCreate').validate({
        rules: {
            name: { required:true, minlength:5 },
            email: { required:true, email:true }
        },
        messages: {
            name: { required:'required'},
            email: { required:'required', email: 'Enter Valid Email'},
        },
        errorPlacement: function(error, element){
            error.insertAfter(element)
        },
        submitHandler: function(form,e) {
            e.preventDefault()
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
                     //clear input
                    $('#producerCreate :input').each(function () {
                        let input = $(this)
                        input.val('')
                    });
                        $('#addProducer').modal('hide');
                    $('#producerBody').append(`
                        <tr>
                            <td>${data.id}</td>
                            <td>${data.name}</td>
                            <td>${data.email}</td>
                            <td align='center'><i class="fas fa-edit" data-bs-toggle="modal" data-id="${data.id}" data-bs-target="#editProducer"></i></td>
                            <td align='center'><i class="fas fa-trash-alt producerDelete" data-id="${data.id}"></i></td>
                        </tr>
                    `)
        
                },
                error: function(error) {
                    console.log('error');
                }
            });
        }
    });

 // EDIT PRODUCER
    $('#editProducer').on('show.bs.modal', function(e) {
        var id = $(e.relatedTarget).attr('data-id');
        console.log(id);

        $('<input>').attr({type: 'hidden', id:'id',name: 'id',value: id}).appendTo('#editProducer');

        $.ajax({
            type: "GET",
            url: "api/Producer/" + id + "/edit",
            success: function(data){
                console.log(data);
                $(".producerName").val(data.name);
                $(".producerEmail").val(data.email);
            },
            error: function(){
            console.log('AJAX load did not work');
            alert("error");
            }
        });
    });


//UPDATE PRODUCER
    $('#producerEdit').validate({
        rules: {
        name: { required:true, minlength:5 },
        email: { required:true, email:true }
        },
        messages: {
            name: { required:'required'},
            email: { required:'required', email: 'Enter Valid Email'},
        },
        errorPlacement: function(error, element){
            error.insertAfter(element)
        },
        submitHandler: function(form,e) {
            e.preventDefault();
            var id = $('#id').val();
                var data = $("#producerEdit").serialize();
                console.log(data);
                $.ajax({
                    type: "PUT",
                    url: "/api/Producer/"+ id ,
                    data: data,
                    headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                    dataType: "json",
                    success: function(data) {
                        console.log(data);
                        $('#editProducer').each(function(){
                            $(this).modal('hide'); 
                        });
                        
                    },
                    error: function(error) {
                        console.log('error');
                    }
                });
        }
    });

     //Delete
    $( ".producerDelete" ).on( "click", function(e) {
        var id = $(e.currentTarget).attr('data-id');
        var $tr = $(this).closest('tr')
        console.log(id);
        if (confirm(`Are you sure you want to delete Producer Number ${id}?`)) {
            $.ajax({
                type: "DELETE",
                url: "/api/Producer/" + id,
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
export default producer;