angular.module('selfboss.controllers', [])
 
 .controller('LoginCtrl', function($scope, $ionicModal, $cookies, $http, $timeout, $location,$state, auth) {



  
$scope.cadastroSalvar = function() {
	
	$scope.enviando              = true;
	var dados = $('#formcadastro').serialize();
 			
	$http({
        method  : 'POST',
 	    url     : 'http://ec2-54-94-136-137.sa-east-1.compute.amazonaws.com/cadastro/salvar',  
         data    : dados,  
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
    })
        .success(function(data) {
			
             if (!data.sucesso) {
				    $scope.enviando                  = false;
 					$scope.errorNome                 = data.errors.nome;
 					$scope.errorCelular              = data.errors.celular;
 					$scope.errorEmail                = data.errors.email;
					$scope.errorEmail1               = data.errors.email1;
 					$scope.errorUsuario              = data.errors.usuario;
					$scope.errorSenha                = data.errors.senha;
    			    $scope.retorno_error             = data.retorno_error; 
					 
                   
			 } else {
				    $scope.enviando                  = false;
				 
					$scope.errorNome                 = '';
 					$scope.errorCelular              = '';
 					$scope.errorEmail                = '';
					$scope.errorEmail1               = '';
 					$scope.errorUsuario              = '';
					$scope.errorSenha                = '';
					
 					$scope.retorno          = data.retorno;
					$scope.retorno_error    = data.retorno_error;
					$scope.retorno_mensagem = data.retorno_mensagem;
					
 					 
 				 }
        }); 
}	 
	 
 $scope.esqueci_senha = function() {
	
	$scope.enviando_gerar  = true;
 	
	var dados = $('#form1').serialize();	
  
 	$http({
        method  : 'POST',
	     url     : 'http://ec2-54-94-136-137.sa-east-1.compute.amazonaws.com/home/recupera',  
         data    : dados,  
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
    })
  	
        .success(function(data) {
              if (!data.sucesso) {
			        $scope.enviando_gerar   = false;
 				    $scope.retorno_esqueci_senha          = data.retorno_esqueci_senha;
					$scope.errorUsuario2                   = data.errors.usuario;
					$scope.retorno_esqueci_senha_error    = data.retorno_esqueci_senha_error;
 					 
 			 } else {
				    $scope.enviando_gerar   = false;
 				    $scope.retorno_esqueci_senha          = data.retorno_esqueci_senha;
					$scope.retorno_esqueci_senha_error    = '';
					$scope.errorUsuario2     = '';
  					 
  				 }
        }); 
}	 
	 
	 
  
   
  $scope.login = function() {
	   
  	 $scope.enviando_login    = false;  
	 $scope.form_nome         = 'Login'; 
	 $scope.form_login        = true;  
	 $scope.form_esqueci      = false;  
	 $scope.form_cadastro     = false;  
     $scope.modal.show();
  };
   	
 $scope.senha = function() {
	 $scope.form_nome     = 'Esqueci a senha'; 
	 $scope.form_login    = false;  
	 $scope.form_esqueci  = true;  
	 $scope.form_cadastro = false;  
	 $scope.enviando_gerar = false;
	 
  };
	
  $scope.cadastro = function() {
	 $scope.form_nome     = 'Cadastro'; 
 	 $scope.form_login    = false;  
	 $scope.form_esqueci  = false;  
	 $scope.form_cadastro = true;  
     $scope.modal.show();
  };	
	
	  

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/modals/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
	 
  };

  // Open the login modal
 

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
 
	
	$scope.enviando_login  = true;
	
 	var dados = $.param({ 
	            usuario:  $("input:text[name='usuario']").val(),
				senha:    $("input:password[name='senha']").val(),			 
   			});	
			   
			   
 			   
 	 $http({
        method  : 'POST',  
        url     : 'http://ec2-54-94-136-137.sa-east-1.compute.amazonaws.com/home/login',  
        data    : dados,  
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
    })
        .success(function(data) {
			
             if (!data.sucesso) {
				 
				    $scope.enviando_login        = false;
					$scope.errorUsuario          = data.errors.usuario;
					$scope.errorSenha            = data.errors.senha;
    				$scope.retorno_error_login   = data.retorno_error_login; 
 					
 			 } else {  
			        $cookies.logado = true;
 					$cookies.session_cd_cliente = data.session_cd_cliente;
					$cookies.session_nome = data.session_nome;
					$cookies.session_usuario = data.session_usuario;
					$cookies.session_status = data.session_status;
					$cookies.session_email = data.session_email;;
					$cookies.session_emp_secreto = data.session_emp_secreto;
					$cookies.session_plano = data.session_plano;
 					$cookies.session_produto_usuario = data.session_produto_usuario;
					$cookies.session_produto_captador = data.session_produto_captador;
					$cookies.session_produto_profissional = data.session_produto_profissional; 
					 
 	   
					$timeout(function() {
					  $scope.closeLogin();
					  $state.go('app.home');
					}, 500);
  				 }
        }); 
  
  
  };
})

.controller('AppCtrl', function($scope, $state, $ionicModal, $cookieStore, $cookies, $http, $timeout, $location, $ionicSlideBoxDelegate, auth) {
  
   auth.checkStatus();
   
   //dados
   $scope.session_cd_cliente = $cookies.session_cd_cliente;
   $scope.session_usuario = $cookies.session_usuario;
   $scope.session_nome = $cookies.session_nome;
   
   
   $scope.nextSlide = function() {
    $ionicSlideBoxDelegate.next();
  }
   
    $scope.previousSlide = function() {
    $ionicSlideBoxDelegate.previous();
  }
    
    $scope.logout = function() {
  		$cookieStore.remove("logado");
		$cookieStore.remove("session_cd_cliente");
		$cookieStore.remove("session_nome");
		$cookieStore.remove("session_usuario");
		$cookieStore.remove("session_status");
		$cookieStore.remove("session_email");
		$cookieStore.remove("session_emp_secreto");
		$cookieStore.remove("session_plano");
		$cookieStore.remove("session_produto_usuario");
		$cookieStore.remove("session_produto_captador");
		$cookieStore.remove("session_produto_profissional");
		$state.go('login');
   };
   
   
    
})

.controller('homeCtrl', function($scope) {
  
  $scope.nome = "Oreia de Taioba :D";
  
 })
 
 

.controller('profissionaisCtrl', function($scope,$state) {
	//$state.go('login');
	
	/*setTimeout(function() {
        $state.go('login', {});
      },3000);*/
	 
  $scope.registros = [
	{ nome: 'Joao Arnaldo', cidade: 'Vitoria - ES', Profissao: 'Pedreiro', foto: 'img/homem.jpg', id: 1 },
	{ nome: 'Joao Arnaldo', cidade: 'Vitoria - ES', Profissao: 'Pedreiro', foto: 'img/homem.jpg', id: 2 },
	{ nome: 'Joao Arnaldo', cidade: 'Vitoria - ES', Profissao: 'Pedreiro', foto: 'img/homem.jpg', id: 3 },
	{ nome: 'Joao Arnaldo', cidade: 'Vitoria - ES', Profissao: 'Pedreiro', foto: 'img/homem.jpg', id: 4 },
	{ nome: 'Joao Arnaldo', cidade: 'Vitoria - ES', Profissao: 'Pedreiro', foto: 'img/homem.jpg', id: 5 },
	{ nome: 'Joao Arnaldo', cidade: 'Vitoria - ES', Profissao: 'Pedreiro', foto: 'img/homem.jpg', id: 6 },
	{ nome: 'Joao Arnaldo', cidade: 'Vitoria - ES', Profissao: 'Pedreiro', foto: 'img/homem.jpg', id: 7 },
	{ nome: 'Joao Arnaldo', cidade: 'Vitoria - ES', Profissao: 'Pedreiro', foto: 'img/homem.jpg', id: 8 },
	{ nome: 'Joao Arnaldo', cidade: 'Vitoria - ES', Profissao: 'Pedreiro', foto: 'img/homem.jpg', id: 9 },
	{ nome: 'Joao Arnaldo', cidade: 'Vitoria - ES', Profissao: 'Pedreiro', foto: 'img/homem.jpg', id: 10 },
	{ nome: 'Joao Arnaldo', cidade: 'Vitoria - ES', Profissao: 'Pedreiro', foto: 'img/homem.jpg', id: 11 },
   ];
   
})

.controller('profissionalCtrl', function($scope, $stateParams) {
})

.controller('dadosCtrl', function($scope, $stateParams) {
})

.controller('orcamentosCtrl', function($scope, $stateParams) {
})

.controller('depoimentosCtrl', function($scope, $stateParams) {
})

.controller('mensagensCtrl', function($scope, $stateParams) {
})


.controller('servicosCtrl', function($scope, $stateParams) {
})

.controller('buscarCtrl', function($scope, $stateParams) {
})


.controller('suporteCtrl', function($scope, $stateParams) {
})


.controller('MapCtrl', function($scope, $ionicLoading) {
 
  $scope.mapCreated = function(map) {
    $scope.map = map;
  };





  $scope.centerOnMe = function () {
	 
	 console.log("Centering");
    if (!$scope.map) {
      return;
    }
	
	
	 $scope.loading = $ionicLoading.show({
      content: 'Carregando sua localizacao ...',
      showBackdrop: false
    });
	
	
	
	 navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos);
	  
	   $scope.myLatlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
 		 
		$scope.mapOptions = {
          center: $scope.myLatlng,
          zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
  		  
        //var map = new google.maps.Map($element[0], mapOptions);
        $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
		$scope.marker = new google.maps.Marker(
		
		
		{
          position: $scope.myLatlng,
          map: $scope.map,
          title: 'Hello World!'
         } 
		 
		 
		 
		 
		 );
	   
	   
      $scope.loading.hide();
	  
	  
	  
	  
	   }, function (error) {
       alert('Nao foi possível encontrar localizacao: ' + error.message);
    });
	  
	  
	  /*
     
 

    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos);
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $scope.loading.hide();
    }, function (error) {
       alert('Nao foi possível encontrar localizacao: ' + error.message);
    });
  */};
  
  
  
  
  
  
  
  
  
  
});