import genreModal from "./genreModals";
const genre = {
    show(response){

        //  SHOW-GENRE-TABLE
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

         //APPEND TABLE FORMAT TO INDEX
        $('#tableContent').html(tableContent);
        $('#addButton').html(addButton);
        $('#title').html(title);

        //APPEND TABLE DATA TO INDEX
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

        //APPEND MODAL FORM
        $('#content').append(genreModal);

    //CREATE-GENRE WITH JQUERY VALIDATION
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
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                },
                dataType: "json",
                success: function(data) {
                    console.log(data);
                      //clear input
                    $('#genreCreate :input').each(function () {
                        let input = $(this)
                        input.val('')
                    });
                    $('#addGenre').modal('hide');
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

//APPEND ROW DATA ON MODAL FORM
    $('#editGenre').on('show.bs.modal', function(e) {
        var id = $(e.relatedTarget).attr('data-id');
        console.log(id);
    //ADD ROW ID ON HIDDEN FORM
        $('<input>').attr({type: 'hidden', id:'id',name: 'id',value: id}).appendTo('#editGenre');

        //GET DATA OF ROW FROM DATABASE
        $.ajax({
            type: "GET",
            url: "api/Genre/" + id + "/edit",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            },
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

//UPDATE ROW DATA ON DATABASE WITH JQUERY VALIDATION
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
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                    },
                    dataType: "json",
                    success: function(data) {
                        console.log(data);
                        $('#editGenre').each(function(){
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
    $( ".genreDelete" ).on( "click", function(e) {
        var id = $(e.currentTarget).attr('data-id');
        var $tr = $(this).closest('tr')
        console.log(id);
        if (confirm(`Are you sure you want to delete Genre Number ${id}?`)) {
            $.ajax({
                type: "DELETE",
                url: "/api/Genre/" + id,
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
export default genre;