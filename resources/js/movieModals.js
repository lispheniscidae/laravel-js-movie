export default function movieModal(){
    return `<!-- ---------------------------------------MOVIECREATE-------------------------------------- -->
    <div class="modal fade" id="addMovie" tabindex="-1" aria-labelledby="addMovie" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
        
            <div class="modal-header d-flex justify-content-center">
            <h2>Create Movie</h2>
            </div>

            <div class="modal-body">
            <form id = "movieCreate">
                <div class="form-group">
                    <label for="Title" class="control-label">Title</label>
                    <input type="text" class="form-control" id="title" name="title" value="">
                    
                </div>

                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea class="form-control" id="description" name="description" rows="3" value=""></textarea>
                
                </div>

                <div class="form-group col-md-6">
                    <div class="md-form  md-outline input-with-post-icon datepicker">
                        <label for="Release">Release</label>
                        <input type="date" id="release" class="form-control" name="release" value="" >
                    </div>
                </div>

                <div class="form-group col-md-6">
                    <label for="genre">Genre</label>
                    <select class="form-control" id="genre_id" name="genre_id"> 
                    
                    </select>
                    
                </div>

                <div class="form-group col-md-6">
                <label for="producer">Producer</label>
                    <select class="form-control" id="producer_id" name="producer_id"> 
                    
                    </select>
                    
                </div>
                

                
            </div>

            <div class="modal-footer">
                <button type="submit" class="btn" style="background-color:#9dfdc7; color:#367591;" id="saveMovie">Save</button>
                <button type="submit" class="btn" data-bs-dismiss="modal">Cancel</button>
            </div>
</form>
        </div>
    </div>
</div>


<!-- ---------------------------------------------------MOVIEEDIT------------------------------------------------- -->

<div class="modal fade" id="editMovie" tabindex="-1" aria-labelledby="editMovie" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
        
        <div class="modal-header d-flex justify-content-center">
            <h2>Edit Movie</h2>
            </div>

            <div class="modal-body">
            <form id = "movieEdit">
                <div class="form-group">
                    <label for="Title" class="control-label">Title</label>
                    <input type="text" class="form-control movieTitle" id="title" name="title" value="">
                    
                </div>

                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea class="form-control movieDescription" id="description" name="description" rows="3" value=""></textarea>
                
                </div>

                <div class="form-group col-md-6">
                    <div class="md-form  md-outline input-with-post-icon datepicker">
                        <label for="Release">Release</label>
                        <input placeholder="Select date" type="date" id="release" class="form-control movieRelease" name="release" value="" data-date-format="yyyy-mm-dd">
                    
                    </div>
                </div>

                <div class="form-group col-md-6">
                    <label for="genre">Genre</label>
                    <select class="form-control movieGenre_id" id="genre_id" name="genre_id"> 
                    
                    </select>
                    
                </div>

                <div class="form-group col-md-6">
                <label for="producer">Producer</label>
                    <select class="form-control movieProducer_id" id="producer_id" name="producer_id"> 
                    
                    </select>
                    
                </div>
                

            <div class="modal-footer">
                <button type="submit" class="btn" style="background-color:#9dfdc7; color:#367591;" id="updateMovie" >Save</button>
                <button type="submit" class="btn" data-bs-dismiss="modal">Cancel</button>
            </div>
            </form>
            </div>
        </div>
    </div>
</div>`;
}