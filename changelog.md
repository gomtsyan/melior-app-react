# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

For a list of changes from github commits [changelog-maker](https://github.com/nodejs/changelog-maker)
can be used.

## \[0.1.1\] - 2021-06-21

### Added

- Made the `Analytics API URI` configurable via the env.var `REACT_APP_API_BASE_URI`
- Configured the Analytics API via `constants.js`
- Two dockerfiles for the time being one for local development another for AKS deployment
- Makefile to simplify common ops
- Scripts to build docker files picking the version from the package.json
- This changelog
