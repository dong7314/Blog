# Base 이미지 설정(빌드 단계)
FROM node:22.10-alpine AS builder
WORKDIR /app

# Monorepo 전체 패키지 복사(workspace 정상적으로 복사되도록)
COPY package.json yarn.lock .yarnrc.yml ./  
COPY .yarn .yarn
COPY packages packages
COPY apps/frontend apps/frontend

# Yarn Berry & workspace 설정
WORKDIR /app/apps/frontend/blog
RUN yarn install
RUN NODE_OPTIONS=--max_old_space_size=2048 yarn run build

# 런타임 컨테이너 설정(실행 전용)
FROM node:22.10-alpine AS runner
WORKDIR /app

# 'package.json' 전체 복사(workspace 정보 유지)
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/.yarnrc.yml ./.yarnrc.yml
COPY --from=builder /app/.yarn ./.yarn

# 전체 packages 복사
COPY --from=builder /app/packages ./packages

# 'apps/frontend/blog' 복사
COPY --from=builder /app/apps/frontend/blog ./apps/frontend/blog

# Next 실행을 위해 설치 진행
WORKDIR /app/apps/frontend/blog
RUN yarn install

# Next.js 실행
CMD ["yarn", "run", "start"]