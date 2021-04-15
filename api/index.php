<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

use Tuupola\Middleware\HttpBasicAuthentication;
use \Firebase\JWT\JWT;

require __DIR__ . '/../vendor/autoload.php';
 
$app = AppFactory::create();

const JWT_SECRET = "maclesupersecrete152";

function addCorsHeaders (Response $response) : Response {

    $response =  $response
    ->withHeader("Access-Control-Allow-Origin", 'http://localhost')
    ->withHeader("Access-Control-Allow-Headers" ,'Content-Type, Authorization')
    ->withHeader("Access-Control-Allow-Methods", 'GET, POST, PUT, PATCH, DELETE,OPTIONS')
    ->withHeader ("Access-Control-Expose-Headers" , "Authorization");

    return $response;
}


// Middleware de validation du Jwt
$options = [
    "attribute" => "token",
    "header" => "Authorization",
    "regexp" => "/Bearer\s+(.*)$/i",
    "secure" => false,
    "algorithm" => ["HS256"],
    "secret" => JWT_SECRET,
    "path" => ["/api"],
    "ignore" => ["/api/login","/api/register"],
    "error" => function ($response, $arguments) {
        $data = array('ERREUR' => 'Connexion', 'ERREUR' => 'JWT Non valide');
        $response = $response->withStatus(401);
        return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
    }
];

$app->post('/api/login', function (Request $request, Response $response, $args) {
    $json = $request->getBody();
    $data = json_decode($json, true); // parse the JSON into an assoc. array
    if(!$data) {
      $data = [];
    }

    $username = array_key_exists('username', $data) ? $data['username'] : null;
    $password = array_key_exists('password', $data) ? $data['password'] : null;

    if(!$username || !$password) {
      $data = array('ERREUR' => 'Connexion', 'ERREUR' => '400');
      $response->withStatus(400);
      $response->withHeader("Content-Type","application/json")->getBody()->write(json_encode($data));
      return $response;
    }

    $issuedAt = time();
    $expirationTime = $issuedAt + 3600;
    $payload = array(
        'id' => 1,
        'email' => "thomas.personeni0@gmail.com",
        'username' => "thomasp",
        'iat' => $issuedAt,
        'exp' => $expirationTime
    );

    $token_jwt = JWT::encode($payload,JWT_SECRET, "HS256");
    $response = $response->withHeader("Authorization", "Bearer {$token_jwt}");
    
    return $response;
});

$app->post('/api/register', function (Request $request, Response $response, $args) {
  $json = $request->getBody();
  $data = json_decode($json, true); // parse the JSON into an assoc. array
  if(!$data) {
    $data = [];
  }

  $username = array_key_exists('username', $data) ? $data['username'] : null;
  $password = array_key_exists('password', $data) ? $data['password'] : null;
  $email = array_key_exists('email', $data) ? $data['email'] : null;

  if(!$username || !$password || !$email) {
    $data = array('ERREUR' => 'Inscription', 'ERREUR' => '400');
    $response->withStatus(400);
    $response->withHeader("Content-Type","application/json")->getBody()->write(json_encode($data));
    return $response;
  }

  $issuedAt = time();
  $expirationTime = $issuedAt + 3600;
  $payload = [
    'id' => 2,
    'username' => $username,
    'email' => $email,
    'iat' => $issuedAt,
    'exp' => $expirationTime
  ];

  $token_jwt = JWT::encode($payload,JWT_SECRET, "HS256");
  $response = $response->withHeader("Authorization", "Bearer {$token_jwt}");
  $response = $response->withHeader("Content-Type", "application/json;charset=utf-8");
  
  $response->getBody()->write(json_encode($payload));

  return $response;
});


$app->get('/api/catalogue', function (Request $request, Response $response, $args) {
    $flux = '[
	  {
		"id": 1,
		"name": "chocolat blanc",
		"price": 2
	  },
	  {
		"id": 2,
		"name": "paquet de 4 kitkat",
		"price": 4
	  },
	  {
		"id": 3,
		"name": "dragibus",
		"price": 2
	  },
	  {
		"id": 4,

		"name": "maltesers",
		"price": 200
	  },
	  {
		"id": 5,
		"name": "chips",
		"price": 40
	  },
    ]';
    
    $response = $response
    ->withHeader("Content-Type", "application/json;charset=utf-8");
    
    $response->getBody()->write($flux);
    return $response;
});


$app->get('/api/client/{id}', function (Request $request, Response $response, $args) {
    $array = [];
    $array ["username"] = "thomasp";
    
    $response->getBody()->write(json_encode ($array));
    return $response;
});

// Chargement du Middleware
$app->addErrorMiddleware(true, true, true);
$app->add(new Tuupola\Middleware\JwtAuthentication($options));
$app->run ();