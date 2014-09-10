angular.module('selfboss.controllers', [])


.controller('AppCtrl', function($scope, $ionicModal, $timeout, $location, $ionicSlideBoxDelegate) {
   
   $scope.logado    = false; 
   $scope.naologado = true; 
   
   $scope.nextSlide = function() {
    $ionicSlideBoxDelegate.next();
  }
   
    $scope.previousSlide = function() {
    $ionicSlideBoxDelegate.previous();
  }
   
   
  $scope.login = function() {
  	 $scope.form_nome     = 'Login'; 
	 $scope.form_login    = true;  
	 $scope.form_esqueci  = false;  
	 $scope.form_cadastro = false;  
     $scope.modal.show();
  };
   	
 $scope.senha = function() {
	 $scope.form_nome     = 'Esqueci a senha'; 
	 $scope.form_login    = false;  
	 $scope.form_esqueci  = true;  
	 $scope.form_cadastro = false;  
  };
	
  $scope.cadastro = function() {
	 $scope.form_nome     = 'Cadastro'; 
 	 $scope.form_login    = false;  
	 $scope.form_esqueci  = false;  
	 $scope.form_cadastro = true;  
     $scope.modal.show();
  };	
	
	
	
	
	  $scope.sair = function() {
  	 alert('saiu');
     };
	
	
	
 	
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
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
    console.log('Doing login', $scope.loginData);
	
	$scope.logado    = true; 
	$scope.naologado = false; 
	

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
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