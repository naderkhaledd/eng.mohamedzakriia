document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splashScreen');
    const mainContent = document.getElementById('mainContent');
    const body = document.body;

    const views = {
        heroView: document.getElementById('heroView'),
        mainSectorsView: document.getElementById('mainSectorsView'),
        sulfuricServicesView: document.getElementById('sulfuricServicesView'),
        unit6DetailsView: document.getElementById('unit6DetailsView'),
        unit7DetailsView: document.getElementById('unit7DetailsView'),
        boardMembersView: document.getElementById('boardMembersView'),
        member1DetailsView: document.getElementById('member1DetailsView'),
        member2DetailsView: document.getElementById('member2DetailsView'),
        member3DetailsView: document.getElementById('member3DetailsView')
    };

    if (body) { body.style.overflowY = 'hidden'; }

    setTimeout(() => {
        if (splashScreen) { splashScreen.classList.add('hidden'); }
        if (mainContent) { mainContent.style.display = 'block'; }
        if (body) { body.style.overflowY = 'auto'; }
        showView(window.location.hash ? window.location.hash.substring(1) : 'heroView');
    }, 4000);

    function showView(targetViewId) {
        let viewToShow = views[targetViewId];

        if (!viewToShow && (targetViewId === 'heroView' || targetViewId === 'mainSectorsView' || !targetViewId)) {
            viewToShow = views.heroView || views.mainSectorsView;
            if (viewToShow) targetViewId = viewToShow.id;
        } else if (!viewToShow) {
            console.warn('View with id: ' + targetViewId + ' not found. Defaulting to heroView or mainSectorsView.');
            viewToShow = views.heroView || views.mainSectorsView;
            if (viewToShow) targetViewId = viewToShow.id;
        }

        for (const viewId in views) {
            if (views[viewId]) {
                if (viewId === targetViewId) {
                    views[viewId].classList.add('active-view');
                } else {
                    views[viewId].classList.remove('active-view');
                }
            }
        }

        document.querySelectorAll('header nav ul li a.main-nav-link').forEach(link => {
            if (link.getAttribute('data-target-view-id') === targetViewId) {
                link.classList.add('active-nav-link');
            } else {
                link.classList.remove('active-nav-link');
            }
        });

        if (viewToShow) {
            window.scrollTo(0, viewToShow.offsetTop - (document.querySelector('header')?.offsetHeight || 70));
        }
    }

    document.querySelectorAll('.navigation-trigger').forEach(trigger => {
        trigger.addEventListener('click', (event) => {
            const targetViewId = trigger.getAttribute('data-target-view-id');
            if (targetViewId) {
                event.preventDefault();
                showView(targetViewId);
            } else {
                if (trigger.getAttribute('href') === '#') {
                    event.preventDefault();
                }
            }
        });
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('header nav ul');

    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = navUl.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            if (isExpanded) {
                menuToggle.innerHTML = '✕';
            } else {
                menuToggle.innerHTML = '☰';
            }
        });
    }
});