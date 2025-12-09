document.addEventListener('DOMContentLoaded', function () {
    const rail = document.getElementById('epoch-rail');
    const handle = document.getElementById('epoch-handle');
    const previewContent = document.getElementById('preview-content');
    const modal = document.getElementById('school-modal');
    const modalBody = document.getElementById('school-modal-body');
    const closeModal = document.querySelector('.school-modal-close');
    const overlay = modal;

    const epochs = {
        antiquity: {
            title: 'Античная философия',
            era: 'VI в. до н.э. — III в. н.э.',
            img: 'img/antiquity.jpg',
            schools: ['platonism', 'aristotelism', 'stoicism', 'epicureanism', 'skepticism', 'cynicism', 'cyrenaicism', 'neoplatonism']
        },
        medieval: {
            title: 'Средневековая философия',
            era: 'V–XV вв.',
            img: 'img/medieval.jpg',
            schools: ['scholasticism', 'mysticism', 'nominalism', 'realism']
        },
        renaissance: {
            title: 'Философия Возрождения',
            era: 'XIV–XVI вв.',
            img: 'img/renaissance.jpg',
            schools: ['humanism', 'neoplatonism-renaissance', 'natural-philosophy']
        },
        modern: {
            title: 'Философия Нового времени',
            era: 'XVII–XIX вв.',
            img: 'img/modern.jpg',
            schools: ['rationalism', 'empiricism', 'kantianism', 'german-idealism', 'utilitarianism', 'deism', 'irrationalism']
        },
        contemporary: {
            title: 'Современная философия',
            era: 'XIX–XXI вв.',
            img: 'img/contemporary.jpg',
            schools: ['marxism', 'positivism', 'existentialism', 'phenomenology', 'analytic', 'pragmatism', 'structuralism', 'postmodernism']
        }
    };

    const schools = {
        // === АНТИЧНОСТЬ ===
        platonism: {
            name: 'Платонизм',
            desc: 'Философия Платона, основанная на теории идей. Истинная реальность — мир вечных, неизменных форм.',
            founders: 'Платон',
            followers: 'Спевсипп, Ксенократ, Плотин (неоплатонизм)',
            slogan: '«Познание — это припоминание»',
            teaches: 'Материальный мир — тень мира идей. Душа до рождения пребывала в мире идей.',
            contrast: 'материализм',
            decline: 'Слился с христианской теологией; возродился в эпоху Возрождения.'
        },
        aristotelism: {
            name: 'Аристотелизм',
            desc: 'Система Аристотеля, основанная на логике, эмпирии и телеологии.',
            founders: 'Аристотель',
            followers: 'Теофраст, арабские философы (Аверроэс), Фома Аквинский',
            slogan: '«Природа ничего не делает напрасно»',
            teaches: 'Форма и материя неразделимы. Цель (телеология) — объяснение бытия.',
            contrast: 'платонизм',
            decline: 'Доминировал в Средние века; вытеснен новоевропейской наукой.'
        },
        stoicism: {
            name: 'Стоицизм',
            desc: 'Школа, основанная Зеноном в Стоа (крытая галерея) в Афинах.',
            founders: 'Зенон из Кития',
            followers: 'Сенека, Эпиктет, Марк Аврелий',
            slogan: '«Живи в согласии с природой»',
            teaches: 'Внешние события не зависят от нас, но наша реакция — всегда в нашей власти.',
            contrast: 'эпикуреизм',
            decline: 'Исчез с падением Рима, но идеи вошли в христианство.'
        },
        epicureanism: {
            name: 'Эпикуреизм',
            desc: 'Школа сада, основанная Эпикуром. Противостояла стоицизму и платонизму.',
            founders: 'Эпикур',
            followers: 'Метродор, Лукреций',
            slogan: '«Атараксия — душевное спокойствие»',
            teaches: 'Удовольствие — отсутствие боли и тревог. Главное — дружба и умеренность.',
            contrast: 'стоицизм',
            decline: 'Осуждался как «гедонизм»; возродился в эпоху Просвещения.'
        },
        skepticism: {
            name: 'Скептицизм',
            desc: 'Отрицание возможности достоверного знания.',
            founders: 'Пиррон',
            followers: 'Секст Эмпирик',
            slogan: '«Подвесь суждение — и обретёшь покой»',
            teaches: 'На любое утверждение можно привести равносильное противоположное.',
            contrast: 'догматизм',
            decline: 'Влиял на Канта и Юма; живёт в научном скептицизме.'
        },
        cynicism: {
            name: 'Кинизм',
            desc: 'Радикальное отрицание условностей общества и культуры.',
            founders: 'Антисфен, Диоген Синопский',
            followers: 'Кратет, Гиппархия',
            slogan: '«Вернись к природе!»',
            teaches: 'Счастье — в отказе от роскоши, власти, богатства. Живи как собака (κύων).',
            contrast: 'платонизм',
            decline: 'Слился со стоицизмом; стал культурным мемом.'
        },
        cyrenaicism: {
            name: 'Киренаизм',
            desc: 'Ранний гедонизм, утверждающий: высшее благо — мгновенное телесное удовольствие.',
            founders: 'Аристипп',
            followers: 'Гегесий, Анникерис',
            slogan: '«Лови момент!»',
            teaches: 'Только телесные ощущения реальны. Удовольствие — кратковременно, страдание — избегай.',
            contrast: 'стоицизм',
            decline: 'Вытеснен более сложным эпикуреизмом.'
        },
        neoplatonism: {
            name: 'Неоплатонизм',
            desc: 'Позднеантичная мистическая система, объединившая платонизм и религию.',
            founders: 'Плотин',
            followers: 'Порфирий, Ямвлих, Прокл',
            slogan: '«Всё исходит из Единого»',
            teaches: 'Душа должна вернуться к Единому через очищение и созерцание.',
            contrast: 'материализм',
            decline: 'Поглощён христианством и исламом.'
        },

        // === СРЕДНЕВЕКОВЬЕ ===
        scholasticism: {
            name: 'Схоластика',
            desc: 'Философия средневековых университетов, согласующая разум и Откровение.',
            founders: 'Ансельм Кентерберийский',
            followers: 'Фома Аквинский, Дунс Скот, Оккам',
            slogan: '«Вера ищет понимания»',
            teaches: 'Бога можно доказать разумом. Мир логичен и устроен по плану.',
            contrast: 'гуманизм',
            decline: 'Уступил место эмпиризму и критическому мышлению.'
        },
        mysticism: {
            name: 'Мистицизм',
            desc: 'Прямое единение с Богом через внутренний опыт, а не через разум.',
            founders: 'Псевдо-Дионисий Ареопагит',
            followers: 'Мейстер Экхарт, Иоанн Кронштадтский',
            slogan: '«Молчание — язык Бога»',
            teaches: 'Истина недоступна логике; познание — через экстаз и любовь.',
            contrast: 'схоластика',
            decline: 'Слился с мистическими течениями в религии.'
        },
        nominalism: {
            name: 'Номинализм',
            desc: 'Утверждает: универсалии — лишь имена, реальны только единичные вещи.',
            founders: 'Росцелин, Уильям Оккам',
            followers: 'Пьер Абеляр (умеренный)',
            slogan: '«Универсалии — звуковые волны»',
            teaches: 'Общие понятия («человек», «красота») — лишь слова, не сущности.',
            contrast: 'реализм',
            decline: 'Заложил основы эмпиризма и научного подхода.'
        },
        realism: {
            name: 'Реализм',
            desc: 'Универсалии существуют реально и независимо от вещей.',
            founders: 'Платон (влияние), Гийом Шампейский',
            followers: 'Фома Аквинский (умеренный реализм)',
            slogan: '«Идеи — первичны»',
            teaches: 'Общие понятия реально существуют до вещей («universalia ante rem»).',
            contrast: 'номинализм',
            decline: 'Уступил позиции номинализму и умеренному реализму.'
        },

        // === ВОЗРОЖДЕНИЕ ===
        humanism: {
            name: 'Гуманизм',
            desc: 'Возрождение античного человека как центра мироздания.',
            founders: 'Франческо Петрарка',
            followers: 'Эразм, Томас Мор',
            slogan: '«Человек — мера всех вещей»',
            teaches: 'Ценность личности, образования, свободы совести.',
            contrast: 'схоластика',
            decline: 'Эволюционировал в философию Просвещения.'
        },
        'neoplatonism-renaissance': {
            name: 'Неоплатонизм Возрождения',
            desc: 'Возрождение Плотина в эпоху Возрождения.',
            founders: 'Марсилио Фичино',
            followers: 'Джованни Пико делла Мирандола',
            slogan: '«Человек — творец самого себя»',
            teaches: 'Синтез христианства, платонизма и каббалы.',
            contrast: 'аристотелизм',
            decline: 'Потеснён научной революцией.'
        },
        'natural-philosophy': {
            name: 'Натурфилософия',
            desc: 'Попытка объяснить природу через целостные силы, а не механику.',
            founders: 'Парацельс, Джордано Бруно',
            followers: 'Коменский',
            slogan: '«Мир — живой организм»',
            teaches: 'Природа одушевлена, всё взаимосвязано.',
            contrast: 'механицизм',
            decline: 'Вытеснена новоевропейской наукой (Ньютон, Галилей).'
        },

        // === НОВОЕ ВРЕМЯ ===
        rationalism: {
            name: 'Рационализм',
            desc: 'Истина рождается в разуме, а не в опыте.',
            founders: 'Рене Декарт',
            followers: 'Спиноза, Лейбниц',
            slogan: '«Я мыслю — следовательно, существую»',
            teaches: 'Существуют врождённые идеи; мир подчинён логике.',
            contrast: 'эмпиризм',
            decline: 'Критика Юма; синтез в философии Канта.'
        },
        empiricism: {
            name: 'Эмпиризм',
            desc: 'Все знания — из опыта.',
            founders: 'Фрэнсис Бэкон',
            followers: 'Локк, Юм, Беркли',
            slogan: '«Нет ничего в разуме, чего не было бы в чувствах»',
            teaches: 'Разум — «чистая доска». Истинное знание строится на наблюдении.',
            contrast: 'рационализм',
            decline: 'Слился с рационализмом в критической философии.'
        },
        kantianism: {
            name: 'Кантианство',
            desc: 'Критическая философия, разграничивающая явления и вещи в себе.',
            founders: 'Иммануил Кант',
            followers: 'Фихте, Шеллинг (ранние)',
            slogan: '«Две вещи наполняют душу благоговением…»',
            teaches: 'Мир конструируется разумом через категории. Мораль — категорический императив.',
            contrast: 'эмпиризм и рационализм',
            decline: 'Развито в немецком идеализме.'
        },
        'german-idealism': {
            name: 'Немецкий идеализм',
            desc: 'Абсолютный дух как основа бытия.',
            founders: 'Гегель',
            followers: 'Фихте, Шеллинг, Фейербах',
            slogan: '«Всё разумно, что реально»',
            teaches: 'Мир — проявление Абсолютной идеи. История — развитие духа.',
            contrast: 'материализм',
            decline: 'Критика Марксом; уход в историю философии.'
        },
        utilitarianism: {
            name: 'Утилитаризм',
            desc: 'Мораль основана на максимизации счастья.',
            founders: 'Джереми Бентам',
            followers: 'Джон Стюарт Милль',
            slogan: '«Наибольшее счастье для наибольшего числа»',
            teaches: 'Поступок прав, если приносит максимум пользы.',
            contrast: 'деонтология (Кант)',
            decline: 'Живёт в современной этике и политике.'
        },
        deism: {
            name: 'Деизм',
            desc: 'Бог — создатель, но не вмешивается в мир.',
            founders: 'Лорд Герберт, Вольтер',
            followers: 'Томас Пейн, Руссо',
            slogan: '«Бог — часовой мастер»',
            teaches: 'Мир устроен разумно, как часы. Бог не творит чудес.',
            contrast: 'теизм',
            decline: 'Уступил место атеизму и пантеизму.'
        },
        irrationalism: {
            name: 'Иррационализм',
            desc: 'Воля, инстинкт, бессознательное важнее разума.',
            founders: 'Артур Шопенгауэр',
            followers: 'Ницше, Бергсон',
            slogan: '«Мир — моя воля и представление»',
            teaches: 'Разум бессилен перед волей к жизни. Искусство — путь к спасению.',
            contrast: 'рационализм',
            decline: 'Влиял на экзистенциализм и психоанализ.'
        },

        // === СОВРЕМЕННОСТЬ ===
        marxism: {
            name: 'Марксизм',
            desc: 'Философия, основанная на историческом материализме.',
            founders: 'Карл Маркс, Фридрих Энгельс',
            followers: 'Ленин, Троцкий, Франкфуртская школа',
            slogan: '«Философы лишь по-разному объясняли мир…»',
            teaches: 'Базис (экономика) определяет надстройку. Цель — освобождение от эксплуатации.',
            contrast: 'идеализм',
            decline: 'Кризис с падением СССР; живёт в критической теории.'
        },
        positivism: {
            name: 'Позитивизм',
            desc: 'Единственное знание — научное, основанное на фактах.',
            founders: 'Огюст Конт',
            followers: 'Джон Стюарт Милль, Венский кружок',
            slogan: '«Знай факты, не сущности»',
            teaches: 'Метафизика бессмысленна. Наука — единственный путь к истине.',
            contrast: 'метафизика',
            decline: 'Критика постпозитивизмом (Поппер, Куна).'
        },
        existentialism: {
            name: 'Экзистенциализм',
            desc: 'Философия свободы, одиночества и ответственности.',
            founders: 'Кьеркегор, Сартр',
            followers: 'Камю, Хайдеггер',
            slogan: '«Существование предшествует сущности»',
            teaches: 'Человек создаёт себя через выбор. Жизнь абсурдна — но в этом свобода.',
            contrast: 'эссенциализм',
            decline: 'Слился с постмодернизмом.'
        },
        phenomenology: {
            name: 'Феноменология',
            desc: 'Изучение структуры сознания и опыта.',
            founders: 'Эдмунд Гуссерль',
            followers: 'Хайдеггер, Мерло-Понти',
            slogan: '«К вещам сами по себе!»',
            teaches: 'Отключи предрассудки — смотри, как дано в сознании.',
            contrast: 'натурализм',
            decline: 'Влияние на герменевтику и экзистенциализм.'
        },
        analytic: {
            name: 'Аналитическая философия',
            desc: 'Философия через анализ языка и логики.',
            founders: 'Бертран Рассел, Людвиг Витгенштейн',
            followers: 'Квайн, Дэвид Льюис',
            slogan: '«Философские проблемы — проблемы языка»',
            teaches: 'Чёткость, логика, отказ от метафизики.',
            contrast: 'континентальная философия',
            decline: 'Доминирует в англоязычных странах.'
        },
        pragmatism: {
            name: 'Прагматизм',
            desc: 'Истина — то, что «работает» на практике.',
            founders: 'Чарльз Пирс',
            followers: 'Джон Дьюи, Уильям Джеймс',
            slogan: '«Истина — это то, что оказывается полезным»',
            teaches: 'Знание — инструмент для действия.',
            contrast: 'априоризм',
            decline: 'Влияние на образование и демократию.'
        },
        structuralism: {
            name: 'Структурализм',
            desc: 'Мир — система знаков и структур.',
            founders: 'Фердинанд де Соссюр',
            followers: 'Леви-Стросс, Ролан Барт',
            slogan: '«Значение — в структуре, а не в элементах»',
            teaches: 'Сознание, культура, язык — это структуры.',
            contrast: 'гуманизм',
            decline: 'Сменён постструктурализмом.'
        },
        postmodernism: {
            name: 'Постмодернизм',
            desc: 'Критика великих нарративов, истины и метафизики.',
            founders: 'Жан-Франсуа Лиотар, Жак Деррида',
            followers: 'Фуко, Бодрийяр',
            slogan: '«Истина — игра языка»',
            teaches: 'Нет объективной истины — только интерпретации и дискурсы.',
            contrast: 'модернизм',
            decline: 'Актуален в культуре и социальных науках.'
        }
    };

    let currentEpoch = 'antiquity';

    function updatePreview(epochKey) {
        const epoch = epochs[epochKey];
        if (!epoch) return;
        currentEpoch = epochKey;
        let schoolButtons = '';
        epoch.schools.forEach(s => {
            const school = schools[s];
            if (school) {
                schoolButtons += `<div class="school-item" data-school="${s}">${school.name}</div>`;
            }
        });
        previewContent.innerHTML = `
            <img src="${epoch.img}" alt="${epoch.title}" class="epoch-img">
            <h2>${epoch.title}</h2>
            <p class="epoch-eras">${epoch.era}</p>
            <div class="schools-list">${schoolButtons}</div>
        `;
        document.querySelectorAll('.school-item').forEach(btn => {
            btn.addEventListener('click', () => openSchoolModal(btn.dataset.school));
        });
    }

    function openSchoolModal(schoolKey) {
        const s = schools[schoolKey];
        if (!s) return;
        modalBody.innerHTML = `
            <h2>${s.name}</h2>
            <p><strong>История:</strong> ${s.desc}</p>
            <p><strong>Основатель:</strong> ${s.founders}</p>
            <p><strong>Последователи:</strong> ${s.followers}</p>
            <p><strong>Лозунг:</strong> ${s.slogan}</p>
            <p><strong>Чему учит:</strong> ${s.teaches}</p>
            <p><strong>Противоположность:</strong> ${s.contrast}</p>
            <p><strong>Упадок:</strong> ${s.decline}</p>
        `;
        modal.style.display = 'flex';
    }

    function getEpochByPosition(x) {
        if (x < 0.2) return 'antiquity';
        if (x < 0.4) return 'medieval';
        if (x < 0.6) return 'renaissance';
        if (x < 0.8) return 'modern';
        return 'contemporary';
    }

    function updateHandlePosition(clientX) {
        const rect = rail.getBoundingClientRect();
        const railStart = rect.left;
        const railEnd = rect.right;
        let x = Math.max(railStart, Math.min(railEnd, clientX));
        let percent = ((x - railStart) / (railEnd - railStart)) * 100;
        handle.style.left = percent + '%';
        const ratio = (x - railStart) / (railEnd - railStart);
        const newEpoch = getEpochByPosition(ratio);
        if (newEpoch !== currentEpoch) {
            updatePreview(newEpoch);
        }
    }

    rail.addEventListener('click', (e) => {
        updateHandlePosition(e.clientX);
    });

    let isDragging = false;
    handle.addEventListener('mousedown', (e) => {
        isDragging = true;
        e.preventDefault();
    });
    handle.addEventListener('touchstart', (e) => {
        isDragging = true;
        e.preventDefault();
    });

    document.addEventListener('mouseup', () => isDragging = false);
    document.addEventListener('touchend', () => isDragging = false);

    document.addEventListener('mousemove', (e) => {
        if (isDragging) updateHandlePosition(e.clientX);
    });
    document.addEventListener('touchmove', (e) => {
        if (isDragging) updateHandlePosition(e.touches[0].clientX);
    });

    [closeModal, overlay].forEach(el => {
        el.addEventListener('click', () => modal.style.display = 'none');
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') modal.style.display = 'none';
    });

    updatePreview('antiquity');
});