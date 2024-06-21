# Use a imagem oficial do nginx
FROM nginx:latest

# Copie os arquivos da aplicação para o diretório padrão do nginx
COPY . /usr/share/nginx/html

# Exponha a porta 80
EXPOSE 80