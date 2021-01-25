	export default function authModal(){
    return `
    
<!-------------------------------------- LOGIN-MODAL --------------------------- -->
<div id="loginModal" class="modal fade">
	<div class="modal-dialog modal-login">
		<div class="modal-content">
			<div class="modal-header">				
				<h4 class="modal-title">LOGIN</h4>
				<button type="button" class="btn close" data-bs-dismiss="modal" aria-hidden="true">&times;</button>
			</div>
			<div class="modal-body">
				<form id="loginForm">
					<div class="form-group">
						<i class="fa fa-user"></i>
						<input type="email" class="form-control" id="lemail" name="email" placeholder="Email">
					</div>
					<div class="form-group">
						<i class="fa fa-lock"></i>
						<input type="password" class="form-control" id="lpassword" name="password" placeholder="Password">					
					</div>
					<div class="form-group">
						<input type="submit" class="btn btn-lg" id="loginBtn" value="Login">
					</div>
				</form>
			</div>
		</div>
	</div>
</div>     
    
<!-------------------------------------- REGISTER-MODAL ----------------------------->
<div id="registerModal" class="modal fade">
	<div class="modal-dialog modal-login">
		<div class="modal-content">
			<div class="modal-header">				
				<h4 class="modal-title">REGISTER</h4>
				<button type="button" class="btn close" data-bs-dismiss="modal" aria-hidden="true">&times;</button>
			</div>
			<div class="modal-body">
				<form id="registerForm">
					<div class="form-group">
						<i class="fa fa-user"></i>
						<input type="text" class="form-control" id="name" name="name" placeholder="Name" >
                    </div>
                    <div class="form-group">
						<i class="fa fa-user"></i>
						<input type="email" class="form-control" id="email" name="email" placeholder="Email">
					</div>
					<div class="form-group">
						<i class="fa fa-lock"></i>
						<input type="password" class="form-control" id="password" name="password" placeholder="Password">					
					</div>
					<div class="form-group">
						<input type="submit" class="btn btn-lg" id="registerBtn" value="Register">
					</div>
				</form>
			</div>
			
		</div>
	</div>
</div>     



    `;

}

