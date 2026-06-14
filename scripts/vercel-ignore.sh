#!/bin/bash

if [ "$VERCEL_GIT_COMMIT_REF" = "main" ] || [ "$VERCEL_GIT_COMMIT_REF" = "deploy/preview" ]; then
  echo "Building branch: $VERCEL_GIT_COMMIT_REF"
  exit 1
else
  echo "Skipping branch: $VERCEL_GIT_COMMIT_REF"
  exit 0
fi