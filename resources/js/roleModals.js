export default function roleModal(){

    return `
    <!-- ----------------------------------------------------------ROLECREATE--------------------------------------------------- -->
    <div class="modal fade bd-example-modal-sm" id="addRole" tabindex="-1" aria-labelledby="addRole" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
            
                <div class="modal-header">
                    <h2>Create new Role</h2>
                </div>
    
                <div class="modal-body">
    <form id="roleCreate">
                    <div class="form-group col-md-6">
                        <label for="genre">Movie</label>
                        <select class="form-control" id="movie_id" name="movie_id"> 
                        
                        </select>
                        
                    </div>
    
                    <div class="form-group col-md-6">
                        <label for="genre">Actor</label>
                        <select class="form-control" id="actor_id" name="actor_id"> 
                        
                        </select>
                        
                    </div>
    
                    <div class="form-group">
                    <label for="name" class="control-label">Name</label>
                    <input type="text" class="form-control" id="name" name="name">
                    </div>
                <div class="modal-footer">
                    <button type="submit" class="btn" style="background-color:#9dfdc7; color:#367591;" id="saveRole" >Save</button>
                    <button type="submit" class="btn" data-bs-dismiss="modal">Cancel</button>
                </div>
    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- ----------------------------------------------------------ROLEEDIT--------------------------------------------------- -->
    <div class="modal fade bd-example-modal-sm" id="editRole" tabindex="-1" aria-labelledby="editRole" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
            
                <div class="modal-header">
                    <h2>Edit Role</h2>
                </div>
    
                <div class="modal-body">
            <form id="roleEdit">
                    <div class="form-group col-md-6">
                        <label for="genre">Movie</label>
                        <select class="form-control producerMovie_id" id="movie_id" name="movie_id"> 
                        
                        </select>
                        
                    </div>

                    <div class="form-group col-md-6">
                        <label for="genre">Actor</label>
                        <select class="form-control producerActor_id" id="actor_id" name="actor_id"> 
                        
                        </select>
                    </div>
    
                    <div class="form-group">
                    <label for="name" class="control-label">Name</label>
                    <input type="text" class="form-control roleName" id="name" name="name">
                    </div>
            
                <div class="modal-footer">
                    <button type="submit" class="btn" style="background-color:#9dfdc7; color:#367591;" id="updateRole" >Save</button>
                    <button type="submit" class="btn" data-bs-dismiss="modal">Cancel</button>
                </div>
            </form>   
                </div>
            </div>
        </div>
    </div>`;
}