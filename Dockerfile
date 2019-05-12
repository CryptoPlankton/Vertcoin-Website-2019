FROM kyma/docker-nginx
COPY public/ /var/www/
EXPOSE 80
CMD 'nginx'
RUN chmod -R 755 /var/www