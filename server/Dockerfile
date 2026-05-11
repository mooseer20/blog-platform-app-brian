FROM php:8.2-fpm-alpine

# Install system dependencies and PHP extensions for Postgres, Mongo, Redis
RUN apk add --no-cache libpq-dev autoconf gcc g++ make zlib-dev \
    && docker-php-ext-install pdo pdo_pgsql \
    && pecl install mongodb redis \
    && docker-php-ext-enable mongodb redis

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
COPY . .
RUN chown -R www-data:www-data /var/www/html