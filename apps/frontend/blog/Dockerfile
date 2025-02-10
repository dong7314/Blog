# Base 이미지 설정
FROM node:22.10-alpine AS builder

# 작업 디렉토리 생성
WORKDIR /app

# Monorepo 전체 패키지 복사
COPY package.json yarn.lock .yarnrc.yml ./  
COPY .yarn .yarn
COPY packages/coreui packages/coreui  
COPY apps/frontend apps/frontend

# Yarn 설치 & Next.js 빌드
WORKDIR /app/apps/frontend/blog
RUN yarn install
RUN yarn run build

# 런타임 환경 설정
FROM node:22.10-alpine AS runner
WORKDIR /app

# PnP 환경을 유지하면서 실행하기 위해 필요한 파일들 복사
COPY --from=builder /app/apps/frontend/blog/.next ./.next
COPY --from=builder /app/apps/frontend/blog/public ./public
COPY --from=builder /app/apps/frontend/blog/package.json ./package.json
COPY --from=builder /app/apps/frontend/blog/.yarn ./yarn  # ✅ PnP 환경 유지
COPY --from=builder /app/apps/frontend/blog/.yarnrc.yml ./yarnrc.yml  # ✅ PnP 환경 유지
COPY --from=builder /app/packages/coreui ./packages/coreui 

# Yarn PnP 실행을 위해 환경 변수 설정
ENV YARN_ENABLE_GLOBAL_CACHE=true
ENV YARN_NODE_LINKER=pnp

# Next.js 서버 실행
CMD ["yarn", "run", "start"]
