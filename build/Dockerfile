FROM --platform=$TARGETPLATFORM harbor.daocloud.cn/hp/nginx:1.17.2-alpine AS build
ARG TARGETPLATFORM
ARG BUILDPLATFORM
ENV TZ=Asia/Shanghai LANG=en_US.UTF-8 LANGUAGE=en_US.UTF-8 LC_ALL=en_US.UTF-8
COPY build/nginx.conf /etc/nginx/nginx.conf
COPY dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
