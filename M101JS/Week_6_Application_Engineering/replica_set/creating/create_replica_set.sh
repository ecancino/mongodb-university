#!/usr/bin/env bash

mkdir -p /var/lib/mongo/rs1 /var/lib/mongo/rs2 /var/lib/mongo/rs3
mkdir -p /var/lib/mongo/logs
mongod --replSet m101 --logpath "/var/lib/mongo/logs/rs1.log" --dbpath /var/lib/mongo/rs1 --port 27017 --oplogSize 64 --fork --smallfiles
mongod --replSet m101 --logpath "/var/lib/mongo/logs/rs2.log" --dbpath /var/lib/mongo/rs2 --port 27018 --oplogSize 64 --smallfiles --fork
mongod --replSet m101 --logpath "/var/lib/mongo/logs/rs3.log" --dbpath /var/lib/mongo/rs3 --port 27019 --oplogSize 64 --smallfiles --fork
