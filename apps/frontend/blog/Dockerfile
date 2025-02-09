# 1. Node.js 22.10 베이스 이미지
FROM node:22.10 AS builder

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. Yarn 2.x (Berry) 설치
RUN corepack enable && corepack prepare yarn@stable --activate

# 4. package.json 및 yarn.lock 복사
COPY package*.json ./
COPY yarn.lock ./

# 5. 의존성 설치 (yarn berry는 --frozen-lockfile 옵션을 추천)
RUN yarn install --frozen-lockfile

# 6. 소스 코드 복사
COPY . .

# 7. Next.js 애플리케이션 빌드 (SSR 지원)
RUN yarn build

# 8. 애플리케이션 실행 (production 모드)
CMD ["yarn", "run", "start"]

# 9. 컨테이너가 사용할 포트 설정 (Next.js의 기본 포트는 3000)
EXPOSE 3000
