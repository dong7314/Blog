# Base 이미지 설정(빌드 단계)
FROM node:22.10-alpine AS builder
WORKDIR /app

# 빌드 필수 패키지 설치
RUN apk add --no-cache python3 make g++ alpine-sdk

# Monorepo 전체 패키지 복사
COPY package.json yarn.lock .yarnrc.yml ./  
COPY .yarn .yarn
COPY apps/backend apps/backend

# 의존성 설치 & bcrypt 재설치
RUN yarn install --check-cache
RUN yarn backend remove bcrypt && yarn backend add bcrypt

# 백엔드 빌드
WORKDIR /app/apps/backend/blog
RUN NODE_OPTIONS=--max_old_space_size=2048 yarn run build

# 런타임 컨테이너 설정(실행 전용)
FROM node:22.10-alpine AS runner
WORKDIR /app

# 패키지 파일 복사
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/.yarnrc.yml ./.yarnrc.yml
COPY --from=builder /app/.yarn ./.yarn

# 빌드된 백엔드 애플리케이션 복사
COPY --from=builder /app/apps/backend/blog ./apps/backend/blog

# 실행을 위해 다시 설치
WORKDIR /app/apps/backend/blog
RUN yarn install --check-cache

# 서버 실행
CMD ["yarn", "run", "start"]
