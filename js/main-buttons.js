document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('modal-overlay');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.modal-close');
    const overlay = document.querySelector('.modal-overlay');

    const philosophers = {
        socrates: {
            name: 'Сократ',
            years: '470–399 до н.э.',
            image: 'img/socrates.jpg',
            bio: 'Древнегреческий философ, считающийся одним из основателей западной философии. Не оставил письменных трудов — его идеи дошли до нас через учеников, особенно Платона. Известен своим методом «майевтики» — искусства ведения диалога, в ходе которого собеседник приходит к истине самостоятельно. Основной принцип: «Познай самого себя». Осужден на смерть за «развращение молодёжи» и «непризнание богов».',
            quote: '«Я знаю, что ничего не знаю»'
        },
        plato: {
            name: 'Платон',
            years: '428/427–348/347 до н.э.',
            image: 'img/plato.jpg',
            bio: 'Ученик Сократа и учитель Аристотеля. Основал в Афинах первую в истории высшую школу — Академию. Его философия основана на теории идей: истинная реальность существует не в материальном мире, а в мире вечных, неизменных «форм» или «идей». Главное произведение — диалог «Государство».',
            quote: '«Мы можем легко простить ребенка, который боится темноты; настоящая трагедия жизни — когда взрослые боятся света»'
        },
        aristotle: {
            name: 'Аристотель',
            years: '384–322 до н.э.',
            image: 'img/aristotle.jpg',
            bio: 'Ученик Платона, основатель Лицея в Афинах. В отличие от Платона, Аристотель делал упор на эмпирическое наблюдение и логику. Он систематизировал почти все области знания своего времени. Автор логики как науки. Считал, что цель жизни — эвдемония через добродетельную деятельность.',
            quote: '«Мы есть то, что мы постоянно делаем. Совершенство, следовательно, не действие, а привычка»'
        },
        descartes: {
            name: 'Рене Декарт',
            years: '1596–1650',
            image: 'img/descartes.jpg',
            bio: 'Французский философ, математик и учёный, считающийся основателем современной философии. Ввёл метод радикального сомнения и пришёл к выводу: «Cogito, ergo sum» («Мыслю, следовательно, существую»). Положил начало дуализму — учению о разделении разума и тела.',
            quote: '«Мыслю, следовательно, существую»'
        }
    };

    const buttons = document.querySelectorAll('.custom-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.classList[1];
            const map = { 'btn-1': 'socrates', 'btn-2': 'plato', 'btn-3': 'aristotle', 'btn-4': 'descartes' };
            const id = map[key];
            const data = philosophers[id];
            if (data) {
                modalBody.innerHTML = `
                    <div style="text-align: center; margin-bottom: 20px;">
                        <img src="${data.image}" alt="${data.name}" style="width: 120px; height: 120px; object-fit: cover; border-radius: 50%; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                        <h2 style="margin: 15px 0 5px; color: #2c3e50;">${data.name}</h2>
                        <p style="color: #7f8c8d; margin-bottom: 15px;">${data.years}</p>
                    </div>
                    <p style="margin-bottom: 20px;">${data.bio}</p>
                    <div style="font-style: italic; padding-left: 20px; border-left: 3px solid #e74c3c; color: #555;">
                        ${data.quote}
                    </div>
                `;
                modal.style.display = 'flex';
            }
        });
    });

    [closeModal, overlay].forEach(el => {
        el.addEventListener('click', () => modal.style.display = 'none');
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') modal.style.display = 'none';
    });
});