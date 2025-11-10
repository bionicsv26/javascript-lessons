'use strict'

const title = document.getElementsByTagName('h1')[0]
const btnPlus = document.querySelector('.screen-btn')
const otherItemPercent = document.querySelectorAll('.other-items.percent')
const otherItemNumber = document.querySelectorAll('.other-items.number')

const inputRange = document.querySelector('.rollback input')
const inputRangeValue = document.querySelector('.rollback .range-value')

const btnStart = document.getElementById('start')
const btnReset = document.getElementById('reset')

const total = document.getElementsByClassName('total-input')[0]
const totalCount = document.getElementsByClassName('total-input')[1]
const totalCountOther = document.getElementsByClassName('total-input')[2]
const fullTotalCount = document.getElementsByClassName('total-input')[3]
const totalCountRollback = document.getElementsByClassName('total-input')[4]

const cmsCheckbox = document.getElementById('cms-open');
const cmsBlock = document.querySelector('.hidden-cms-variants');
const cmsSelect = document.getElementById('cms-select');
const cmsOtherInputWrapper = cmsBlock?.querySelector('.main-controls__input');
const cmsOtherInput = document.getElementById('cms-other-input');

let screens = document.querySelectorAll('.screen')

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    screenCount: 0,
    adaptive: true,
    rollback: 0,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    cmsPrice: 0,
    cmsPercent: 0,
    servicesPercent: {},
    servicesNumber: {},
    init: function () {
        this.addTitle();

        if (cmsCheckbox) {  // Слушатель чекбокса CMS
            cmsCheckbox.addEventListener('change', () => {
                this.toggleCmsBlock();
                this.validateForm();
            });
        }

        if (cmsSelect) {  // Слушатель выбора CMS
            cmsSelect.addEventListener('change', () => {
                this.toggleCmsOtherInput();
                this.validateForm();
            });
        }

        if (cmsOtherInput) {  // Динамическое обновление при вводе в "Другое"
            cmsOtherInput.addEventListener('input', () => {
                this.validateForm();
            });
        }
        // Слушаем все изменения в .screen
        document.addEventListener('input', (e) => {
            if (e.target.closest('.screen')) this.validateForm();
        });
        document.addEventListener('change', (e) => {
            if (e.target.closest('.screen select')) this.validateForm();
        });

        inputRange.addEventListener('input', (e) => {
            const value = e.target.value;
            inputRangeValue.textContent = value + '%';
            this.rollback = +value;
        });

        btnPlus.addEventListener('click', () => {
            this.addScreensBlock();
            this.validateForm();
        });

        btnStart.addEventListener('click', this.start.bind(this));
        btnReset.addEventListener('click', this.reset.bind(this));

        this.validateForm();
    },
    addTitle: function () {
        document.title = title.textContent
    },
    start: function () {
        this.resetData()
        this.addScreens()
        this.addServices()
        this.addCmsPrice()
        this.addPrices()
        console.log(this);
        this.showResults();
        this.lockInputs(); // ← блокируем поля
    },
    reset: function () {
        this.unlockInputs(); // ← разблокируем поля

        if (cmsCheckbox) cmsCheckbox.checked = false; // Сброс CMS
        if (cmsSelect) cmsSelect.selectedIndex = 0;
        if (cmsOtherInput) cmsOtherInput.value = '';
        this.toggleCmsBlock();      // скроет .hidden-cms-variants
        this.toggleCmsOtherInput(); // скроет .main-controls__input

        this.addScreensBlock(); // Сброс экранов
        screens = document.querySelectorAll('.screen')
        for (let i = 0; i < screens.length - 1; i++) {
            screens[i].remove();
        }

        document.querySelectorAll('.other-items input[type="checkbox"]').forEach(el => { // Сброс услуг
            el.checked = false;
        });
        document.querySelectorAll('.other-items input[type="text"]').forEach(el => {
            el.value = '';
        });

        if (inputRange) { // Сброс процента отката
            inputRange.value = 0;
            this.rollback = 0;
            if (inputRangeValue) inputRangeValue.textContent = '0%';
        }

        [total, totalCount, totalCountOther, fullTotalCount, totalCountRollback] // Очистка результатов
            .forEach(el => { if (el) el.value = ''; });

        this.resetData();
        btnStart.style.display = 'flex';
        btnReset.style.display = 'none';
        this.validateForm();
    },
    resetData: function () {
        this.screens = [];
        this.servicesPercent = {};
        this.servicesNumber = {};
        this.screenPrice = 0;
        this.screenCount = 0;
        this.servicePricesPercent = 0;
        this.servicePricesNumber = 0;
        this.fullPrice = 0;
        this.servicePercentPrice = 0;
        this.cmsPrice = 0;
        this.cmsPercent = 0;
    },
    lockInputs: function () {
        // Блокируем text-поля и select в экранах и услугах
        const inputsToLock = document.querySelectorAll(`
        .screen input[type="text"],
        .screen select,
        .other-items input[type="text"],
        .other-items select,
        #cms-select,
        #cms-other-input
    `);
        inputsToLock.forEach(el => el.disabled = true);

        if (cmsCheckbox) cmsCheckbox.disabled = true;

        btnStart.style.display = 'none';
        btnReset.style.display = 'flex';
    },
    unlockInputs: function () {
        const inputsToUnlock = document.querySelectorAll(`
        .screen input[type="text"]:disabled,
        .screen select:disabled,
        .other-items input[type="text"]:disabled,
        .other-items select:disabled,
        #cms-select:disabled,
        #cms-other-input:disabled
    `);
        inputsToUnlock.forEach(el => el.disabled = false);
        if (cmsCheckbox) cmsCheckbox.disabled = false;
    },
    toggleCmsBlock: function () {
        if (!cmsBlock) return;
        cmsBlock.style.display = cmsCheckbox.checked ? 'flex' : 'none';
        // Сброс при скрытии
        if (!cmsCheckbox.checked && cmsSelect) {
            cmsSelect.selectedIndex = 0;
            this.toggleCmsOtherInput(); // скроет инпут
        }
    },
    toggleCmsOtherInput: function () {
        if (!cmsOtherInputWrapper || !cmsSelect) return;
        const show = cmsSelect.value === 'other';
        cmsOtherInputWrapper.style.display = show ? 'flex' : 'none';
        if (show && cmsOtherInput) cmsOtherInput.focus();
    },
    addCmsPrice: function () {
        if (!cmsCheckbox?.checked || !cmsSelect || cmsSelect.value === '') return;

        const val = cmsSelect.value.trim();

        if (val === 'other') {
            const percent = +cmsOtherInput?.value || 0;
            if (!isNaN(percent) && percent > 0) {
                this.cmsPercent = percent;
            }
        } else {
            const percent = +val;
            if (!isNaN(percent) && percent > 0) {
                this.cmsPercent = percent;
            }
        }
    },
    showResults: function () {
        total.value = this.screenPrice
        totalCount.value = this.screenCount
        totalCountOther.value = this.servicePricesNumber + this.servicePricesPercent
        fullTotalCount.value = this.fullPrice
        totalCountRollback.value = this.servicePercentPrice
    },
    addScreens: function () {
        screens = document.querySelectorAll('.screen')

        screens.forEach((screen, index) => {
            const select = screen.querySelector('select')
            const input = screen.querySelector('input')
            const selectName = select.options[select.selectedIndex].textContent

            this.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                count: +input.value
            })
        })
    },
    addServices: function () {
        otherItemPercent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type=text]')
            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value
            }
        })

        otherItemNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type=text]')
            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value
            }
        })
    },
    addScreensBlock: function () {
        screens = document.querySelectorAll('.screen')
        const cloneScreen = screens[0].cloneNode(true)
        cloneScreen.querySelector('input').value = ''
        screens[screens.length - 1].after(cloneScreen)
    },
    addPrices: function () {
        this.screenPrice = this.screens.reduce((sum, screen) => sum + +screen.price, 0)
        this.screenCount = this.screens.reduce((sum, screen) => sum + screen.count, 0)

        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key]
        }
        for (let key in this.servicesPercent) {
            this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100)
        }

        if (this.cmsPercent) {
            this.cmsPrice = this.screenPrice * (this.cmsPercent / 100);
        }
        this.fullPrice = +this.screenPrice + this.servicePricesNumber + this.servicePricesPercent + this.cmsPrice;

        this.servicePercentPrice = this.fullPrice - Math.ceil(this.fullPrice * this.rollback / 100)
    },
    validateForm: function () {
        const screenBlocks = document.querySelectorAll('.screen')
        let isValidScreen = true

        screenBlocks.forEach(block => {
            const select = block.querySelector('select')
            const input = block.querySelector('input')

            const isSelected = select.value.trim() !== ''
            const count = +input.value

            // Если хотя бы один блок невалиден — отключаем кнопку
            if (!(isSelected && !isNaN(count) && count > 0)) {
                isValidScreen = false
            }
        })

        if (cmsCheckbox?.checked) {
            const cmsValue = cmsSelect?.value;
            if (!cmsValue) {
                isValidScreen = false;
            } else if (cmsValue === 'other') {
                const otherPercent = +cmsOtherInput?.value;
                if (isNaN(otherPercent) || otherPercent <= 0) {
                    isValidScreen = false;
                }
            }
        }

        btnStart.disabled = !isValidScreen
    }
}

appData.init()