#!/bin/bash

curl -i -X POST -H "Content-Type: application/json" -d '{"username":"elijah", "email":"elijahdanie@gmail.com", "password":"elijahdanie", "settings":"{}"}' http://localhost:3000/user/register
