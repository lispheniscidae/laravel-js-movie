import genreModal from "./genreModals";
const genre = {
    show(response){

          //SHOW-GENRE-TABLE
        let title = `Genres`;
        let tableContent=`
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
            `;

        let addButton = `<button type="button" class="btn  "data-bs-toggle="modal" data-bs-target="#addGenre"><i class="fas fa-plus"></i></button>`;

        $('#tableContent').html(tableContent);
        $('#addButton').html(addButton);
        $('#title').html(title);

        response.forEach(element => {
            $('#genreBody').append(`
            <tr>
            <td>${element.id}</td>
            <td>${element.name}</td>
            <td align='center'><i class="fas fa-edit"data-bs-toggle="modal" data-id="${element.id}" data-bs-target="#editGenre" ></i></td>
            <td align='center'><i class="fas fa-trash-alt genreDelete" data-id="${element.id}"></i></td>
    
            </tr>
            `)
        });

        $('#content').append(genreModal);

      // CREATE-GENRE
    $('#genreCreate').validate({
            rules: {
            name: { required:true, minlength:5 }
        },
        messages: {
            name: { required:'required'}
            
        },
        errorPlacement: function(error, element){
            error.insertAfter(element)
        },
        submitHandler: function(form,e) {
            e.preventDefault();
            var data = $("#genreCreate").serialize();
            console.log(data);

            $.ajax({
                type: "post",
                url: "/api/Genre",
                data: data,
                headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                dataType: "json",
                success: function(data) {
                    console.log(data);
                      //clear input
                    $('#genreCreate :input').each(function () {
                        let input = $(this)
                        input.val('')
                    });

                    $(this).modal('hide'); 

                    $('#genreBody').append(`

                        <tr>
                        <td>${data.id}</td>
                        <td>${data.name}</td>
                        <td align='center'><i class="fas fa-edit" data-bs-toggle="modal" data-id="${data.id}" data-bs-target="#editGenre"></i></td>
                        <td align='center'><i class="fas fa-trash-alt genreDelete" data-id="${data.id}"></i></td>
                        </tr>
                    `)

                },
                error: function(error) {
                    console.log('error');
                }
            });
            
        }
    });


        $('#editGenre').on('show.bs.modal', function(e) {
            var id = $(e.relatedTarget).attr('data-id');
            console.log(id);

            $('<input>').attr({type: 'hidden', id:'id',name: 'id',value: id}).appendTo('#editGenre');

            $.ajax({
                type: "GET",
                url: "api/Genre/" + id + "/edit",
                success: function(data){
                    console.log(data);
                    $(".genreName").val(data.name);
                },
                error: function(){
                console.log('AJAX load did not work');
                alert("error");
                }
            });
        });

        $('#genreEdit').validate({
            rules: {
                name: { required:true, minlength:5 }
            },
            messages: {
                name: { required:'required'}
            },
            errorPlacement: function(error, element){
                error.insertAfter(element)
            },
            submitHandler: function(form,e) {
                e.preventDefault();
                var id = $('#id').val();
                var data = $("#genreEdit").serialize();
                    console.log(data);
                    $.ajax({
                        type: "PUT",
                        url: "/api/Genre/"+ id ,
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
                    }
        });

    //Delete
    $( ".genreDelete" ).on( "click", function(e) {
        var id = $(e.currentTarget).attr('data-id');
        var $tr = $(this).closest('tr')
        console.log(id);
        if (confirm(`Are you sure you want to delete Genre Number ${id}?`)) {
            $.ajax({
                type: "DELETE",
                url: "/api/Genre/" + id,
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
export default genre;