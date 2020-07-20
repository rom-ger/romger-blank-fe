# README

Болванка для проектов frontend завернутых в spring-boot и spring-cloud

Перед началом работы нужно, поправить название группы и артефакт id в pom.xml ,
пакет, там где нужно поправить расставлены Todo.

Свойства из файла application.yml с префиксом "ws.options"
будут при сборке вставлены, как строковые переменные в "assets/js/config.js"

например:

ws.options.WS_GLOBAL_IP=http://localhost:8080

будет добавлено как:

var WS_GLOBAL_IP="http://localhost:8080";

так как приложение будет может быть запущено не только по адресу <server>:8080/
но и <server>:8080/api/service-name, можно указать base-href

ws.options.basePath=/api/service-name

Эта настройка будет помещена в index.html в виде тэга \<base href="/api/service-name"\>
на место плейсхолдера "<!-- #base_href# -->"

## Настройка линтинга и автоматического форматирования кода в VS Code

- Устанавливаем расширения для VS Code:
  - Stylelint
  - ESLint
  - TSLint
  - Prettier
- В конфигурационный файл VS Code `settings.json` вносим следующие параметры:

        "css.validate": false,
        "less.validate": false,
        "scss.validate": false,
        "prettier.stylelintIntegration": true,
        "eslint.enable": true,
        "eslint.options": {
            "configFile": ".eslintrc.json"
        },
        "eslint.autoFixOnSave": false,
        "prettier.eslintIntegration": true,
        "tslint.enable": true,
        "tslint.configFile": "tslint.json",
        "tslint.autoFixOnSave": false,
        "prettier.tslintIntegration": true,
        "editor.formatOnSave": true

Линтинг и автоформатирование выполняется в соответствии с правилами для линтеров, описанными в конфигурационных файлах в директории проекта.
