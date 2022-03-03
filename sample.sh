#!/bin/bash

curl -X POST -H "Content-Type: application/json" -d '{ "firstName":"Elijah", "lastName":"Daniel", "email":"elijahdanie@gmail.com", "password":"elijahdanie" }' http://localhost:3213/user/register