#!/bin/bash
# Sobe imagens e data.json para Netlify Blobs.
# Pré-requisito: netlify login && netlify link
# Uso: bash upload-to-netlify.sh

set -e

echo "→ Subindo imagens para blob store 'images'..."
for file in assets/*; do
  name=$(basename "$file")
  echo "  $name"
  netlify blobs:set images "$name" < "$file"
done

echo "→ Subindo data.json (com URLs de blob) para store 'data'..."
netlify blobs:set data data.json < data.netlify.json

echo "✓ Pronto. Acesse os blobs em /.netlify/blobs/images/<nome> e /.netlify/blobs/data/data.json"
