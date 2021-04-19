<?php

use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

date_default_timezone_set('Europe/Paris');

require_once "vendor/autoload.php";

$isDevMode = true;
$config = Setup::createYAMLMetadataConfiguration(array(__DIR__ . "/config/yaml"), $isDevMode);
$conn = array(
'host' => '127.0.0.1',
'driver' => 'pdo_mysql',
'user' => 'root',
'password' => '',
'dbname' => 'api_angular',
'port' => '3306'
);
$entityManager = EntityManager::create($conn, $config);