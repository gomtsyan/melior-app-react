.PHONY: clean lint

JOBS ?= 2

help:
	@echo "    clean"
	@echo "        Remove Python/build artifacts."
	@echo "    run"
	@echo "        npm start - runs the server in dev mode. Listening on port 3000"
	@echo "    build"
	@echo "        Runs yurn build, creating a compiled version."
	@echo "    formatter"
	@echo "        Apply black formatting to code."
	@echo "    lint"
	@echo "        Lint code with flake8, and check if black formatter should be applied."
	@echo "    types"
	@echo "        Check for type errors using pytype."


run:
	npm start

build:
	yarn build

clean:
	rm -rf build/
	rm -rf .pytype/
	rm -rf dist/
	rm -rf docs/_build
	find . -name 'README.md.*' -exec rm -f  {} +
	find . -name '*.pyc' -exec rm -f {} +
	find . -name '*.pyo' -exec rm -f {} +
	find . -name '*~' -exec rm -f  {} +
	find . -name '__pycache__' -exec rm -r {} +
	rm -rf *egg-info
	rm -rf pip-wheel-metadata

formatter:
	prettier -w src


readme-toc:
	# https://github.com/ekalinin/github-markdown-toc
	# find . -name README.md -exec gh-md-toc --insert {} \;
	gh-md-toc --insert README.md


test: clean
	echo "Not implemented yet"

build-docker:
	./scripts/build_docker.sh

tag:
	git tag $$(cat ./package.json | grep -m 1 version | sed 's/[^0-9.]//g')
	git push --tags
