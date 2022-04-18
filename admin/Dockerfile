FROM nginx:1.16.0-alpine
COPY ./build /usr/share/nginx/html/build
RUN rm /etc/nginx/conf.d/default.conf
COPY ./admin.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]  
