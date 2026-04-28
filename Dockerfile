# 1. Базовый образ Node
FROM node:20-alpine


# 2. Рабочая директория
WORKDIR /app
COPY src/assets ./dist/assets

# 3. Копируем package.json
COPY package*.json ./

# 4. Устанавливаем зависимости
RUN npm install

# 5. Копируем весь проект
COPY . .

# 6. Собираем TypeScript
RUN npm run build

# 7. Открываем порт
EXPOSE 3001

# 8. Запуск приложения
CMD ["node", "dist/index.js"]