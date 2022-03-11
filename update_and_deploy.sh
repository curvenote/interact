pushd common; yalc publish --private; popd

pushd demo-fourier; yalc add common; yarn install; yarn deploy; popd
pushd demo-geosci-uniform-efield; yalc add common; yarn install; yarn deploy; popd
pushd demo-ipyleaflet; yalc add common; yarn install; yarn deploy; popd
pushd demo-pandas-energy; yalc add common; yarn install; yarn deploy; popd
