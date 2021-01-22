/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/actor.js":
/*!*******************************!*\
  !*** ./resources/js/actor.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _actorModals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actorModals */ "./resources/js/actorModals.js");

var actor = {
  show: function show(response) {
    var title = "Actors";
    var tableContent = "\n                <thead>\n                <tr>\n                <th>ID</th>\n                <th>fname</th>\n                <th>lname</th>\n                <th>note</th>\n                <th>Edit</th>\n                <th>Delete</th>\n                </tr>\n                <thead>\n                <tbody id=\"actorBody\">\n                <tr>\n                </tr>\n                    \n                </tbody>\n                ";
    var addButton = "<button type=\"button\" class=\"btn \" data-bs-toggle=\"modal\" data-bs-target=\"#addActor\"><i class=\"fas fa-plus\"></i></button>";
    $('#tableContent').html(tableContent);
    $('#addButton').html(addButton);
    $('#title').html(title);
    response.forEach(function (element) {
      $('#actorBody').append("\n            <tr class=\"rowdata\">\n            <td>".concat(element.id, "</td>\n            <td>").concat(element.fname, "</td>\n            <td>").concat(element.lname, "</td>\n            <td>").concat(element.note, "</td>\n            \n            <td align='center'><i class=\"fas fa-edit\" data-bs-toggle=\"modal\" data-bs-target=\"#editActor\" data-id=\"").concat(element.id, "\" id=\"editActorIcon\"></i></td>\n            <td align='center'><i class=\"fas fa-trash-alt actorDelete\" data-id=\"").concat(element.id, "\"></i></td>\n    \n            </tr>\n            "));
    });
    $('#content').append(_actorModals__WEBPACK_IMPORTED_MODULE_0__.default); // CREATE-ACTOR

    $('#actorCreate').validate({
      rules: {
        fname: {
          required: true,
          minlength: 5
        },
        lname: {
          required: true,
          minlength: 5
        },
        note: {
          required: true,
          minlength: 5
        }
      },
      messages: {
        fname: {
          required: 'required'
        },
        lname: {
          required: 'required'
        },
        note: {
          required: 'required'
        }
      },
      errorPlacement: function errorPlacement(error, element) {
        error.insertAfter(element);
      },
      submitHandler: function submitHandler(form, e) {
        e.preventDefault();
        var data = $("#actorCreate").serialize(); // alert(data);

        console.log(data);
        $.ajax({
          type: "post",
          url: "/api/Actor",
          data: data,
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          dataType: "json",
          success: function success(data) {
            console.log(data); //clear input

            $('#actorCreate :input').each(function () {
              var input = $(this);
              input.val('');
            });
            $('#addActor').modal('hide');
            $('#actorBody').append("\n            \n                            <tr>\n                                <td >".concat(data.id, "</td>\n                                <td>").concat(data.fname, "</td>\n                                <td>").concat(data.lname, "</td>\n                                <td>").concat(data.note, "</td>\n                                <td align='center'><i class=\"fas fa-edit\" data-toggle=\"modal\" data-target=\"#editActor\" data-id=\"").concat(data.id, "\" id=\"\"></i></td>\n                                <td align='center'><i class=\"fas fa-trash-alt actorDelete\" data-id=\"").concat(data.id, "\"></i></td>\n                            </tr>\n                        "));
          },
          error: function error(_error) {
            console.log('error');
          }
        });
      }
    }); //EDIT-ACTOR     

    $('#editActor').on('show.bs.modal', function (e) {
      var id = $(e.relatedTarget).attr('data-id');
      console.log(id);
      $('<input>').attr({
        type: 'hidden',
        id: 'id',
        name: 'id',
        value: id
      }).appendTo('#editActor');
      $.ajax({
        type: "GET",
        url: "api/Actor/" + id + "/edit",
        success: function success(data) {
          console.log(data);
          $(".actorfname").val(data.fname);
          $(".actorlname").val(data.lname);
          $(".actornote").val(data.note);
        },
        error: function error() {
          console.log('AJAX load did not work');
          alert("error");
        }
      });
    }); //UPDATE-ACTOR

    $('#actorEdit').validate({
      rules: {
        fname: {
          required: true,
          minlength: 5
        },
        lname: {
          required: true,
          minlength: 5
        },
        note: {
          required: true,
          minlength: 5
        }
      },
      messages: {
        fname: {
          required: 'required'
        },
        lname: {
          required: 'required'
        },
        note: {
          required: 'required'
        }
      },
      errorPlacement: function errorPlacement(error, element) {
        error.insertAfter(element);
      },
      submitHandler: function submitHandler(form, e) {
        e.preventDefault();
        var id = $('#id').val();
        var data = $("#actorEdit").serialize();
        console.log(data);
        $.ajax({
          type: "PUT",
          url: "/api/Actor/" + id,
          data: data,
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          dataType: "json",
          success: function success(data) {
            console.log(data);
            $('#editActor').each(function () {
              $(this).modal('hide');
            });
          },
          error: function error(_error2) {
            console.log('error');
          }
        });
      }
    }); //Delete

    $(".actorDelete").on("click", function (e) {
      var id = $(e.currentTarget).attr('data-id');
      var $tr = $(this).closest('tr');
      console.log(id);

      if (confirm("Are you sure you want to delete Actor Number ".concat(id, "?"))) {
        $.ajax({
          type: "DELETE",
          url: "/api/Actor/" + id,
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          dataType: "json",
          success: function success(data) {
            // console.log(data);
            $tr.remove();
          },
          error: function error(data) {
            console.log('Error:', data);
          }
        });
      }
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (actor);

/***/ }),

/***/ "./resources/js/actorModals.js":
/*!*************************************!*\
  !*** ./resources/js/actorModals.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ actorModal
/* harmony export */ });
function actorModal() {
  return "\n\n<!-- ----------------------------------------------------------ACTORCREATE----------------------------------------------- -->\n<div class=\"modal fade\" id=\"addActor\" tabindex=\"-1\" aria-labelledby=\"addActor\" aria-hidden=\"true\">\n    <div class=\"modal-dialog modal-lg\">\n        <div class=\"modal-content\">\n        \n            <div class=\"modal-header\">\n                <h2>Create new actor</h2>\n            </div>\n\n            <div class=\"modal-body\">\n        <form class=\"actorCreate\" id=\"actorCreate\">\n            <div class=\"form-group\">\n                <label for=\"fname\" class=\"control-label\">First Name</label>\n                <input type=\"text\" class=\"form-control\" id=\"fname\" name=\"fname\" value=\"\">\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"lname\" class=\"control-label\">Last name</label>\n                <input type=\"text\" class=\"form-control \" id=\"lname\" name=\"lname\" value=\"\">\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"note\">Note</label>\n                <textarea class=\"form-control\" id=\"note\" name=\"note\" rows=\"3\" value=\"\"></textarea>\n            </div>\n\n            <div class=\"modal-footer\">\n            <button type=\"submit\" class=\"btn\" style=\"background-color:#9dfdc7; color:#367591;\" id=\"saveActor\" >Save</button>\n            <button type=\"submit\" class=\"btn\" data-bs-dismiss=\"modal\">Cancel</button>\n            </div>\n        </form>\n            </div>\n\n        </div>\n    </div>\n</div>\n<!-- ----------------------------------------------------------ACTOREDIT--------------------------------------------------- -->\n<div class=\"modal fade\" id=\"editActor\" tabindex=\"-1\" aria-labelledby=\"editActor\" aria-hidden=\"true\">\n    <div class=\"modal-dialog modal-lg\">\n        <div class=\"modal-content\">\n        \n            <div class=\"modal-header\">\n    \n                <h2>Edit actor</h2>\n            </div>\n\n            <div class=\"modal-body\">\n        <form id=\"actorEdit\">      \n            <div class=\"form-group\">\n                <label for=\"fname\" class=\"control-label\">First Name</label>\n                <input type=\"text\" class=\"form-control actorfname\" id=\"fname\" name=\"fname\" value=\"\">\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"lname\" class=\"control-label\">Last name</label>\n                <input type=\"text\" class=\"form-control actorlname\" id=\"lname\" name=\"lname\" data-id=\"lname\" value=\"\">\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"note\">Note</label>\n                <textarea class=\"form-control actornote\" id=\"note\" name=\"note\" rows=\"3\" value=\"\"></textarea>\n            </div>\n\n            <div class=\"modal-footer\">\n            <button type=\"submit\" class=\"btn\" style=\"background-color:#9dfdc7; color:#367591;\" id=\"updateActor\" >Save</button>\n            <button type=\"submit\" class=\"btn\" data-bs-dismiss=\"modal\">Cancel</button>\n            </div>\n        </form>\n            </div>\n        </div>\n    </div>\n</div>";
}

/***/ }),

/***/ "./resources/js/genre.js":
/*!*******************************!*\
  !*** ./resources/js/genre.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _genreModals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./genreModals */ "./resources/js/genreModals.js");

var genre = {
  show: function show(response) {
    //SHOW-GENRE-TABLE
    var title = "Genres";
    var tableContent = "\n            <thead class=\"\">\n                <tr>\n                <th>ID</th>\n                <th>genre</th>\n                <th>Edit</th>\n                <th>Delete</th>\n                </tr>\n            </thead>\n            <tbody id=\"genreBody\">\n            </tbody>\n            ";
    var addButton = "<button type=\"button\" class=\"btn  \"data-bs-toggle=\"modal\" data-bs-target=\"#addGenre\"><i class=\"fas fa-plus\"></i></button>";
    $('#tableContent').html(tableContent);
    $('#addButton').html(addButton);
    $('#title').html(title);
    response.forEach(function (element) {
      $('#genreBody').append("\n            <tr>\n            <td>".concat(element.id, "</td>\n            <td>").concat(element.name, "</td>\n            <td align='center'><i class=\"fas fa-edit\"data-bs-toggle=\"modal\" data-id=\"").concat(element.id, "\" data-bs-target=\"#editGenre\" ></i></td>\n            <td align='center'><i class=\"fas fa-trash-alt genreDelete\" data-id=\"").concat(element.id, "\"></i></td>\n    \n            </tr>\n            "));
    });
    $('#content').append(_genreModals__WEBPACK_IMPORTED_MODULE_0__.default); // CREATE-GENRE

    $('#genreCreate').validate({
      rules: {
        name: {
          required: true,
          minlength: 5
        }
      },
      messages: {
        name: {
          required: 'required'
        }
      },
      errorPlacement: function errorPlacement(error, element) {
        error.insertAfter(element);
      },
      submitHandler: function submitHandler(form, e) {
        e.preventDefault();
        var data = $("#genreCreate").serialize();
        console.log(data);
        $.ajax({
          type: "post",
          url: "/api/Genre",
          data: data,
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          dataType: "json",
          success: function success(data) {
            console.log(data); //clear input

            $('#genreCreate :input').each(function () {
              var input = $(this);
              input.val('');
            });
            $(this).modal('hide');
            $('#genreBody').append("\n\n                        <tr>\n                        <td>".concat(data.id, "</td>\n                        <td>").concat(data.name, "</td>\n                        <td align='center'><i class=\"fas fa-edit\" data-bs-toggle=\"modal\" data-id=\"").concat(data.id, "\" data-bs-target=\"#editGenre\"></i></td>\n                        <td align='center'><i class=\"fas fa-trash-alt genreDelete\" data-id=\"").concat(data.id, "\"></i></td>\n                        </tr>\n                    "));
          },
          error: function error(_error) {
            console.log('error');
          }
        });
      }
    });
    $('#editGenre').on('show.bs.modal', function (e) {
      var id = $(e.relatedTarget).attr('data-id');
      console.log(id);
      $('<input>').attr({
        type: 'hidden',
        id: 'id',
        name: 'id',
        value: id
      }).appendTo('#editGenre');
      $.ajax({
        type: "GET",
        url: "api/Genre/" + id + "/edit",
        success: function success(data) {
          console.log(data);
          $(".genreName").val(data.name);
        },
        error: function error() {
          console.log('AJAX load did not work');
          alert("error");
        }
      });
    });
    $('#genreEdit').validate({
      rules: {
        name: {
          required: true,
          minlength: 5
        }
      },
      messages: {
        name: {
          required: 'required'
        }
      },
      errorPlacement: function errorPlacement(error, element) {
        error.insertAfter(element);
      },
      submitHandler: function submitHandler(form, e) {
        e.preventDefault();
        var id = $('#id').val();
        var data = $("#genreEdit").serialize();
        console.log(data);
        $.ajax({
          type: "PUT",
          url: "/api/Genre/" + id,
          data: data,
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          dataType: "json",
          success: function success(data) {
            console.log(data);
            $('#editActor').each(function () {
              $(this).modal('hide');
            });
          },
          error: function error(_error2) {
            console.log('error');
          }
        });
      }
    }); //Delete

    $(".genreDelete").on("click", function (e) {
      var id = $(e.currentTarget).attr('data-id');
      var $tr = $(this).closest('tr');
      console.log(id);

      if (confirm("Are you sure you want to delete Genre Number ".concat(id, "?"))) {
        $.ajax({
          type: "DELETE",
          url: "/api/Genre/" + id,
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          dataType: "json",
          success: function success(data) {
            // console.log(data);
            $tr.remove();
          },
          error: function error(data) {
            console.log('Error:', data);
          }
        });
      }
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (genre);

/***/ }),

/***/ "./resources/js/genreModals.js":
/*!*************************************!*\
  !*** ./resources/js/genreModals.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ genreModal
/* harmony export */ });
function genreModal() {
  return "\n    <!-- ----------------------------------------------------------GENRECREATE--------------------------------------------------- -->\n    <div class=\"modal fade\" id=\"addGenre\" tabindex=\"-1\" aria-labelledby=\"addGenre\" aria-hidden=\"true\" data-backdrop=\"false\" data-backdrop=\"false\">\n        <div class=\"modal-dialog modal-sm\">\n            <div class=\"modal-content\">\n            \n                <div class=\"modal-header\">\n                    <h2>Create Genre</h2>\n                </div>\n    \n                    <div class=\"modal-body\">\n                <form id=\"genreCreate\">\n                        <div class=\"form-group\">\n                            <label for=\"name\" class=\"control-label\">Name</label>\n                            <input type=\"text\" class=\"form-control\" id=\"name\" name=\"name\">\n                        </div>\n                    <div class=\"modal-footer\">\n                        <button type=\"submit\" class=\"btn\" style=\"background-color:#9dfdc7; color:#367591;\" id=\"saveGenre\">Save</button>\n                        <a href=\"\" class=\"btn btn-default\" role=\"button\">Cancel</a>\n                    </div>\n                </form>\n            </div>\n            </div>\n        </div>\n    </div>\n    <!-- ----------------------------------------------------------GENREEDIT--------------------------------------------------- -->\n    <div class=\"modal fade\" id=\"editGenre\" tabindex=\"-1\" aria-labelledby=\"editGenre\" aria-hidden=\"true\" data-backdrop=\"false\">\n        <div class=\"modal-dialog modal-sm\">\n            <div class=\"modal-content\">\n            \n                <div class=\"modal-header\">\n                    <h2>Edit Genre</h2>\n                </div>\n    \n                <div class=\"modal-body\">\n            <form id=\"genreEdit\">\n                    <div class=\"form-group\">\n                        <label for=\"name\" class=\"control-label\">Name</label>\n                        <input type=\"text\" class=\"form-control genreName\" id=\"name\" name=\"name\">\n                    </div>\n                <div id = \"modal-footer\">\n                    <button type=\"submit\" class=\"btn\" style=\"background-color:#9dfdc7; color:#367591;\" id=\"updateGenre\">Save</button>\n                    <a href=\"\" class=\"btn btn-default\" role=\"button\">Cancel</a>\n                </div>\n            </form> \n                </div>\n            </div>\n        </div>\n    </div>";
}

/***/ }),

/***/ "./resources/js/main.js":
/*!******************************!*\
  !*** ./resources/js/main.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _movie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./movie */ "./resources/js/movie.js");
/* harmony import */ var _actor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actor */ "./resources/js/actor.js");
/* harmony import */ var _producer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./producer */ "./resources/js/producer.js");
/* harmony import */ var _genre__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./genre */ "./resources/js/genre.js");
/* harmony import */ var _role__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./role */ "./resources/js/role.js");





$(document).ready(function () {
  $('.link').on('click', function (e) {
    var link = e.currentTarget.dataset.id;
    console.log(link);
    $.ajax({
      type: "GET",
      url: "/api/" + link,
      dataType: 'json',
      success: function success(response) {
        switch (link) {
          case "Movie":
            console.log(response);
            _movie__WEBPACK_IMPORTED_MODULE_0__.default.show(response);
            break;

          case "Actor":
            _actor__WEBPACK_IMPORTED_MODULE_1__.default.show(response);
            break;

          case "Producer":
            _producer__WEBPACK_IMPORTED_MODULE_2__.default.show(response);
            break;

          case "Genre":
            _genre__WEBPACK_IMPORTED_MODULE_3__.default.show(response);
            break;

          case "Role":
            _role__WEBPACK_IMPORTED_MODULE_4__.default.show(response);
            break;

          default:
            break;
        }
      },
      error: function error(err) {
        console.log(err);
        console.log('AJAX load did not work');
        alert("error");
      }
    });
    $("#resizable").resizable();
  });
});

/***/ }),

/***/ "./resources/js/movie.js":
/*!*******************************!*\
  !*** ./resources/js/movie.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _movieModals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./movieModals */ "./resources/js/movieModals.js");

var movie = {
  //SHOW-MOVIE-TABLE
  show: function show(response) {
    var title = "Movies";
    var tableContent = "<thead>\n                <tr>\n                <th>ID</th>\n                <th>title</th>\n                <th>description</th>\n                <th>release</th>\n                <th>genre_id</th>\n                <th>producer_id</th>\n                <th>Edit</th>\n                <th>Delete</th>\n                </tr>\n                </thead>\n                <tbody id=\"movieBody\">\n                        \n                </tbody>\n        ";
    var addButton = "<button type=\"button\" class=\"btn\" data-bs-toggle=\"modal\" data-bs-target=\"#addMovie\"><i class=\"fas fa-plus\"></i></button>";
    $('#tableContent').html(tableContent);
    $('#addButton').html(addButton);
    $('#title').html(title);
    response.forEach(function (element) {
      $('#movieBody').append("\n            <tr>\n            <td>".concat(element.id, "</td>\n            <td>").concat(element.title, "</td>\n            <td>").concat(element.description, "</td>\n            <td>").concat(element.release, "</td>\n            <td>").concat(element.genre_id, "</td>\n            <td>").concat(element.producer_id, "</td>\n            <td align='center'><i class=\"fas fa-edit\" data-bs-toggle=\"modal\" data-bs-target=\"#editMovie\" data-id=\"").concat(element.id, "\"></i></td>\n            <td align='center'><i class=\"fas fa-trash-alt movieDelete\" data-id=\"").concat(element.id, "\"></i></td>\n    \n            </tr>\n            "));
    });
    $('#content').append(_movieModals__WEBPACK_IMPORTED_MODULE_0__.default);
    $('#addMovie').on('shown.bs.modal', function (e) {
      // ITERATE-GENRE-MODAL
      $.ajax({
        type: "GET",
        url: "/api/Genre",
        dataType: "json",
        success: function success(data) {
          console.log(data); //clear input

          $('#movieCreate :input').each(function () {
            var input = $(this);
            input.val('');
          });
          var select = $('#genre_id');
          $.each(data, function (data, result) {
            select.append('<option name=\'id\' value=\'' + result.id + ' \'>' + result.name + '</option>');
          });
        },
        error: function error(_error) {
          console.log('error');
        }
      }); //ITERATE-PRODUCER-MODAL

      $.ajax({
        type: "GET",
        url: "/api/Producer",
        dataType: "json",
        success: function success(data) {
          console.log(data);
          var select = $('#producer_id');
          $.each(data, function (data, result) {
            select.append('<option name=\'id\' value=\'' + result.id + ' \'>' + result.name + '</option>');
          });
        },
        error: function error(_error2) {
          console.log('error');
        }
      });
    }); //CREATE-MOVIE

    $('#movieCreate').validate({
      rules: {
        title: {
          required: true,
          minlength: 5
        }
      },
      messages: {
        title: {
          required: 'required'
        }
      },
      errorPlacement: function errorPlacement(error, element) {
        error.insertAfter(element);
      },
      submitHandler: function submitHandler(form, e) {
        // $('#saveMovie').on('click', function(e){
        e.preventDefault();
        var data = $("#movieCreate").serialize();
        console.log(data);
        $.ajax({
          type: "POST",
          url: "/api/Movie",
          data: data,
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          dataType: "json",
          success: function success(data) {
            console.log(data);
            $("#addMovie").modal("hide");
            $('#movieBody').append("\n        \n                    <tr>\n                    <td>".concat(data.id, "</td>\n                    <td>").concat(data.title, "</td>\n                    <td>").concat(data.description, "</td>\n                    <td>").concat(data.release, "</td>\n                    <td>").concat(data.genre_id, "</td>\n                    <td>").concat(data.producer_id, "</td>\n                    <td align='center'><i class=\"fas fa-edit\" data-bs-toggle=\"modal\" data-id=\"").concat(data.id, "\" data-bs-target=\"#editMovie\"></i></td>\n                    <td align='center'><i class=\"fas fa-trash-alt movieDelete\" data-id=\"").concat(data.id, "\"></i></td>\n            \n                    </tr>\n                    "));
          },
          error: function error(_error3) {
            console.log('error');
          }
        });
      }
    });
    $('#editMovie').on('shown.bs.modal', function (e) {
      var id = $(e.relatedTarget).attr('data-id');
      console.log(id); // ITERATE-GENRE-MODAL

      $.ajax({
        type: "GET",
        url: "/api/Genre",
        dataType: "json",
        success: function success(data) {
          console.log(data);
          var select = $('.movieGenre_id');
          $.each(data, function (data, result) {
            select.append('<option name=\'id\' value=\'' + result.id + ' \'>' + result.name + '</option>');
          });
        },
        error: function error(_error4) {
          console.log('error');
        }
      }); //ITERATE-PRODUCER-MODAL

      $.ajax({
        type: "GET",
        url: "/api/Producer",
        dataType: "json",
        success: function success(data) {
          console.log(data);
          var select = $('.movieProducer_id');
          $.each(data, function (data, result) {
            select.append('<option name=\'id\' value=\'' + result.id + ' \'>' + result.name + '</option>');
          });
        },
        error: function error(_error5) {
          console.log('error');
        }
      });
      $('<input>').attr({
        type: 'hidden',
        id: 'id',
        name: 'id',
        value: id
      }).appendTo('#movieEdit');
      $.ajax({
        type: "GET",
        url: "api/Movie/" + id + "/edit",
        success: function success(data) {
          console.log(data);
          $(".movieTitle").val(data.title);
          $(".movieDescription").val(data.description);
          $(".movieRelease").val(data.release);
          $(".movieGenre_id").val(data.genre_id);
          $(".movieProducer_id").val(data.producer_id);
        },
        error: function error() {
          console.log('AJAX load did not work');
          alert("error");
        }
      });
    });
    $('#movieEdit').validate({
      rules: {
        title: {
          required: true,
          minlength: 5
        },
        description: {
          required: true,
          minlength: 10
        },
        release: {
          required: true,
          date: true
        },
        genre_id: {
          required: true
        },
        producer_id: {
          required: true
        }
      },
      messages: {
        title: {
          required: 'required'
        },
        description: {
          required: 'required'
        },
        release: {
          required: 'required'
        },
        genre_id: {
          required: 'required'
        },
        producer: {
          required: 'required'
        }
      },
      errorPlacement: function errorPlacement(error, element) {
        error.insertAfter(element);
      },
      submitHandler: function submitHandler(form, e) {
        var id = $('#id').val();
        var data = $("#movieEdit").serialize();
        console.log(data);
        $.ajax({
          type: "PUT",
          url: "/api/Movie/" + id,
          data: data,
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          dataType: "json",
          success: function success(data) {
            $("#editMovie").modal("hide");
            console.log(data);
          },
          error: function error(_error6) {
            console.log('error');
          }
        });
      }
    });
    $('#addMovie').on('hidden.bs.modal', function (e) {
      // $(".modal-body").html("");
      $('#genre_id').empty();
      $('#producer_id').empty();
    });
    $('#editMovie').on('hidden.bs.modal', function (e) {
      // $(".modal-body").html("");
      $('.movieGenre_id').empty();
      $('.movieProducer_id').empty();
    }); //Delete

    $(".movieDelete").on("click", function (e) {
      var id = $(e.currentTarget).attr('data-id');
      var $tr = $(this).closest('tr');
      console.log(id);

      if (confirm("Are you sure you want to delete Movie Number ".concat(id, "?"))) {
        $.ajax({
          type: "DELETE",
          url: "/api/Movie/" + id,
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          dataType: "json",
          success: function success(data) {
            // console.log(data);
            $tr.remove();
          },
          error: function error(data) {
            console.log('Error:', data);
          }
        });
      }
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (movie);

/***/ }),

/***/ "./resources/js/movieModals.js":
/*!*************************************!*\
  !*** ./resources/js/movieModals.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ movieModal
/* harmony export */ });
function movieModal() {
  return "<!-- ---------------------------------------MOVIECREATE-------------------------------------- -->\n    <div class=\"modal fade\" id=\"addMovie\" tabindex=\"-1\" aria-labelledby=\"addMovie\" aria-hidden=\"true\">\n    <div class=\"modal-dialog modal-lg\">\n        <div class=\"modal-content\">\n        \n            <div class=\"modal-header d-flex justify-content-center\">\n            <h2>Create Movie</h2>\n            </div>\n\n            <div class=\"modal-body\">\n            <form id = \"movieCreate\">\n                <div class=\"form-group\">\n                    <label for=\"Title\" class=\"control-label\">Title</label>\n                    <input type=\"text\" class=\"form-control\" id=\"title\" name=\"title\" value=\"\">\n                    \n                </div>\n\n                <div class=\"form-group\">\n                    <label for=\"description\">Description</label>\n                    <textarea class=\"form-control\" id=\"description\" name=\"description\" rows=\"3\" value=\"\"></textarea>\n                \n                </div>\n\n                <div class=\"form-group col-md-6\">\n                    <div class=\"md-form  md-outline input-with-post-icon datepicker\">\n                        <label for=\"Release\">Release</label>\n                        <input type=\"date\" id=\"release\" class=\"form-control\" name=\"release\" value=\"\" >\n                    </div>\n                </div>\n\n                <div class=\"form-group col-md-6\">\n                    <label for=\"genre\">Genre</label>\n                    <select class=\"form-control\" id=\"genre_id\" name=\"genre_id\"> \n                    \n                    </select>\n                    \n                </div>\n\n                <div class=\"form-group col-md-6\">\n                <label for=\"producer\">Producer</label>\n                    <select class=\"form-control\" id=\"producer_id\" name=\"producer_id\"> \n                    \n                    </select>\n                    \n                </div>\n                \n\n                \n            </div>\n\n            <div class=\"modal-footer\">\n                <button type=\"submit\" class=\"btn\" style=\"background-color:#9dfdc7; color:#367591;\" id=\"saveMovie\">Save</button>\n                <button type=\"submit\" class=\"btn\" data-bs-dismiss=\"modal\">Cancel</button>\n            </div>\n</form>\n        </div>\n    </div>\n</div>\n\n\n<!-- ---------------------------------------------------MOVIEEDIT------------------------------------------------- -->\n\n<div class=\"modal fade\" id=\"editMovie\" tabindex=\"-1\" aria-labelledby=\"editMovie\" aria-hidden=\"true\">\n    <div class=\"modal-dialog modal-lg\">\n        <div class=\"modal-content\">\n        \n        <div class=\"modal-header d-flex justify-content-center\">\n            <h2>Edit Movie</h2>\n            </div>\n\n            <div class=\"modal-body\">\n            <form id = \"movieEdit\">\n                <div class=\"form-group\">\n                    <label for=\"Title\" class=\"control-label\">Title</label>\n                    <input type=\"text\" class=\"form-control movieTitle\" id=\"title\" name=\"title\" value=\"\">\n                    \n                </div>\n\n                <div class=\"form-group\">\n                    <label for=\"description\">Description</label>\n                    <textarea class=\"form-control movieDescription\" id=\"description\" name=\"description\" rows=\"3\" value=\"\"></textarea>\n                \n                </div>\n\n                <div class=\"form-group col-md-6\">\n                    <div class=\"md-form  md-outline input-with-post-icon datepicker\">\n                        <label for=\"Release\">Release</label>\n                        <input placeholder=\"Select date\" type=\"date\" id=\"release\" class=\"form-control movieRelease\" name=\"release\" value=\"\" data-date-format=\"yyyy-mm-dd\">\n                    \n                    </div>\n                </div>\n\n                <div class=\"form-group col-md-6\">\n                    <label for=\"genre\">Genre</label>\n                    <select class=\"form-control movieGenre_id\" id=\"genre_id\" name=\"genre_id\"> \n                    \n                    </select>\n                    \n                </div>\n\n                <div class=\"form-group col-md-6\">\n                <label for=\"producer\">Producer</label>\n                    <select class=\"form-control movieProducer_id\" id=\"producer_id\" name=\"producer_id\"> \n                    \n                    </select>\n                    \n                </div>\n                \n\n            <div class=\"modal-footer\">\n                <button type=\"submit\" class=\"btn\" style=\"background-color:#9dfdc7; color:#367591;\" id=\"updateMovie\" >Save</button>\n                <button type=\"submit\" class=\"btn\" data-bs-dismiss=\"modal\">Cancel</button>\n            </div>\n            </form>\n            </div>\n        </div>\n    </div>\n</div>";
}

/***/ }),

/***/ "./resources/js/producer.js":
/*!**********************************!*\
  !*** ./resources/js/producer.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _producerModals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./producerModals */ "./resources/js/producerModals.js");

var producer = {
  show: function show(response) {
    //SHOW-PRODUCER-TABLE
    var title = "Producers";
    var tableContent = "<thead class=\"table-dark\">\n        <tr>\n            <th>ID</th>\n            <th>name</th>\n            <th>email</th>\n            <th>Edit</th>\n            <th>Delete</th>\n        </tr>\n        </thead>\n        <tbody id=\"producerBody\">\n            </tbody>\n        ";
    var addButton = "<button type=\"button\" class=\"btn \" data-bs-toggle=\"modal\" data-bs-target=\"#addProducer\"><i class=\"fas fa-plus\"></i></button>";
    $('#tableContent').html(tableContent);
    $('#addButton').html(addButton);
    $('#title').html(title);
    response.forEach(function (element) {
      $('#producerBody').append("\n            <tr>\n            <td>".concat(element.id, "</td>\n            <td>").concat(element.name, "</td>\n            <td>").concat(element.email, "</td>\n            <td align='center'><i class=\"fas fa-edit\" data-bs-toggle=\"modal\" data-id=\"").concat(element.id, "\" data-bs-target=\"#editProducer\"></i></td>\n            <td align='center'><i class=\"fas fa-trash-alt\"></i></td>\n    \n            </tr>\n            "));
    });
    $('#content').append(_producerModals__WEBPACK_IMPORTED_MODULE_0__.default); //  CREATE-PRODUCER

    $('#producerCreate').validate({
      rules: {
        name: {
          required: true,
          minlength: 5
        },
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: 'required'
        },
        email: {
          required: 'required',
          email: 'Enter Valid Email'
        }
      },
      errorPlacement: function errorPlacement(error, element) {
        error.insertAfter(element);
      },
      submitHandler: function submitHandler(form, e) {
        e.preventDefault();
        var data = $("#producerCreate").serialize();
        console.log(data);
        $.ajax({
          type: "post",
          url: "/api/Producer",
          data: data,
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          dataType: "json",
          success: function success(data) {
            console.log(data); //clear input

            $('#producerCreate :input').each(function () {
              var input = $(this);
              input.val('');
            });
            $('#addProducer').modal('hide');
            $('#producerBody').append("\n                        <tr>\n                            <td>".concat(data.id, "</td>\n                            <td>").concat(data.name, "</td>\n                            <td>").concat(data.email, "</td>\n                            <td align='center'><i class=\"fas fa-edit\" data-bs-toggle=\"modal\" data-id=\"").concat(data.id, "\" data-bs-target=\"#editProducer\"></i></td>\n                        d<td align='center'><i class=\"fas fa-trash-alt\"></i></td>\n                        </tr>\n                    "));
          },
          error: function error(_error) {
            console.log('error');
          }
        });
      }
    }); // EDIT PRODUCER

    $('#editProducer').on('show.bs.modal', function (e) {
      var id = $(e.relatedTarget).attr('data-id');
      console.log(id);
      $('<input>').attr({
        type: 'hidden',
        id: 'id',
        name: 'id',
        value: id
      }).appendTo('#editProducer');
      $.ajax({
        type: "GET",
        url: "api/Producer/" + id + "/edit",
        success: function success(data) {
          console.log(data);
          $(".producerName").val(data.name);
          $(".producerEmail").val(data.email);
        },
        error: function error() {
          console.log('AJAX load did not work');
          alert("error");
        }
      });
    }); //UPDATE PRODUCER

    $('#producerEdit').validate({
      rules: {
        name: {
          required: true,
          minlength: 5
        },
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: 'required'
        },
        email: {
          required: 'required',
          email: 'Enter Valid Email'
        }
      },
      errorPlacement: function errorPlacement(error, element) {
        error.insertAfter(element);
      },
      submitHandler: function submitHandler(form, e) {
        e.preventDefault();
        var id = $('#id').val();
        var data = $("#producerEdit").serialize();
        console.log(data);
        $.ajax({
          type: "PUT",
          url: "/api/Producer/" + id,
          data: data,
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          dataType: "json",
          success: function success(data) {
            console.log(data);
            $('#editProducer').each(function () {
              $(this).modal('hide');
            });
          },
          error: function error(_error2) {
            console.log('error');
          }
        });
      }
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (producer);

/***/ }),

/***/ "./resources/js/producerModals.js":
/*!****************************************!*\
  !*** ./resources/js/producerModals.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ producerModal
/* harmony export */ });
function producerModal() {
  return "<!-- ----------------------------------------------------------PRODUCERCREATE--------------------------------------------------- -->\n    <div class=\"modal fade\" id=\"addProducer\" tabindex=\"-1\" aria-labelledby=\"addProducer\" aria-hidden=\"true\">\n        <div class=\"modal-dialog modal-lg\">\n            <div class=\"modal-content\">\n            \n                <div class=\"modal-header\">\n                    <h2>Create Producer</h2>\n                </div>\n    \n                <div class=\"modal-body\">\n            <form id=\"producerCreate\">\n                    <div class=\"form-group\">\n                        <label for=\"name\" class=\"control-label\">Name</label>\n                        <input type=\"text\" class=\"form-control\" id=\"name\" name=\"name\">\n                        <span class=\"error\"></span>\t\n                    </div>\n            \n                    <div class=\"form-group\">\n                        <label for=\"name\" class=\"control-label\">Email</label>\n                        <input type=\"text\" class=\"form-control\" id=\"email\" name=\"email\" >\n                        <span class=\"error\"></span>\t\n                    </div>\n            \n                    <div class=\"modal-footer\">\n                    <button type=\"submit\" class=\"btn\" style=\"background-color:#9dfdc7; color:#367591;\" id=\"saveProducer\" >Save</button>\n                    <button type=\"submit\" class=\"btn\" data-bs-dismiss=\"modal\">Cancel</button>\n                    </div>\n            </form>\n                </div>\n            </div>\n        </div>\n    </div>\n    <!-- ----------------------------------------------------------PRODUCEREDIT--------------------------------------------------- -->\n    <div class=\"modal fade\" id=\"editProducer\" tabindex=\"-1\" aria-labelledby=\"editProducer\" aria-hidden=\"true\">\n        <div class=\"modal-dialog modal-lg\">\n            <div class=\"modal-content\">\n            \n                <div class=\"modal-header\">\n                    <h2>Edit Producer</h2>\n                </div>\n    \n                <div class=\"modal-body\">\n            <form id=\"producerEdit\">\n                    <div class=\"form-group\">\n                        <label for=\"name\" class=\"control-label\">Name</label>\n                        <input type=\"text\" class=\"form-control producerName\" id=\"name\" name=\"name\">\n                    </div>\n            \n                    <div class=\"form-group\">\n                        <label for=\"name\" class=\"control-label\">Email</label>\n                        <input type=\"text\" class=\"form-control producerEmail\" id=\"email\" name=\"email\">\n                    </div >\n                <div class=\"modal-footer\">\n                    <button type=\"submit\" class=\"btn\" style=\"background-color:#9dfdc7; color:#367591;\" id=\"updateProducer\" >Save</button>\n                    <button type=\"submit\" class=\"btn\" data-bs-dismiss=\"modal\">Cancel</button>\n                </div>\n            </form>  \n                </div>\n            </div>\n        </div>\n    </div>";
}

/***/ }),

/***/ "./resources/js/role.js":
/*!******************************!*\
  !*** ./resources/js/role.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _roleModals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./roleModals */ "./resources/js/roleModals.js");

var role = {
  show: function show(response) {
    var title = "Roles";
    var tableContent = "\n                        <thead class=\"\">\n                            <tr>\n                            <th>ID</th>\n                            <th>name</th>\n                            <th>actor</th>\n                            <th>movie</th>\n                            <th>Edit</th>\n                            <th>Delete</th>\n                            </tr>\n                        </thead>\n                        <tbody id=\"roleBody\">\n                        </tbody>\n                    ";
    var addButton = "<button type=\"button\" class=\"btn \" data-bs-toggle=\"modal\" data-bs-target=\"#addRole\"><i class=\"fas fa-plus\"></i></button>";
    $('#tableContent').html(tableContent);
    $('#addButton').html(addButton);
    $('#title').html(title);
    response.forEach(function (element) {
      $('#roleBody').append("\n                        <tr>\n                        <td>".concat(element.id, "</td>\n                        <td>").concat(element.name, "</td>\n                        <td>").concat(element.actor_id, "</td>\n                        <td>").concat(element.movie_id, "</td>\n                        <td align='center'><i class=\"fas fa-edit\" data-bs-toggle=\"modal\" data-id=\"").concat(element.id, "\" data-bs-target=\"#editRole\"></i></td>\n                        <td align='center'><i class=\"fas fa-trash-alt roleDelete\" data-id=\"").concat(element.id, "\"></i></td>\n                \n                        </tr>\n                        "));
    });
    $("#content").append(_roleModals__WEBPACK_IMPORTED_MODULE_0__.default);
    $('#addRole').on('shown.bs.modal', function (e) {
      //ITERATE-MOVIE-MODAL
      $.ajax({
        type: "GET",
        url: "/api/Movie",
        dataType: "json",
        success: function success(data) {
          console.log(data);
          var select = $('#movie_id');
          $.each(data, function (data, result) {
            select.append('<option name=\'id\' value=\'' + result.id + ' \'>' + result.title + '</option>');
          });
        },
        error: function error(_error) {
          console.log('error');
        }
      }); //ITERATE-ACTOR-MODAL

      $.ajax({
        type: "GET",
        url: "/api/Actor",
        dataType: "json",
        success: function success(data) {
          console.log(data);
          var select = $('#actor_id');
          $.each(data, function (data, result) {
            select.append('<option name=\'id\' value=\'' + result.id + ' \'>' + result.fname + ' ' + result.lname + '</option>');
          });
        },
        error: function error(_error2) {
          console.log('error');
        }
      });
    }); //CREATE-ROLE

    $('#roleCreate').validate({
      rules: {
        movie_id: {
          required: true
        },
        producer_id: {
          required: true
        },
        name: {
          required: true,
          minlength: 5
        }
      },
      messages: {
        movie_id: {
          required: 'required'
        },
        producer_id: {
          required: 'required'
        },
        name: {
          required: 'required'
        }
      },
      errorPlacement: function errorPlacement(error, element) {
        error.insertAfter(element);
      },
      submitHandler: function submitHandler(form, e) {
        e.preventDefault();
        var data = $("#roleCreate").serialize();
        console.log(data);
        $.ajax({
          type: "post",
          url: "/api/Role",
          data: data,
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          dataType: "json",
          success: function success(data) {
            console.log(data); //clear input

            $('#roleCreate :input').each(function () {
              var input = $(this);
              input.val('');
            });
            $('#addRole').modal('hide');
            $('#roleBody').append("\n            \n                        <tr>\n                        <td>".concat(data.id, "</td>\n                        <td>").concat(data.name, "</td>\n                        <td>").concat(data.actor_id, "</td>\n                        <td>").concat(data.movie_id, "</td>\n                        <td align='center'><i class=\"fas fa-edit\" data-bs-toggle=\"modal\" data-bs-target=\"#editRole\"></i></td>\n                        <td align='center'><i class=\"fas fa-trash-alt actorDelete\" data-id=\"").concat(data.id, "\"></i></td>\n                \n                        </tr>\n                        "));
          },
          error: function error(_error3) {
            console.log('error');
          }
        });
      }
    });
    $('#editRole').on('show.bs.modal', function (e) {
      var id = $(e.relatedTarget).attr('data-id');
      console.log(id); //ITERATE-MOVIE-MODAL

      $.ajax({
        type: "GET",
        url: "/api/Movie",
        dataType: "json",
        success: function success(data) {
          console.log(data);
          var select = $('.producerMovie_id');
          $.each(data, function (data, result) {
            select.append('<option name=\'id\' value=\'' + result.id + ' \'>' + result.title + '</option>');
          });
        },
        error: function error(_error4) {
          console.log('error');
        }
      }); //ITERATE-ACTOR-MODAL

      $.ajax({
        type: "GET",
        url: "/api/Actor",
        dataType: "json",
        success: function success(data) {
          console.log(data);
          var select = $('.producerActor_id');
          $.each(data, function (data, result) {
            select.append('<option name=\'id\' value=\'' + result.id + ' \'>' + result.fname + ' ' + result.lname + '</option>');
          });
        },
        error: function error(_error5) {
          console.log('error');
        }
      });
      $('<input>').attr({
        type: 'hidden',
        id: 'id',
        name: 'id',
        value: id
      }).appendTo('#editRole');
      $.ajax({
        type: "GET",
        url: "api/Role/" + id + "/edit",
        success: function success(data) {
          console.log(data);
          $(".roleName").val(data.name);
        },
        error: function error() {
          console.log('AJAX load did not work');
          alert("error");
        }
      });
    });
    $('#roleEdit').validate({
      rules: {
        movie_id: {
          required: true
        },
        producer_id: {
          required: true
        },
        name: {
          required: true,
          minlength: 5
        }
      },
      messages: {
        movie_id: {
          required: 'required'
        },
        producer_id: {
          required: 'required'
        },
        name: {
          required: 'required'
        }
      },
      errorPlacement: function errorPlacement(error, element) {
        error.insertAfter(element);
      },
      submitHandler: function submitHandler(form, e) {
        var id = $('#id').val();
        var data = $("#roleEdit").serialize();
        console.log(data);
        $.ajax({
          type: "PUT",
          url: "/api/Role/" + id,
          data: data,
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          dataType: "json",
          success: function success(data) {
            console.log(data);
            $('#editRole').each(function () {
              $(this).modal('hide');
            });
          },
          error: function error(_error6) {
            console.log('error');
          }
        });
      }
    });
    $('#addRole').on('hidden.bs.modal', function (e) {
      $('#actor_id').empty();
      $('#movie_id').empty();
      $('#name').empty();
    });
    $('#editRole').on('hidden.bs.modal', function (e) {
      $('.producerMovie_id').empty();
      $('.producerActor_id').empty();
      $('.roleName').empty();
    }); //Delete

    $(".roleDelete").on("click", function (e) {
      var id = $(e.currentTarget).attr('data-id');
      var $tr = $(this).closest('tr');
      console.log(id);

      if (confirm("Are you sure you want to delete Role Number ".concat(id, "?"))) {
        $.ajax({
          type: "DELETE",
          url: "/api/Role/" + id,
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          dataType: "json",
          success: function success(data) {
            // console.log(data);
            $tr.remove();
          },
          error: function error(data) {
            console.log('Error:', data);
          }
        });
      }
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (role);

/***/ }),

/***/ "./resources/js/roleModals.js":
/*!************************************!*\
  !*** ./resources/js/roleModals.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ roleModal
/* harmony export */ });
function roleModal() {
  return "\n    <!-- ----------------------------------------------------------ROLECREATE--------------------------------------------------- -->\n    <div class=\"modal fade bd-example-modal-sm\" id=\"addRole\" tabindex=\"-1\" aria-labelledby=\"addRole\" aria-hidden=\"true\">\n        <div class=\"modal-dialog modal-sm\">\n            <div class=\"modal-content\">\n            \n                <div class=\"modal-header\">\n                    <h2>Create new Role</h2>\n                </div>\n    \n                <div class=\"modal-body\">\n    <form id=\"roleCreate\">\n                    <div class=\"form-group col-md-6\">\n                        <label for=\"genre\">Movie</label>\n                        <select class=\"form-control\" id=\"movie_id\" name=\"movie_id\"> \n                        \n                        </select>\n                        \n                    </div>\n    \n                    <div class=\"form-group col-md-6\">\n                        <label for=\"genre\">Actor</label>\n                        <select class=\"form-control\" id=\"actor_id\" name=\"actor_id\"> \n                        \n                        </select>\n                        \n                    </div>\n    \n                    <div class=\"form-group\">\n                    <label for=\"name\" class=\"control-label\">Name</label>\n                    <input type=\"text\" class=\"form-control\" id=\"name\" name=\"name\">\n                    </div>\n                <div class=\"modal-footer\">\n                    <button type=\"submit\" class=\"btn\" style=\"background-color:#9dfdc7; color:#367591;\" id=\"saveRole\" >Save</button>\n                    <button type=\"submit\" class=\"btn\" data-bs-dismiss=\"modal\">Cancel</button>\n                </div>\n    </form>\n                </div>\n            </div>\n        </div>\n    </div>\n    <!-- ----------------------------------------------------------ROLEEDIT--------------------------------------------------- -->\n    <div class=\"modal fade bd-example-modal-sm\" id=\"editRole\" tabindex=\"-1\" aria-labelledby=\"editRole\" aria-hidden=\"true\">\n        <div class=\"modal-dialog modal-sm\">\n            <div class=\"modal-content\">\n            \n                <div class=\"modal-header\">\n                    <h2>Edit Role</h2>\n                </div>\n    \n                <div class=\"modal-body\">\n            <form id=\"roleEdit\">\n                    <div class=\"form-group col-md-6\">\n                        <label for=\"genre\">Movie</label>\n                        <select class=\"form-control producerMovie_id\" id=\"movie_id\" name=\"movie_id\"> \n                        \n                        </select>\n                        \n                    </div>\n\n                    <div class=\"form-group col-md-6\">\n                        <label for=\"genre\">Actor</label>\n                        <select class=\"form-control producerActor_id\" id=\"actor_id\" name=\"actor_id\"> \n                        \n                        </select>\n                    </div>\n    \n                    <div class=\"form-group\">\n                    <label for=\"name\" class=\"control-label\">Name</label>\n                    <input type=\"text\" class=\"form-control roleName\" id=\"name\" name=\"name\">\n                    </div>\n            \n                <div class=\"modal-footer\">\n                    <button type=\"submit\" class=\"btn\" style=\"background-color:#9dfdc7; color:#367591;\" id=\"updateRole\" >Save</button>\n                    <button type=\"submit\" class=\"btn\" data-bs-dismiss=\"modal\">Cancel</button>\n                </div>\n            </form>   \n                </div>\n            </div>\n        </div>\n    </div>";
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./resources/js/main.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;