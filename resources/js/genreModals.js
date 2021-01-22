export default function genreModal(){
    return `
    <!-- ----------------------------------------------------------GENRECREATE--------------------------------------------------- -->
    <div class="modal fade" id="addGenre" tabindex="-1" aria-labelledby="addGenre" aria-hidden="true" data-backdrop="false" data-backdrop="false">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
            
                <div class="modal-header">
                    <h2>Create Genre</h2>
                </div>
    
                    <div class="modal-body">
                <form id="genreCreate">
                        <div class="form-group">
                            <label for="name" class="control-label">Name</label>
                            <input type="text" class="form-control" id="name" name="name">
                        </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn" style="background-color:#9dfdc7; color:#367591;" id="saveGenre">Save</button>
                        <a href="" class="btn btn-default" role="button">Cancel</a>
                    </div>
                </form>
            </div>
            </div>
        </div>
    </div>
    <!-- ----------------------------------------------------------GENREEDIT--------------------------------------------------- -->
    <div class="modal fade" id="editGenre" tabindex="-1" aria-labelledby="editGenre" aria-hidden="true" data-backdrop="false">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
            
                <div class="modal-header">
                    <h2>Edit Genre</h2>
                </div>
    
                <div class="modal-body">
            <form id="genreEdit">
                    <div class="form-group">
                        <label for="name" class="control-label">Name</label>
                        <input type="text" class="form-control genreName" id="name" name="name">
                    </div>
                <div id = "modal-footer">
                    <button type="submit" class="btn" style="background-color:#9dfdc7; color:#367591;" id="updateGenre">Save</button>
                    <a href="" class="btn btn-default" role="button">Cancel</a>
                </div>
            </form> 
                </div>
            </div>
        </div>
    </div>`;
}