FROM docker.io/library/node:22.7.0-bookworm@sha256:54b7a9a6bb4ebfb623b5163581426b83f0ab39292e4df2c808ace95ab4cba94f

LABEL "org.opencontainers.image.description"="Kitten Analysts Backend"

EXPOSE 7780
EXPOSE 9091
EXPOSE 9093

WORKDIR /opt
COPY "node_modules" "node_modules"
COPY "packages/kitten-analysts/package.json" "package.json"
COPY "packages/kitten-analysts/output" "output"

CMD [ "/bin/bash", "-c", "node output/entrypoint-backend.js" ]