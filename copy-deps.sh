echo "Copying Common"

rm -r packages/api/common_lib
rm -r packages/client/common_lib

cp -r packages/common packages/api/common_lib/
cp -r packages/common packages/client/common_lib/