#!/usr/bin/env bash
set -euo pipefail

SHA="${GITHUB_SHA:-local-test}"

release_dir="releases/$SHA"
current_link="current"

echo "Creating candidate release: $release_dir"

mkdir -p "$release_dir"

echo "Copying build artifact..."
cp -r team-site/dist/* "$release_dir/"

echo "Candidate release created."

echo "Running health check before switching traffic..."

HEALTH_URL="${HEALTH_URL:-http://localhost:8080/health}"

if curl --fail "$HEALTH_URL"; then
    echo "Health check passed."
else
    echo "Health check failed. Keeping current release."
    exit 1
fi


echo "Switching traffic to new release..."

ln -sfn "$release_dir" "$current_link"

echo "Deployment completed."
echo "Current release: $release_dir"