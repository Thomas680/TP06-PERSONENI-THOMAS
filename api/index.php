<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

use Tuupola\Middleware\HttpBasicAuthentication;
use \Firebase\JWT\JWT;

require __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../bootstrap.php';
 
$app = AppFactory::create();

const JWT_SECRET = "maclesupersecrete152";

function addCorsHeaders (Response $response) : Response {

    $response =  $response
    ->withHeader("Access-Control-Allow-Origin", 'http://localhost:4200')
    ->withHeader("Access-Control-Allow-Headers", 'Content-Type, Authorization')
    ->withHeader("Access-Control-Allow-Methods", 'GET, POST, PUT, PATCH, DELETE,OPTIONS')
    ->withHeader("Access-Control-Expose-Headers", "Authorization");

    return $response;
}

function decodeJWT($jwt) {
  $token = JWT::decode($jwt, JWT_SECRET, ['HS256']);
  $now = new DateTimeImmutable();

  if ($token->nbf > $now->getTimestamp() || $token->exp < $now->getTimestamp()) {
    return null;
  } else {
    return $token;
  }
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
        $response = $response = $response->withStatus(401);
        return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
    }
];

$app->post('/api/login', function (Request $request, Response $response, $args) {
  global $entityManager;

  $userRepository = $entityManager->getRepository('Utilisateur');
    $json = $request->getBody();
    $data = json_decode($json, true); // parse the JSON into an assoc. array
    if(!$data) {
      $data = [];
    }

    $username = array_key_exists('username', $data) ? $data['username'] : null;
    $password = array_key_exists('password', $data) ? $data['password'] : null;

    if(!$username || !$password) {
      $data = array('ERREUR' => 'Connexion', 'ERREUR' => '400');
      $response = $response->withStatus(400);
      $response->withHeader("Content-Type","application/json")->getBody()->write(json_encode($data));
      return $response;
    }

    $user = $userRepository->findOneBy(['username' => $username]);
    if($user == null || sha1($password) != $user->getPassword()) {{
      $data = array('ERREUR' => 'Connexion', 'ERREUR' => '400', 'ERREUR' => 'Identifiants invalide');
      $response = $response->withStatus(400);
      $response->withHeader("Content-Type","application/json")->getBody()->write(json_encode($data));
      return $response;
    }}

    $issuedAt = time();
    $expirationTime = $issuedAt + 3600;
    $payload = array(
        'id' => 1,
        'username' => $user->getUsername(),
        'iat' => $issuedAt,
        'exp' => $expirationTime
    );

    $token_jwt = JWT::encode($payload,JWT_SECRET, "HS256");
    $response = $response->withHeader("Authorization", "Bearer {$token_jwt}");
    
    return $response;
});

$app->post('/api/register', function (Request $request, Response $response, $args) {
  global $entityManager;

  $userRepository = $entityManager->getRepository('Utilisateur');

  $json = $request->getBody();
  $data = json_decode($json, true); // parse the JSON into an assoc. array
  if(!$data) {
    $data = [];
  }

  $username = array_key_exists('username', $data) ? $data['username'] : null;
  $password = array_key_exists('password', $data) ? $data['password'] : null;

  if(!$username || !$password) {
    $data = array('ERREUR' => 'Inscription', 'ERREUR' => '400');
    $response = $response->withStatus(400);
    $response->withHeader("Content-Type","application/json")->getBody()->write(json_encode($data));
    return $response;
  }

  if($userRepository->findOneBy(['username' => $username]) != null) {
    $data = array('ERREUR' => 'Inscription', 'ERREUR' => '400', 'ERREUR' => 'Identifiant deja utilise');
    $response = $response->withStatus(400);
    $response->withHeader("Content-Type","application/json")->getBody()->write(json_encode($data));
    return $response;
  }

  $user = new Utilisateur();
  $user->setUsername($username);
  $user->setPassword(sha1($password));
  $entityManager->persist($user);
  $entityManager->flush();


  $issuedAt = time();
  $expirationTime = $issuedAt + 3600;
  $payload = [
    'id' => 2,
    'username' => $username,
    'iat' => $issuedAt,
    'exp' => $expirationTime
  ];

  $token_jwt = JWT::encode($payload,JWT_SECRET, "HS256");
  $response = $response->withHeader("Authorization", "Bearer {$token_jwt}");
  $response = $response->withHeader("Content-Type", "application/json;charset=utf-8");
  
  $response->getBody()->write(json_encode($payload));

  return $response;
});

$app->get('/api/produits', function (Request $request, Response $response, $args) {
  global $entityManager;

  $produitRepository = $entityManager->getRepository('Produit');
  $produits = $produitRepository->findAll();

  $data = [];

  foreach ($produits as $p) {
      $elem = [];
      $elem["id"] = $p->getId();
      $elem["titre"] = $p->getTitre();
      $elem["description"] = $p->getDescription();
      $elem["prix"] = $p->getPrix();

      array_push($data, $elem);
  }

  $response = $response->withHeader("Content-Type", "application/json;charset=utf-8");

  $response->getBody()->write(json_encode($data));
  return addCorsHeaders($response);
});

$app->get('/api/produits/{id}', function (Request $request, Response $response, $args) {
  global $entityManager;

  $id = $args['id'];

  $produitRepository = $entityManager->getRepository('Produit');
  $p = $produitRepository->find($id);

  $data = [];
  $data["id"] = $p->getId();
  $data["titre"] = $p->getTitre();
  $data["description"] = $p->getDescription();
  $data["prix"] = $p->getPrix();

  $response = $response->withHeader("Content-Type", "application/json;charset=utf-8");

  $response->getBody()->write(json_encode($data));
  return addCorsHeaders($response);
});

$app->post('/api/account', function (Request $request, Response $response, $args) {
  global $entityManager;

  $userRepository = $entityManager->getRepository('Utilisateur');
  
  $bearer = $request->getHeaderLine("Authorization");
  $bearer = substr($bearer, 7);
  $token = decodeJWT($bearer);

  $userId = $token->id;

  $user = $userRepository->find($userId);

  $json = $request->getBody();
  $data = json_decode($json, true); // parse the JSON into an assoc. array
  if(!$data) {
    $data = [];
  }

  $username = array_key_exists('username', $data) ? $data['username'] : null;

  if($user == null || !$username) {
    $data = array('ERREUR' => 'Modification du profil', 'ERREUR' => '400');
    $response = $response->withStatus(400);
    $response->withHeader("Content-Type","application/json")->getBody()->write(json_encode($data));
    return $response;
  }

  if($userRepository->findBy(['username' => $username]) != null) {
    $data = array('ERREUR' => "Nom d'utilisateur deja utilise", 'ERREUR' => '400');
    $response = $response->withStatus(400);
    $response->withHeader("Content-Type","application/json")->getBody()->write(json_encode($data));
    return $response;
  }

  $user->setUsername($username);
  $entityManager->persist($user);
  $entityManager->flush();
  
  $response->getBody()->write(json_encode (['success' => true]));
  return $response;
});


$app->get('/api/client/{id}', function (Request $request, Response $response, $args) {
    $id = $args['id'];
    $array = [];
    $array ["username"] = "thomasp";
    
    $response->getBody()->write(json_encode ($array));
    return $response;
});

// Chargement du Middleware
$app->addErrorMiddleware(true, true, true);
$app->add(new Tuupola\Middleware\JwtAuthentication($options));
$app->run ();