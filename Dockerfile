FROM node:22 AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN mkdir -p /var/app
COPY . /var/app
WORKDIR /var/app

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm prisma generate
RUN pnpm run build

FROM base
COPY --from=build /var/app /var/app

EXPOSE 3000
CMD [ "pnpm", "start" ]