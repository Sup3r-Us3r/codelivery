#!/bin/bash

if [ ! -f ".env" ]; then
  cp .env.local.example .env.local
fi

npm install

npm run dev
