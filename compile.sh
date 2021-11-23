echo "Building Typescript..."
tsc --build
echo "Done..."

echo "Copying package files"
cp packages/api/package.json built/api/package.json
cp packages/client/package.json built/client/package.json
