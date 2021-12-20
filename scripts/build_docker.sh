#!/usr/bin/env bash

say() {
 echo "$@" | sed \
         -e "s/\(\(@\(red\|green\|yellow\|blue\|magenta\|cyan\|white\|reset\|b\|u\)\)\+\)[[]\{2\}\(.*\)[]]\{2\}/\1\4@reset/g" \
         -e "s/@red/$(tput setaf 1)/g" \
         -e "s/@green/$(tput setaf 2)/g" \
         -e "s/@yellow/$(tput setaf 3)/g" \
         -e "s/@blue/$(tput setaf 4)/g" \
         -e "s/@magenta/$(tput setaf 5)/g" \
         -e "s/@cyan/$(tput setaf 6)/g" \
         -e "s/@white/$(tput setaf 7)/g" \
         -e "s/@reset/$(tput sgr0)/g" \
         -e "s/@b/$(tput bold)/g" \
         -e "s/@u/$(tput sgr 0 1)/g"
}


PACKAGE_VERSION=$(cat ./package.json | grep -m 1 version | sed 's/[^0-9.]//g')


say @blue[["Using version $PACKAGE_VERSION"]]

{
    docker build --rm \
        -t registry.melior.ai/analytics-dashboard:$PACKAGE_VERSION \
        -t registry.melior.ai/analytics-dashboard:latest \
        -f Dockerfile .

} || {
  say @red[["Couldn't build Docker knext-analytics-dashboard image... exiting"]];
  exit 1;
}