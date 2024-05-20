#!/bin/sh

mysqld & 
sleep 5
cd /app/.output/server/
node index.mjs