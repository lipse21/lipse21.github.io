document.addEventListener('DOMContentLoaded', function () {
    const grid = document.getElementById('philosophers-grid');
    const searchInput = document.getElementById('philosopher-search');
    const showMoreBtn = document.getElementById('show-more-btn');
    const showLessBtn = document.getElementById('show-less-btn');
    const modal = document.getElementById('modal-overlay');
    const modalBody = document.getElementById('modal-body');
    const worksModal = document.getElementById('works-modal');
    const bookModal = document.getElementById('book-modal');
    const worksList = document.getElementById('works-list');
    const worksTitle = document.getElementById('works-title');
    const bookContent = document.getElementById('book-content');

    const philosophers = [
        { id: 'socrates', name: 'Сократ', years: '470–399 до н.э.', img: 'img/socrates.jpg', bio: 'Древнегреческий философ, основатель классической философии. Не писал трактатов — его учение сохранилось в диалогах Платона. Известен методом «майевтики» и принципом «Познай самого себя».', quote: '«Я знаю, что ничего не знаю»' },
        { id: 'plato', name: 'Платон', years: '428–347 до н.э.', img: 'img/plato.jpg', bio: 'Ученик Сократа, основатель Академии. Автор теории идей и диалога «Государство». Считал, что истинная реальность — в мире вечных форм.', quote: '«Мы можем легко простить ребенка, который боится темноты...»' },
        { id: 'aristotle', name: 'Аристотель', years: '384–322 до н.э.', img: 'img/aristotle.jpg', bio: 'Ученик Платона, основатель Лицея. Систематизировал логику, этику, политику. Автор логики как науки.', quote: '«Мы есть то, что мы постоянно делаем...»' },
        { id: 'epicurus', name: 'Эпикур', years: '341–270 до н.э.', img: 'img/epicurus.jpg', bio: 'Основатель эпикуреизма. Учил, что высшее благо — атараксия (душевное спокойствие).', quote: '«Смерть не имеет к нам отношения»' },
        { id: 'seneca', name: 'Сенека', years: '4 до н.э. – 65 н.э.', img: 'img/seneca.jpg', bio: 'Римский стоик, драматург и политик. Учил, что мудрец непоколебим даже в бедствиях.', quote: '«Живи так, как будто сегодня последний день твоей жизни»' },
        { id: 'augustine', name: 'Августин', years: '354–430', img: 'img/augustine.jpg', bio: 'Отец латинской церкви, чьи труды заложили основы христианской философии.', quote: '«Ты создал нас для Себя...»' },
        { id: 'aquinas', name: 'Фома Аквинский', years: '1225–1274', img: 'img/aquinas.jpg', bio: 'Средневековый теолог, соединивший Аристотеля и христианство.', quote: '«Чудо — не нарушение природы...»' },
        { id: 'anselm', name: 'Ансельм Кентерберийский', years: '1033–1109', img: 'img/anselm.jpg', bio: 'Сформулировал онтологическое доказательство существования Бога.', quote: '«Вера ищет понимания»' },
        { id: 'erasmus', name: 'Эразм Роттердамский', years: '1466–1536', img: 'img/erasmus.jpg', bio: 'Гуманист эпохи Возрождения, автор «Похвалы глупости».', quote: '«Главное — не то, что знаешь...»' },
        { id: 'more', name: 'Томас Мор', years: '1478–1535', img: 'img/more.jpg', bio: 'Автор утопического романа «Утопия». Казнён за отказ признать короля главой церкви.', quote: '«В Утопии нет бедных...»' },
        { id: 'bruno', name: 'Джордано Бруно', years: '1548–1600', img: 'img/bruno.jpg', bio: 'Натурфилософ, сожжён за ересь. Учил о бесконечности Вселенной.', quote: '«Мы живём в бесконечном мире...»' },
        { id: 'descartes', name: 'Рене Декарт', years: '1596–1650', img: 'img/descartes.jpg', bio: 'Основатель рационализма. Ввёл метод сомнения и формулу «Cogito, ergo sum».', quote: '«Мыслю, следовательно, существую»' },
        { id: 'spinoza', name: 'Бенедикт Спиноза', years: '1632–1677', img: 'img/spinoza.jpg', bio: 'Монист. Утверждал: «Бог и Природа — одно и то же».', quote: '«Свободный человек о смерти...»' },
        { id: 'locke', name: 'Джон Локк', years: '1632–1704', img: 'img/locke.jpg', bio: 'Основатель эмпиризма. Утверждал, что разум — «чистая доска».', quote: '«Нет ничего в разуме...»' },
        { id: 'kant', name: 'Иммануил Кант', years: '1724–1804', img: 'img/kant.jpg', bio: 'Автор критической философии и категорического императива.', quote: '«Две вещи наполняют душу...»' },
        { id: 'hume', name: 'Дэвид Юм', years: '1711–1776', img: 'img/hume.jpg', bio: 'Скептик и эмпирик. Критиковал причинность и индукцию.', quote: '«Разум — раб страстей»' },
        { id: 'schopenhauer', name: 'Артур Шопенгауэр', years: '1788–1860', img: 'img/schopenhauer.jpg', bio: 'Иррационалист. Учил: «Мир — моя воля и представление».', quote: '«Мир есть мое представление»' },
        { id: 'nietzsche', name: 'Фридрих Ницше', years: '1844–1900', img: 'img/nietzsche.jpg', bio: 'Провозгласил «смерть Бога» и идею сверхчеловека.', quote: '«То, что не убивает меня...»' },
        { id: 'marx', name: 'Карл Маркс', years: '1818–1883', img: 'img/marx.jpg', bio: 'Автор исторического материализма и критики капитализма.', quote: '«Философы лишь по-разному объясняли мир...»' },
        { id: 'wittgenstein', name: 'Людвиг Витгенштейн', years: '1889–1951', img: 'img/wittgenstein.jpg', bio: 'Основатель аналитической философии. «О чём нельзя говорить...»', quote: '«Границы моего языка...»' },
        { id: 'sartre', name: 'Жан-Поль Сартр', years: '1905–1980', img: 'img/sartre.jpg', bio: 'Экзистенциалист. Утверждал: «Существование предшествует сущности».', quote: '«Ад — это другие»' }
    ];

    const worksData = {
        socrates: {
            type: 'none',
            reason: 'Сократ не оставил письменных трудов. Он считал, что живой диалог важнее мёртвых букв.',
            teaches: 'Через метод «майевтики» («повивального искусства») он помогал собеседникам рождать истину. Учил: «Познай самого себя» и «Неучастие в поиске истины — смерть для души».'
        },
        plato: [
            { id: 'republic', title: 'Государство', desc: 'Идеальное общество, где власть принадлежит философам. Через аллегорию пещеры показывает, как большинство путает тени с реальностью.', img: 'img/book_republic.jpg' },
            { id: 'symposium', title: 'Пир', desc: 'Шесть речей о природе любви. Особенно знаменита речь Сократа, передающая учение Диотимы.', img: 'img/book_symposium.jpg' },
            { id: 'apology', title: 'Апология Сократа', desc: 'Защитительная речь Сократа на суде, переданная Платоном.', img: 'img/book_apology.jpg' }
        ],
        aristotle: [
            { id: 'ethics', title: 'Никомахова этика', desc: 'Учение о добродетели как золотой середине. Храбрость — между трусостью и безрассудством.', img: 'img/book_ethics.jpg' },
            { id: 'politics', title: 'Политика', desc: 'Анализ форм правления и идея, что цель политики — развитие добродетели граждан.', img: 'img/book_politics.jpg' },
            { id: 'metaphysics', title: 'Метафизика', desc: 'Исследование первых принципов и причин бытия.', img: 'img/book_metaphysics.jpg' }
        ],
        epicurus: [
            { id: 'letter', title: 'Письмо к Менекею', desc: 'Краткое изложение этики эпикуреизма: стремление к атараксии и умеренности.', img: 'img/book_letter.jpg' }
        ],
        seneca: [
            { id: 'letters', title: 'Письма Луцилию', desc: '124 письма о стоической этике, добродетели и душевном спокойствии.', img: 'img/book_letters.jpg' },
            { id: 'on-anger', title: 'О гневе', desc: 'Анализ гнева как разрушительной страсти и пути к его преодолению.', img: 'img/book_on_anger.jpg' }
        ],
        augustine: [
            { id: 'confessions', title: 'Исповедь', desc: 'Автобиографическое размышление о поиске Бога и природе времени.', img: 'img/book_confessions.jpg' },
            { id: 'god', title: 'О граде Божьем', desc: 'Противопоставление «града земного» и «града Божьего» как двух путей человечества.', img: 'img/book_god.jpg' }
        ],
        aquinas: [
            { id: 'summa', title: 'Сумма теологии', desc: 'Синтез Аристотеля и христианства. Пять путей доказательства Бога.', img: 'img/book_summa.jpg' }
        ],
        anselm: [
            { id: 'proslogion', title: 'Прологион', desc: 'Формулировка онтологического доказательства: «Бог — то, больше чего нельзя помыслить».', img: 'img/book_proslogion.jpg' }
        ],
        erasmus: [
            { id: 'praise', title: 'Похвала глупости', desc: 'Сатирическое размышление о роли глупости в человеческой жизни и обществе.', img: 'img/book_praise.jpg' }
        ],
        more: [
            { id: 'utopia', title: 'Утопия', desc: 'Описание идеального общества без частной собственности, основанного на разуме и равенстве.', img: 'img/book_utopia.jpg' }
        ],
        bruno: [
            { id: 'ashes', title: 'О пепле и пепелице', desc: 'Космологические размышления о бесконечности Вселенной и множественности миров.', img: 'img/book_ashes.jpg' }
        ],
        descartes: [
            { id: 'meditations', title: 'Размышления о первой философии', desc: 'От радикального сомнения к выводу: «Cogito, ergo sum».', img: 'img/book_meditations.jpg' },
            { id: 'discourse', title: 'Рассуждение о методе', desc: 'Четыре правила познания и рождение аналитической геометрии.', img: 'img/book_discourse.jpg' }
        ],
        spinoza: [
            { id: 'ethics', title: 'Этика', desc: 'Геометрический метод изложения учения: «Бог и Природа — одно и то же».', img: 'img/book_spinoza_ethics.jpg' }
        ],
        locke: [
            { id: 'essay', title: 'Опыт о человеческом разумении', desc: 'Разум — «чистая доска». Все идеи происходят из опыта.', img: 'img/book_essay.jpg' }
        ],
        kant: [
            { id: 'critique', title: 'Критика чистого разума', desc: 'Как возможно знание? Разум конструирует мир через категории.', img: 'img/book_critique.jpg' },
            { id: 'groundwork', title: 'Основоположение метафизики нравов', desc: 'Категорический императив: «Поступай так, чтобы твоя максима могла стать всеобщим законом».', img: 'img/book_groundwork.jpg' }
        ],
        hume: [
            { id: 'treatise', title: 'Трактат о человеческой природе', desc: 'Критика причинности, индукции и «я» как иллюзии.', img: 'img/book_treatise.jpg' }
        ],
        schopenhauer: [
            { id: 'world', title: 'Мир как воля и представление', desc: 'Воля — слепая творческая сила, источник страдания. Искусство — путь к спасению.', img: 'img/book_world.jpg' }
        ],
        nietzsche: [
            { id: 'zarathustra', title: 'Так говорил Заратустра', desc: 'Пророк Заратустра возвещает: «Бог мёртв — и мы убили его». Идея сверхчеловека и вечного возвращения.', img: 'img/book_zarathustra.jpg' },
            { id: 'genealogy', title: 'К генеалогии морали', desc: 'Разоблачение: христианская мораль — маска воли к власти.', img: 'img/book_genealogy.jpg' }
        ],
        marx: [
            { id: 'manifesto', title: 'Манифест Коммунистической партии', desc: '«История всех доселе существовавших обществ есть история классовой борьбы».', img: 'img/book_manifesto.jpg' },
            { id: 'capital', title: 'Капитал', desc: 'Критика политической экономии и анализ капиталистического способа производства.', img: 'img/book_capital.jpg' }
        ],
        wittgenstein: [
            { id: 'tractatus', title: 'Логико-философский трактат', desc: '«О чём нельзя говорить, о том следует молчать».', img: 'img/book_tractatus.jpg' },
            { id: 'investigations', title: 'Философские исследования', desc: 'Критика своего раннего учения: значение слова — в его употреблении.', img: 'img/book_investigations.jpg' }
        ],
        sartre: [
            { id: 'being', title: 'Бытие и ничто', desc: '«Существование предшествует сущности». Анализ сознания, свободы и «другого».', img: 'img/book_being.jpg' }
        ]
    };

    let visibleCount = 4;
    let currentList = [...philosophers];

    function renderPhilosophers(list, count = list.length) {
        grid.innerHTML = '';
        const slice = list.slice(0, count);
        slice.forEach(p => {
            const card = document.createElement('div');
            card.className = 'philosopher-card';
            card.dataset.philosopher = p.id;
            card.innerHTML = `
                <img src="${p.img}" alt="${p.name}">
                <h2>${p.name}</h2>
                <p class="years">${p.years}</p>
                <p>${p.bio}</p>
                <div class="quote">${p.quote}</div>
                <button class="works-btn">Ключевые труды</button>
            `;
            grid.appendChild(card);
        });

        document.querySelectorAll('.works-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const key = btn.closest('.philosopher-card').dataset.philosopher;
                openWorksModal(key);
            });
        });
    }

    function openWorksModal(key) {
        const data = worksData[key];
        if (!data) {
            alert(`Информация о трудах ${key} временно недоступна.`);
            return;
        }

        if (data.type === 'none') {
           
            worksTitle.textContent = `Ключевые труды ${philosophers.find(p => p.id === key).name}`;
            worksList.innerHTML = `
                <div style="text-align: center; padding: 20px; color: #555;">
                    <p><strong>Собственных трудов нет.</strong></p>
                    <p>${data.reason}</p>
                    <p><strong>Чему учил:</strong> ${data.teaches}</p>
                </div>
            `;
        } else {
            
            const works = data;
            const name = philosophers.find(p => p.id === key).name;
            worksTitle.textContent = `Ключевые труды ${name}`;
            worksList.innerHTML = '';
            works.forEach(work => {
                const b = document.createElement('button');
                b.textContent = work.title;
                b.addEventListener('click', () => {
                    bookContent.innerHTML = `
                        <img src="${work.img}" alt="${work.title}" style="width: 140px; height: 200px; object-fit: cover; border-radius: 6px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); margin-bottom: 20px;">
                        <h3>${work.title}</h3>
                        <div class="description">${work.desc}</div>
                    `;
                    worksModal.style.display = 'none';
                    bookModal.style.display = 'flex';
                });
                worksList.appendChild(b);
            });
        }
        worksModal.style.display = 'flex';
    }

    function closeModal() {
        modal.style.display = 'none';
        worksModal.style.display = 'none';
        bookModal.style.display = 'none';
    }

    searchInput.addEventListener('input', () => {
        const term = searchInput.value.trim().toLowerCase();
        if (!term) {
            currentList = [...philosophers];
        } else {
            currentList = philosophers.filter(p =>
                p.name.toLowerCase().includes(term)
            );
        }
        visibleCount = term ? currentList.length : 4;
        renderPhilosophers(currentList, visibleCount);
        showMoreBtn.style.display = (currentList.length > 4 && !term) ? 'block' : 'none';
        showLessBtn.style.display = (term || visibleCount <= 4) ? 'none' : 'block';
    });

    showMoreBtn.addEventListener('click', () => {
        visibleCount = currentList.length;
        renderPhilosophers(currentList, visibleCount);
        showMoreBtn.style.display = 'none';
        showLessBtn.style.display = 'block';
    });

    showLessBtn.addEventListener('click', () => {
        visibleCount = 4;
        renderPhilosophers(currentList, visibleCount);
        showMoreBtn.style.display = 'block';
        showLessBtn.style.display = 'none';
    });

    
    [modal, worksModal, bookModal].forEach(m => {
        m.addEventListener('click', (e) => {
            if (e.target === m) closeModal();
        });
    });
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', closeModal);
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    renderPhilosophers(philosophers, 4);
});