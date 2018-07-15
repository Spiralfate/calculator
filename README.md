# Страница с калькулятором с частичным функционалом инженерного.

На данный момент страница отрисовывает от 1го до 3х калькуляторов случайным образом. В проекте реализованы по крайней мере следующие паттерны:
- Фабрика: создание массива из экземпляров класса "Калькулятор"
- Синглтон: через него реализованы математические операции
- Фасад: таким образом реализуется инициализация узлов страницы и подключение наблюдателей за событиями
- Посредник: посредником является обработчик математических операций, которому сообщается строковый тип операции, а он, в свою очередь, связывается с объектом, имеющим методы этих операций

В проекте активно применены нововведения ЕС6-8, такие как:
- стрелочные функции(впрочем, не из-за их основной особенности)
- спреды
- деструктуризация
- объявление переменных через let и const
- новые методы строк и массивов(reverse и т.д.)
- объявление классов


### Для запуска перейти в корневую папку и применить команду:

```
  docker-compose up -d
```  

### Страница с калькулятором будет доступна по адресу: 

```
  http://localhost:8080/
```  
---
### Featured:
- сменяемые темы
- выстраивание последовательности арифметических действий
- дробные числа
- функционал инженерного калькулятора: логарифм, квадратный корень, возведение в степень и извлечение из степени, факториал, представляение последнего операнда процентом от результата предыдущей цепочки вычислений, стирание последнего символа, обращение последнего операнда в негативный и обратно
- оставление результата вычислений для дальнейших операций


### Known issues: 
-   не реализована респонзивность вёрстки
-   не реализована переключаемость журнала калькулятора
  
