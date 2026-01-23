export default {
    common: {
        book: 'Забронировать',
        cancel: 'Отмена',
        confirm: 'Подтвердить',
        loading: 'Загружается...',
        search: 'Поиск',
        premium: 'Премиум',
        distance: 'км',
        uzs: " сўм"
    },
    otp: {
        title: "Подтверждение номера",
        description: "Введите ОТР-код который был отправлен на номер: ",
        acceptBtn: "Подтвердить",
        pendingBtn: "Подтверждение...",
        errorMsg: "Неверный код или код уже устарел",
        resendIn: "Отправить код повторно через",
        resendBtn: "Отправить код снова",
        seconds: "секунд"
    },
    register: {
        title: "Регистрация",
        description: "Чтобы пользоваться нашими услугами вам необходимо пройти регистрацию",
        name: "Имя",
        city: "Выберите город",
        promoCode: "Промокод (если есть)",
        promoCodeChecking: "Проверка промокода...",
        promoCodeInvalid: "Промокод недействителен или уже исперчен",
        promoCodeValid: "Скидка",
        registerBtn: "Зарегистрироваться",
        pendingBtn: "Регистрация...",
    },
    history: {
        title: "История броней",
    },
    login: {
        title: "Добро пожаловать!",
        description: "Чтобы продолжить пожалуйста войдите в систему AvtoToza, пожалуйста введите номер телефона",
        continueBtn: "Продолжить",
        pendingBtn: "Проверяем...",
    },
    garage: {
        title: "Гараж",
        add: "Добавить автомобиль",
        brand: "Марка",
        model: "Модель",
        color: "Цвет",
        bodyType: "Тип кузова",
        fuelType: "Тип топлива",
        saving: "Сохрняем...",
        selectBrand: "Выберите марку:",
        selectModel: "Выберите модель:",
        selectBodyType: "Выберите тип кузова:",
        selectFuelType: "Выберите вид топлива:",
        selectColor: "Выберите цвет:",
        clickToUploadImg: "Нажмите, чтобы загрузить своё фото",
        mycar: "Мой автомобил",
        primary: "Избранный"
    },
    navbar: {
        home: 'Главная',
        garage: 'Гараж',
        profile: 'Профиль'
    },
    services: {
        carwash: {
            title: 'Вызовная мойка',
            description: 'Приезжаем к вам'
        },
        fuel: {
            title: 'Вызов бензина',
            description: 'Приезжаем к вам'
        },
        tire: {
            title: 'Вызов шиномонтажа',
            description: 'Приезжаем к вам'
        }
    },
    profile: {
        title: "Профиль",
        myCars: "Мои автомобили",
        myOrders: "Мои брони",
        paymentMethod: 'Способы оплаты',
        notifications: 'Уведомления',
        support: 'Тех поддержка',
        info: 'О приложении',
        logout: 'Выйти',
        paymentMethods: {
            title: "Способы оплаты",
            description: "В настоящий момент вы можете платить наличкой и методом Payme, скоро добавим ежемесячную подписку",
        }
    },
    booking: {
        bookButton: 'Забронировать',
        selectDate: 'Выберите дату',
        selectTime: 'Выберите время',
        selectCar: 'Выберите машину',
        selectTariff: 'Выберите тариф:',
        inputCarNumber: 'Номер автомобиля:',
        today: 'Сегодня',
        tomorrow: 'Завтра',
        afterTomorrow: 'Послезавтра',
        reviews: "Отзывы:",
        reviewsNot: "Пока отзывов нет",
        reviewsLoading: "Загружаем отзывы…",
        allReviews: ' Показать все отзывы',
        paymentMethod: {
          cash: "Наличка",
          card: "Карта",
            cashTitle: "Подтверждение",
            cashButton: "Подтвердить",
            cashBack: "Назад",
          cashDescription: "Без скидки",
          cardDescription: "Скидка ",
          cashAttention: "Если вы 3-раза подряд не прибытите в мойку Вам будет заблокирован метод оплаты наличкой",

            payTitle: "Оплата",
            payDescription: "Выберите способ оплаты",
        },
        bookingModal: {
            loadingBookingTitle: "Создаем бронь..",
            loadingBookingDescription: "Пожалуйста подождите",
            title: "Бронь создана",
            orderId: "Номер заказа",
            washName: "Мойка",
            carNumber: "Номер автомобиля",
            date: "Дата",
            tariff: "Тариф",
            price: "Цена",
            pendingPayment: "Ожидает оплату...",
            successPayment: "Оплата прошла успешно!",
            bookingAccepted: "Бронь подтверждена, ждем вас!",
            close: "Закрыть",
            openNavigator: "Открыть в навигаторе",
            openPayment: "Оплатить",
            status: {
                status: "Статус",
                created: "Ждет оплату",
                pending: "Ждет клиента",
                paid: "Ждет клиента",
                completed: "Завершено",
                cancelled: "Отменено",
            },
        },
        tariffs: {
            basic: 'Базовый',
            standart: 'Стандарт',
            premium: 'Премиум',

            sedan: 'седан',
            crossover: 'кроссовер',

            plus: 'плюс',

            service: "Тариф мойки"
        },
    },
    payment: {
        cardDiscount: 'Карта (со скидкой)',
        cash: 'Наличные (без скидки)',
    },
}
