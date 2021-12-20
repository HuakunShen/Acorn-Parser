setup:
	npm install

build-popup: setup
	npm run build:popup

build-options: setup
	npm run build:options

build-ext: setup
	npm run build:ext

test: setup
	npm run test:unit
