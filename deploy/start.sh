#!/bin/sh

mysqld & 
sleep 5
cd /app/dist/dist/server/
node server.mjs