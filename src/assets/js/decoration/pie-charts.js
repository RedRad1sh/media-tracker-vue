/* eslint no-undef: 0 */
export function init(Chart) {
    function createPieChart(elementName, header, keys, values) {
        const ctx = document.getElementById(elementName);

        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: keys,
                datasets: [{
                    data: values,
                    borderWidth: 1
                }],
                options: {
                    maintainAspectRatio: false,
                }
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: header,
                        font: {
                            family: 'sans-serif',
                            size: 24
                        },
                        color: 'white' // Изменение цвета текста заголовка
                    },
                    legend: {
                        padding: "20",
                        position: 'right',
                        labels: {
                            font: {
                                size: 14
                            },
                            color: 'white' // Изменение цвета текста легенды
                        }
                    }
                }
            }
        });
    }

    window.addEventListener('load', function () {
        createPieChart('contentChart', 'Просмотренный контент',
            ['Фильмы', 'Книги', 'Игры'],
            [19, 12, 3]);
        createPieChart('kinoChart', 'Фильмы',
            ['Комедия', 'Боевик', 'Фантастика', 'Драма', 'Триллер', 'Ужасы', 'Приключения', 'Мультфильм'],
            [7, 10, 23, 15, 8, 5, 12, 9]);
        createPieChart('booksChart', 'Книги',
            ['Детектив', 'Фэнтези', 'Ужасы', 'Роман', 'Классика', 'Приключения', 'Научная литература', 'Биография'],
            [19, 12, 3, 8, 15, 6, 10, 5]);
        createPieChart('gameChart', 'Игры',
            ['Шутер', 'Симулятор', 'Стратегия', 'Rogue-like', 'Платформер', 'Гонки', 'Ролевая', 'Аркада'],
            [19, 12, 3, 2, 8, 6, 15, 5]);
    })
}