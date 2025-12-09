document.addEventListener('DOMContentLoaded', function () {
    const feedback = document.getElementById('game-feedback');

    // список пар
    const pairs = [
        
        { a: 'noumenon', b: 'phenomenon', nameA: 'Ноумен', nameB: 'Феномен' },
        { a: 'substance', b: 'accident', nameA: 'Субстанция', nameB: 'Акциденция' },
        { a: 'essence', b: 'existence', nameA: 'Сущность', nameB: 'Существование' },
        { a: 'potentiality', b: 'actuality', nameA: 'Потенция', nameB: 'Актуальность' },
        { a: 'transcendence', b: 'immanence', nameA: 'Трансцендентность', nameB: 'Имманентность' },
        { a: 'unity', b: 'multiplicity', nameA: 'Единство', nameB: 'Многообразие' },
        { a: 'being', b: 'nothingness', nameA: 'Бытие', nameB: 'Ничто' },

        
        { a: 'subjectivity', b: 'objectivity', nameA: 'Субъективность', nameB: 'Объективность' },
        { a: 'a_priori', b: 'a_posteriori', nameA: 'Априори', nameB: 'Апостериори' },
        { a: 'rationalism', b: 'empiricism', nameA: 'Рационализм', nameB: 'Эмпиризм' },
        { a: 'certainty', b: 'skepticism', nameA: 'Достоверность', nameB: 'Скептицизм' },
        { a: 'truth', b: 'falsehood', nameA: 'Истина', nameB: 'Ложь' },
        { a: 'knowledge', b: 'ignorance', nameA: 'Знание', nameB: 'Невежество' },

        
        { a: 'freedom', b: 'determination', nameA: 'Свобода', nameB: 'Детерминация' },
        { a: 'autonomy', b: 'heteronomy', nameA: 'Автономия', nameB: 'Гетерономия' },
        { a: 'subject', b: 'object', nameA: 'Субъект', nameB: 'Объект' },
        { a: 'individual', b: 'collective', nameA: 'Индивид', nameB: 'Коллектив' },
        { a: 'authenticity', b: 'inauthenticity', nameA: 'Подлинность', nameB: 'Неподлинность' },

        
        { a: 'good', b: 'evil', nameA: 'Добро', nameB: 'Зло' },
        { a: 'virtue', b: 'vice', nameA: 'Добродетель', nameB: 'Порок' },
        { a: 'duty', b: 'inclination', nameA: 'Долг', nameB: 'Склонность' },
        { a: 'altruism', b: 'egoism', nameA: 'Альтруизм', nameB: 'Эгоизм' },
        { a: 'justice', b: 'injustice', nameA: 'Справедливость', nameB: 'Несправедливость' },

        
        { a: 'sense', b: 'reference', nameA: 'Смысл', nameB: 'Референт' },
        { a: 'signifier', b: 'signified', nameA: 'Означающее', nameB: 'Означаемое' },
        { a: 'analytic', b: 'synthetic', nameA: 'Аналитическое', nameB: 'Синтетическое' },
        { a: 'necessary', b: 'contingent', nameA: 'Необходимое', nameB: 'Случайное' },

        
        { a: 'beauty', b: 'ugliness', nameA: 'Красота', nameB: 'Уродство' },
        { a: 'sublime', b: 'trivial', nameA: 'Возвышенное', nameB: 'Тривиальное' }
    ];

    let currentPairs = [];

    // ненерация случайных пар
    function generateRandomPairs() {
        const shuffled = [...pairs].sort(() => 0.5 - Math.random());
        currentPairs = shuffled.slice(0, 4); 
        renderGame();
    }

    function renderGame() {
        const source = document.querySelector('.concepts-source');
        const target = document.querySelector('.concepts-target');

        source.innerHTML = '<h3>Понятия</h3>';
        target.innerHTML = '<h3>Противоположности</h3>';

      
        const leftItems = [];
        const rightItems = [];

        currentPairs.forEach(pair => {
           
            const item = document.createElement('div');
            item.className = 'draggable-item';
            item.dataset.concept = pair.a;
            item.textContent = pair.nameA;
            leftItems.push(item);

            
            const zone = document.createElement('div');
            zone.className = 'drop-zone';
            zone.dataset.accepts = pair.a;
            zone.textContent = pair.nameB;
            rightItems.push(zone);
        });

       
        const shuffledRight = [...rightItems].sort(() => Math.random() - 0.5);

        
        leftItems.forEach(item => source.appendChild(item));
        shuffledRight.forEach(zone => target.appendChild(zone));

       
        initDragDrop();
    }

    function initDragDrop() {
        let draggedItem = null;

        document.querySelectorAll('.draggable-item').forEach(item => {
            item.setAttribute('draggable', true);

            item.addEventListener('dragstart', (e) => {
                draggedItem = item;
                e.dataTransfer.setData('text/plain', item.dataset.concept);
                item.style.opacity = '0.5';
            });

            item.addEventListener('dragend', () => {
                item.style.opacity = '1';
            });

            // Touch support
            item.addEventListener('touchstart', (e) => {
                draggedItem = item;
                item.style.opacity = '0.5';
                e.preventDefault();
            });

            item.addEventListener('touchend', () => {
                item.style.opacity = '1';
            });
        });

        document.querySelectorAll('.drop-zone').forEach(zone => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                zone.classList.add('highlight');
            });

            zone.addEventListener('dragleave', () => {
                zone.classList.remove('highlight');
            });

            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('highlight');

                if (!draggedItem) return;

                const required = zone.dataset.accepts;
                const actual = draggedItem.dataset.concept;

                if (required === actual) {
                    zone.textContent = draggedItem.textContent + ' ↔ ' + zone.textContent;
                    zone.classList.add('correct');
                    draggedItem.style.display = 'none';
                    feedback.textContent = '✅ Верно!';
                    feedback.style.color = '#2ecc71';

                    
                    if (Array.from(document.querySelectorAll('.draggable-item')).every(el => el.style.display === 'none')) {
                        setTimeout(() => {
                            feedback.textContent = '🎉 Все пары собраны!';
                            feedback.style.color = '#e74c3c';
                            setTimeout(() => {
                                feedback.textContent = '';
                                generateRandomPairs(); 
                            }, 2000);
                        }, 1000);
                    }
                } else {
                    feedback.textContent = '❌ Попробуйте ещё.';
                    feedback.style.color = '#e74c3c';
                    setTimeout(() => {
                        feedback.textContent = '';
                    }, 1500);
                }
            });

            // Touch drop
            zone.addEventListener('touchmove', (e) => {
                if (!draggedItem) return;
                const rect = zone.getBoundingClientRect();
                const x = e.touches[0].clientX;
                const y = e.touches[0].clientY;
                if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                    zone.classList.add('highlight');
                } else {
                    zone.classList.remove('highlight');
                }
            });

            zone.addEventListener('touchend', (e) => {
                if (!draggedItem) return;
                const rect = zone.getBoundingClientRect();
                const x = e.changedTouches[0].clientX;
                const y = e.changedTouches[0].clientY;
                zone.classList.remove('highlight');

                if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                    const required = zone.dataset.accepts;
                    const actual = draggedItem.dataset.concept;
                    if (required === actual) {
                        zone.textContent = draggedItem.textContent + ' ↔ ' + zone.textContent;
                        zone.classList.add('correct');
                        draggedItem.style.display = 'none';
                        feedback.textContent = '✅ Верно!';
                        feedback.style.color = '#2ecc71';

                        if (Array.from(document.querySelectorAll('.draggable-item')).every(el => el.style.display === 'none')) {
                            setTimeout(() => {
                                feedback.textContent = '🎉 Все пары собраны!';
                                feedback.style.color = '#e74c3c';
                                setTimeout(() => {
                                    feedback.textContent = '';
                                    generateRandomPairs();
                                }, 2000);
                            }, 1000);
                        }
                    } else {
                        feedback.textContent = '❌ Попробуйте ещё.';
                        feedback.style.color = '#e74c3c';
                        setTimeout(() => { feedback.textContent = ''; }, 1500);
                    }
                }
            });
        });
    }

    
    generateRandomPairs();

    
    const refreshBtn = document.createElement('button');
    refreshBtn.textContent = 'Обновить игру';
    refreshBtn.addEventListener('click', generateRandomPairs);
    document.querySelector('.opposites-game').appendChild(refreshBtn);
});