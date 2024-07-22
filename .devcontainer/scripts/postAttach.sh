#!/bin/bash

debug() { [ -n "${SCRIPTS_DEBUG}" ] && [ "${SCRIPTS_DEBUG}" != "0" ] && printf -- "\e[39m| DEBUG | $1\e[39m\n"; }
info() { printf -- "\e[92m| INFO | $1\e[39m\n"; }
warn() { printf -- "\e[93m| WARN | $1\e[39m\n"; }
error() { printf -- "\e[91m| ERROR | $1\e[39m\n"; }

debug "executing $0"

test -r ~/host/.devcontainer_rc \
&& { 
    debug "checking for ~/host/.devcontainer_rc..."
    . ~/host/.devcontainer_rc \
    && info "~/host/.devcontainer_rc sucessfully executed" \
    ||  error "~/host/.devcontainer_rc"
} \
|| {
    warn "no .devcontainer_rc file found in your home: create one to tune your configuration";
}

HOST_FILES=${HOST_FILES:-default}
debug "checking for HOST_FILES (${HOST_FILES})..."
HOST_FILES_FINAL=
for f in ${HOST_FILES}; do
    [ "${f}" = "default" ] \
        && {
            [ -z "${HISTFILE}" ] \
            && warn "HISTFILE not defined : not exported on your host ?" \
            ||  HOST_FILES_FINAL="${HOST_FILES_FINAL} ${HISTFILE#${HOME}/}"
            HOST_FILES_FINAL="${HOST_FILES_FINAL} .netrc .makerc"
        } \
        || HOST_FILES_FINAL="${HOST_FILES_FINAL} ${f}"
done
for f in ${HOST_FILES_FINAL}; do
    hostf="${HOME}/host/${f#${HOME}/}"
    [ -e ${hostf} ] \
        && {
            cd ~ && ln -s -f ${hostf} ${f} \
            && info "link for ${f} sucessfully created" \
            || error "failed to create link for ${f}"    
        } \
        || {
            warn "${f} link not created: host file (${hostf}) not found"
        }
done

! test -r ${WORKSPACE}/package.json || (cd ${WORKSPACE} && npm clean-install)

info "$0 executed"
