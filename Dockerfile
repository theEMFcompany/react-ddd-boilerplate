ARG image=node:10.14.2
ARG build_env=production
FROM $image as builder

WORKDIR /build

COPY package.json ./
COPY yarn.lock ./

RUN echo "[INSTALLING DEPENDENCIES USING]"
RUN yarn install --development

RUN echo "[BUILDING APP USING] BUILD_ENV]"

COPY . .
RUN yarn run build; yarn run bundle

FROM $image

ENV BUILD_ENV=$build_env
ENV DEBIAN_FRONTEND noninteractive

RUN yarn global add pm2

ENV APP_HOME /app
WORKDIR ${APP_HOME}

COPY package.json ./
COPY yarn.* ./

RUN yarn install

COPY . .

RUN rm -rf ./src ./helpers

COPY --from=builder /build/static ${APP_HOME}/static

EXPOSE 8080

CMD [ "/app/scripts/docker/entrypoint.sh" ]
