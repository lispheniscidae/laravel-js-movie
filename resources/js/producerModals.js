export default function producerModal(){
    return `<!-- ----------------------------------------------------------PRODUCERCREATE--------------------------------------------------- -->
    <div class="modal fade" id="addProducer" tabindex="-1" aria-labelledby="addProducer" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
            
                <div class="modal-header">
                    <h2>Create Producer</h2>
                </div>
    
                <div class="modal-body">
            <form id="producerCreate">
                    <div class="form-group">
                        <label for="name" class="control-label">Name</label>
                        <input type="text" class="form-control" id="name" name="name">
                        <span class="error"></span>	
                    </div>
            
                    <div class="form-group">
                        <label for="name" class="control-label">Email</label>
                        <input type="text" class="form-control" id="email" name="email" >
                        <span class="error"></span>	
                    </div>
            
                    <div class="modal-footer">
                    <button type="submit" class="btn" style="background-color:#9dfdc7; color:#367591;" id="saveProducer" >Save</button>
                    <button type="submit" class="btn" data-bs-dismiss="modal">Cancel</button>
                    </div>
            </form>
                </div>
            </div>
        </div>
    </div>
    <!-- ----------------------------------------------------------PRODUCEREDIT--------------------------------------------------- -->
    <div class="modal fade" id="editProducer" tabindex="-1" aria-labelledby="editProducer" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
            
                <div class="modal-header">
                    <h2>Edit Producer</h2>
                </div>
    
                <div class="modal-body">
            <form id="producerEdit">
                    <div class="form-group">
                        <label for="name" class="control-label">Name</label>
                        <input type="text" class="form-control producerName" id="name" name="name">
                    </div>
            
                    <div class="form-group">
                        <label for="name" class="control-label">Email</label>
                        <input type="text" class="form-control producerEmail" id="email" name="email">
                    </div >
                <div class="modal-footer">
                    <button type="submit" class="btn" style="background-color:#9dfdc7; color:#367591;" id="updateProducer" >Save</button>
                    <button type="submit" class="btn" data-bs-dismiss="modal">Cancel</button>
                </div>
            </form>  
                </div>
            </div>
        </div>
    </div>`;
}