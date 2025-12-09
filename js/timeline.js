document.addEventListener('DOMContentLoaded', function () {
    const timeline = document.getElementById('philosophy-timeline');
    const modal = document.getElementById('timeline-modal');
    const modalBody = document.getElementById('timeline-modal-body');
    const closeModal = document.querySelector('.timeline-modal-close');
    const overlay = modal;
    const showAllBtn = document.getElementById('show-all-timeline');

    const allEvents = [
        
        { year: -585, title: "Фалес предсказывает затмение", short: "Первый философ и основатель милетской школы.", full: { context: "Греция, VI в. до н.э. — переход от мифа к логосу.", before: "Мифологическое мышление (Гесиод, Гомер).", event: "Фалес объясняет природу без богов: «Всё есть вода».", after: "Рождение натурфилософии.", influence: "Положил начало рациональному мышлению и науке." }, philosopher: "Фалес", quote: "«Всё есть вода»", era: 'antiquity' },
        { year: -470, title: "Рождение Сократа", short: "Основатель классической философии.", full: { context: "Афины в эпоху расцвета демократии.", before: "Софисты: «Человек — мера всех вещей».", event: "Сократ: «Познай самого себя».", after: "Создание диалектики и метода «майевтики».", influence: "Философия стала поиском истины, а не красноречием." }, philosopher: "Сократ", quote: "«Я знаю, что ничего не знаю»", era: 'antiquity' },
        { year: -387, title: "Основание Академии", short: "Первая высшая философская школа.", full: { context: "После казни Сократа.", before: "Кризис афинской демократии.", event: "Платон: «Да не войдёт сюда никто, кто не знает геометрии».", after: "Развитие теории идей.", influence: "Заложил основы западной метафизики." }, philosopher: "Платон", quote: "«Пока не станешь философом...»", era: 'antiquity' },
        { year: -335, title: "Основание Лицея", short: "Школа Аристотеля в Афинах.", full: { context: "Эпоха эллинизма.", before: "Платонизм как парадигма.", event: "Аристотель систематизирует знания.", after: "Создание первой энциклопедии.", influence: "Стал основой науки и логики на 2000 лет." }, philosopher: "Аристотель", quote: "«Человек — существо политическое»", era: 'antiquity' },
        { year: -300, title: "Основание стоицизма", short: "Зенон основывает школу в Стоа.", full: { context: "Эллинистический период.", before: "Поиск устойчивости в хаотичном мире.", event: "«Живи в согласии с природой».", after: "Этика как путь к внутреннему спокойствию.", influence: "Влияние на христианство и современную психологию." }, philosopher: "Зенон", quote: "«Живи в согласии с природой»", era: 'antiquity' },
        { year: -270, title: "Основание эпикуреизма", short: "Эпикур создаёт «Сад».", full: { context: "Страх смерти и богов.", before: "Культ страдания и аскезы.", event: "Атараксия — душевное спокойствие.", after: "Учение о дружбе и умеренности.", influence: "Подготовил почву для гуманизма." }, philosopher: "Эпикур", quote: "«Смерть не имеет к нам отношения»", era: 'antiquity' },

        
        { year: 410, title: "«О граде Божьем»", short: "Августин объясняет падение Рима.", full: { context: "Крах Римской империи.", before: "Языческие объяснения истории.", event: "Два града — земной и божий.", after: "Христианская философия истории.", influence: "Сформировал средневековое мировоззрение." }, philosopher: "Августин", quote: "«Ты создал нас для Себя...»", era: 'medieval' },
        { year: 1274, title: "Смерть Фомы Аквинского", short: "Завершена «Сумма теологии».", full: { context: "Расцвет университетов.", before: "Конфликт веры и разума.", event: "Синтез Аристотеля и христианства.", after: "Схоластика — официальная философия.", influence: "Основал неотомизм, повлиял до XX века." }, philosopher: "Фома Аквинский", quote: "«Чудо — не нарушение природы...»", era: 'medieval' },

        
        { year: 1486, title: "«Речь о достоинстве человека»", short: "Пико: человек — творец себя.", full: { context: "Эпоха Возрождения.", before: "Средневековое самоуничижение.", event: "«Ты творец самого себя».", after: "Гуманизм как философия личности.", influence: "Подготовил Реформацию и Просвещение." }, philosopher: "Пико", quote: "«Ты творец самого себя»", era: 'renaissance' },
        { year: 1517, title: "Реформация Лютера", short: "Вызов авторитету Церкви.", full: { context: "Церковные злоупотребления.", before: "Схоластика и индульгенции.", event: "95 тезисов против продажи отпущения грехов.", after: "Раскол христианства.", influence: "Подготовила почву для гуманизма и Просвещения." }, philosopher: "Лютер", quote: "«Свобода христианина...»", era: 'renaissance' },

       
        { year: 1637, title: "«Рассуждение о методе»", short: "Декарт: «Я мыслю — следовательно, существую».", full: { context: "Научная революция.", before: "Аристотель как авторитет.", event: "Метод сомнения и рационализм.", after: "Основание аналитической геометрии.", influence: "Начало современной философии." }, philosopher: "Декарт", quote: "«Я мыслю — следовательно, существую»", era: 'modern' },
        { year: 1776, title: "«Исследование о природе и причинах богатства народов»", short: "Адам Смит — основатель экономической науки.", full: { context: "Эпоха Просвещения.", before: "Меркантилизм и государственный контроль.", event: "«Невидимая рука рынка».", after: "Рождение классической политэкономии.", influence: "Основа либеральной экономики." }, philosopher: "Адам Смит", quote: "«Не из благожелательности...»", era: 'modern' },
        { year: 1781, title: "«Критика чистого разума»", short: "Кант революционизирует теорию познания.", full: { context: "Спор рационалистов и эмпириков.", before: "Декарт vs Локк.", event: "«Мир конструируется разумом».", after: "Критическая философия.", influence: "Основа немецкого идеализма." }, philosopher: "Кант", quote: "«Две вещи наполняют душу...»", era: 'modern' },
        { year: 1815, title: "Конгресс в Вене", short: "Завершение Наполеоновских войн.", full: { context: "Европа после революций.", before: "Идеи Просвещения.", event: "Меттерних подавляет либерализм.", after: "Рост романтизма и критики разума.", influence: "Гегель: «Философия — это своё время...»" }, philosopher: "Меттерних, Гегель", quote: "«Философия — это своё время...»", era: 'modern' },
        { year: 1848, title: "«Манифест Коммунистической партии»", short: "Маркс и Энгельс — критика капитализма.", full: { context: "Промышленная революция.", before: "Утопический социализм.", event: "«Пролетарии всех стран, соединяйтесь!»", after: "Исторический материализм.", influence: "Основа социалистических революций XX века." }, philosopher: "Маркс", quote: "«Философы лишь по-разному объясняли мир...»", era: 'modern' },
        { year: 1883, title: "Смерть Ницше", short: "Завершение эпохи радикального переосмысления.", full: { context: "Кризис христианства и морали.", before: "«Бог мёртв» — провозглашено в 1882.", event: "Идея сверхчеловека и воли к власти.", after: "Влияние на психоанализ и экзистенциализм.", influence: "Предтеча постмодернизма." }, philosopher: "Ницше", quote: "«Бог мёртв — и мы убили его»", era: 'contemporary' },

       
        { year: 1914, title: "Начало Первой мировой войны", short: "Кризис веры в прогресс.", full: { context: "Империализм и милитаризм.", before: "Оптимизм XIX века.", event: "Массовое убийство и разрушение иллюзий.", after: "Рост иррационализма и экзистенциализма.", influence: "Шпенглер: «Закат Европы»." }, philosopher: "Шпенглер", quote: "«Миропонимание XIX века рухнуло»", era: 'contemporary' },
        { year: 1922, title: "«Логико-философский трактат»", short: "Витгенштейн: философия языка.", full: { context: "Кризис метафизики.", before: "Традиционная философия как бессмыслица.", event: "«О чём нельзя говорить, о том следует молчать».", after: "Аналитическая философия.", influence: "Основал философию языка." }, philosopher: "Витгенштейн", quote: "«О чём нельзя говорить...»", era: 'contemporary' },
        { year: 1927, title: "«Бытие и время»", short: "Хайдеггер анализирует экзистенцию.", full: { context: "Кризис гуманизма.", before: "Традиционная метафизика.", event: "«Брошенность», «забота», «конечность».", after: "Фундаментальная онтология.", influence: "Основа экзистенциализма и постмодерна." }, philosopher: "Хайдеггер", quote: "«Человек — пастырь бытия»", era: 'contemporary' },
        { year: 1939, title: "Начало Второй мировой войны", short: "Холокост и кризис гуманизма.", full: { context: "Подъём тоталитаризма.", before: "Неудача Версальского мира.", event: "Холокост, атомная бомба.", after: "Философия как ответ на «банальность зла».", influence: "Сартр: «Человек обречён быть свободным»." }, philosopher: "Арендт, Сартр", quote: "«Тот, кто молчит...»", era: 'contemporary' },
        { year: 1943, title: "«Бытие и ничто»", short: "Сартр: свобода в абсурдном мире.", full: { context: "Оккупация Парижа.", before: "Детерминизм и психоанализ.", event: "«Существование предшествует сущности».", after: "Философия ответственности.", influence: "Стал основой экзистенциальной этики." }, philosopher: "Сартр", quote: "«Существование предшествует сущности»", era: 'contemporary' },
        { year: 1951, title: "«Происхождение тоталитаризма»", short: "Арендт анализирует Холокост.", full: { context: "Послевоенный мир.", before: "Зло как исключительное.", event: "«Банальность зла» — преступник как бюрократ.", after: "Новая этика ответственности.", influence: "Основала политическую философию XX века." }, philosopher: "Арендт", quote: "«Тот, кто молчит...»", era: 'contemporary' },
        { year: 1966, title: "«Структура научных революций»", short: "Кун: наука через парадигмы.", full: { context: "Эпоха космических технологий.", before: "Наука как накопление фактов.", event: "«Нормальная наука решает головоломки».", after: "Парадигмальные сдвиги.", influence: "Подорвал веру в объективность науки." }, philosopher: "Кун", quote: "«Нормальная наука решает головоломки»", era: 'contemporary' },
        { year: 1971, title: "«Теория справедливости»", short: "Ролз: справедливость как честная игра.", full: { context: "Эпоха прав человека.", before: "Утилитаризм и либертарианство.", event: "«Принципы справедливости» за завесой неведения.", after: "Неолиберализм и политическая философия.", influence: "Возрождение нормативной теории." }, philosopher: "Ролз", quote: "«Справедливость — первая добродетель...»", era: 'contemporary' },
        { year: 1975, title: "«Надзирать и наказывать»", short: "Фуко: власть через дисциплину.", full: { context: "Постструктурализм.", before: "Традиционное понимание власти.", event: "Паноптикон как модель современного общества.", after: "Биополитика и критика институтов.", influence: "Основа критической теории власти." }, philosopher: "Фуко", quote: "«Власть — не то, что имеют...»", era: 'contemporary' },
        { year: 1999, title: "Цифровая эпоха", short: "Философия технологий и ИИ.", full: { context: "Эра интернета и алгоритмов.", before: "Антропоцентризм и гуманизм.", event: "Вопрос: «Может ли машина думать?»", after: "Этика ИИ и постгуманизм.", influence: "Новая онтология цифровой реальности." }, philosopher: "Современные мыслители", quote: "«Машина думает?»", era: 'contemporary' },
        { year: 2008, title: "«Антропоцен»", short: "Философия экологии.", full: { context: "Климатический кризис.", before: "Антропоцентризм.", event: "Человек как геологическая сила.", after: "Критика антропоцентризма.", influence: "Новая этика ответственности за Землю." }, philosopher: "Латур", quote: "«Мы никогда не были современными»", era: 'contemporary' }
    ];

    let visibleCount = 8;
    let isExpanded = false;

    function renderTimeline(count) {
        timeline.innerHTML = '';
        const slice = allEvents.slice(0, count);
        slice.forEach(ev => {
            const displayYear = ev.year > 0 ? `${ev.year} н.э.` : `${-ev.year} до н.э.`;
            const imgName = ev.philosopher.toLowerCase()
                .replace(/\s+/g, '_')
                .replace(/[^a-zа-яё_]/g, '');
            const imgSrc = `img/${imgName}.jpg`;

            const item = document.createElement('div');
            item.className = `timeline-item ${ev.era}`;
            item.innerHTML = `
                <div class="timeline-icon">📌</div>
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <span class="timeline-year">${displayYear}</span>
                    <h3>${ev.title}</h3>
                    <p>${ev.short}</p>
                    <div class="timeline-philosopher">${ev.philosopher}</div>
                    <button class="timeline-detail-btn">Подробнее</button>
                </div>
            `;

            const btn = item.querySelector('.timeline-detail-btn');
            if (btn) {
                btn.addEventListener('click', () => openEventModal(ev));
            }

            timeline.appendChild(item);
        });

        
        if (count >= allEvents.length && !isExpanded) {
            showAllBtn.textContent = 'Скрыть события';
            showAllBtn.classList.add('active');
            isExpanded = true;
        } else if (count < allEvents.length && isExpanded) {
            showAllBtn.textContent = 'Показать все события';
            showAllBtn.classList.remove('active');
            isExpanded = false;
        }
    }

    function openEventModal(event) {
        let imgName = event.philosopher.toLowerCase()
            .replace(/\s+/g, '_')
            .replace(/[^a-zа-яё_]/g, '');
        const imgPath = `img/${imgName}.jpg`;
        const imgFallback = event.philosopher.charAt(0).toUpperCase();

        const full = event.full;

        modalBody.innerHTML = `
            <div class="modal-timeline-header">
                <div class="modal-philosopher-img">${imgFallback}</div>
                <div>
                    <h2>${event.title}</h2>
                    <p class="modal-year">${event.year > 0 ? `${event.year} н.э.` : `${-event.year} до н.э.`}</p>
                    <p class="modal-philosopher">${event.philosopher}</p>
                </div>
            </div>
            <blockquote class="modal-quote">${event.quote}</blockquote>
            <div class="modal-full-content">
                <h3>Контекст</h3><p>${full.context}</p>
                <h3>До события</h3><p>${full.before}</p>
                <h3>Событие</h3><p><strong>${full.event}</strong></p>
                <h3>После события</h3><p>${full.after}</p>
                <h3>Влияние</h3><p>${full.influence}</p>
            </div>
        `;

        modal.style.display = 'flex';
    }

    function closeModalHandler() {
        modal.style.display = 'none';
    }

    
    [closeModal, overlay].forEach(el => {
        el.addEventListener('click', closeModalHandler);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModalHandler();
    });

    
    showAllBtn.addEventListener('click', () => {
        if (!isExpanded) {
            visibleCount = allEvents.length;
        } else {
            visibleCount = 8;
        }
        renderTimeline(visibleCount);
    });

    
    renderTimeline(visibleCount);
});