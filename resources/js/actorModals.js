export default function actorModal(){
    return `
<!-- ----------------------------------------------------------ACTORCREATE----------------------------------------------- -->
<div class="modal fade" id="addActor" tabindex="-1" aria-labelledby="addActor" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
        
            <div class="modal-header">
                <h2>Create new actor</h2>
            </div>

            <div class="modal-body">
        <form class="actorCreate" id="actorCreate">
            <div class="form-group">
                <label for="fname" class="control-label">First Name</label>
                <input type="text" class="form-control" id="fname" name="fname" value="">
            </div>

            <div class="form-group">
                <label for="lname" class="control-label">Last name</label>
                <input type="text" class="form-control " id="lname" name="lname" value="">
            </div>

            <div class="form-group">
                <label for="note">Note</label>
                <textarea class="form-control" id="note" name="note" rows="3" value=""></textarea>
            </div>

            <div class="modal-footer">
            <button type="submit" class="btn" style="background-color:#9dfdc7; color:#367591;" id="saveActor" >Save</button>
            <button type="submit" class="btn" data-bs-dismiss="modal">Cancel</button>
            </div>
        </form>
            </div>

        </div>
    </div>
</div>
<!-- ----------------------------------------------------------ACTOREDIT--------------------------------------------------- -->
<div class="modal fade" id="editActor" tabindex="-1" aria-labelledby="editActor" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
        
            <div class="modal-header">
    
                <h2>Edit actor</h2>
            </div>

            <div class="modal-body">
        <form id="actorEdit">      
            <div class="form-group">
                <label for="fname" class="control-label">First Name</label>
                <input type="text" class="form-control actorfname" id="fname" name="fname" value="">
            </div>

            <div class="form-group">
                <label for="lname" class="control-label">Last name</label>
                <input type="text" class="form-control actorlname" id="lname" name="lname" data-id="lname" value="">
            </div>

            <div class="form-group">
                <label for="note">Note</label>
                <textarea class="form-control actornote" id="note" name="note" rows="3" value=""></textarea>
            </div>

            <div class="modal-footer">
            <button type="submit" class="btn" style="background-color:#9dfdc7; color:#367591;" id="updateActor" >Save</button>
            <button type="submit" class="btn" data-bs-dismiss="modal">Cancel</button>
            </div>
        </form>
            </div>
        </div>
    </div>
</div>`;
}

