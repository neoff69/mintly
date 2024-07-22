FROM docker.io/ytison/rust-solana-js-devcontainer:latest

# switch to root
USER root

# change default user to be host user name
ARG  HOST_USER
ARG  HOST_HOME
ARG  HOST_SHELL

ENV  DEFAULT_USER=dev

RUN  usermod --login ${HOST_USER} --home ${HOST_HOME} --move-home --shell ${HOST_SHELL} ${DEFAULT_USER} \
     && groupmod --new-name ${HOST_USER} ${DEFAULT_USER}                                                \
     && usermod --groups root ${HOST_USER}
ENV  DEFAULT_USER=${HOST_USER}

# Add sudo rights without password for this user
RUN usermod -aG sudo ${HOST_USER} \
     && echo "${HOST_USER} ALL=(ALL:ALL) NOPASSWD: ALL" >> /etc/sudoers


# back to default user
USER ${DEFAULT_USER}

# copy scripts
COPY ./scripts/ /usr/local/scripts/

# add here VSCode go modules required by your project 
# RUN go install honnef.co/go/tools/cmd/staticcheck@2023.1.6 \
#      && go clean -cache && go clean -modcache

# ensure we sleep forever otherwise dev container will exit upon creation
CMD [ "sleep", "infinity" ]