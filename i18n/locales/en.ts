export default {
    common: {
        book: 'Book',
        cancel: 'Cancel',
        confirm: 'Confirm',
        loading: 'Loading...',
        search: 'Search',
        premium: 'Premium',
        distance: 'km',
        uzs: " sum"
    },
    otp: {
        title: "Phone verification",
        description: "Enter OTP-code, we sent to phone: ",
        acceptBtn: "Accept",
        pendingBtn: "Accepting...",
        errorMsg: "Error, code not valid",
        resendIn: "Resend otp code after ",
        resendBtn: "Resend otp",
        seconds: "seconds"
    },
    register: {
        title: "Registration",
        description: "For use our services you need registration",
        name: "Name",
        city: "Select city",
        promoCode: "Promo code (if you have)",
        promoCodeChecking: "Promo code checking...",
        promoCodeInvalid: "Promo code is invalid",
        promoCodeValid: "Discount",
        registerBtn: "Register",
        pendingBtn: "Registration...",
    },
    login: {
        title: "Welcome!",
        description: "Please for continue sign in to AvtoToza, enter your phone",
        continueBtn: "Continue",
        pendingBtn: "Checking...",
    },
    history: {
        title: "Bookings history",
    },
    garage: {
        title: "Garage",
        add: "Add (car)",
        brand: "Brand",
        model: "Model",
        color: "Color",
        bodyType: "Body type",
        fuelType: "Fuel type",
        saving: "Saving...",
        nocars: "You don't have any cars yet!",
        selectBrand: "Select brand:",
        selectModel: "Select model:",
        selectBodyType: "Select body type:",
        selectFuelType: "Select fuel type:",
        selectColor: "Select color:",
        clickToUploadImg: "Press to upload your image",
        mycar: "My vehicle",
        primary: "Primary",
    },
    navbar: {
        home: 'Main',
        garage: 'Garage',
        profile: 'Profile'
    },
    services: {
        carwash: {
            title: 'Call car wash',
            description: 'Come to your location'
        },
        fuel: {
            title: 'Call fuel',
            description: 'Come to your location'
        },
        tire: {
            title: 'Call tire',
            description: 'Come to your location'
        }
    },
    profile: {
        title: "Profile",
        myCars: "My cars",
        myOrders: "My bookings",
        paymentMethod: 'Payment method',
        notifications: 'Notifications',
        support: 'Support',
        info: {
          title: 'Info',
          description: 'Here you can booking your favorite car wash and pay online!',
        },
        logout: 'Logout',
        paymentMethods: {
            title: "Payment methods",
            description: "At the moment you can pay with methods: Cash and Payme payment provider, soon we add subscribe tariffs",
        },
        notification: {
            title: "Notification",
            noNotifications: "You don't have any notifications yet",
        }
    },
    booking: {
        bookButton: 'Book',
        selectDate: 'Select date',
        selectTime: 'Select time',
        selectCar: 'Select (car)',
        selectTariff: 'Select tariff:',
        inputCarNumber: 'Car number:',
        today: 'Today',
        tomorrow: 'Tomorrow',
        afterTomorrow: 'Day after tomorrow',
        reviews: "Reviews:",
        reviewsNot: "Reviews not found",
        reviewsLoading: "Loading reviews...",
        allReviews: ' All reviews',
        enterReview: 'Enter review',
        reviewsForm: {
            title: "Leave review",
            description: "Please leave the review, its help other drivers",
            name: "Name (optional)",
            comment: "Comment",
            sendBtn: "Send",
            pendingBtn: "Sending..."
        },
        paymentMethod: {
            cash: "Cash",
            card: "Card",
            cashTitle: "Confirm",
            cashButton: "Confirm",
            cashBack: "Back",
            cashDescription: "Without discount",
            cardDescription: "Discount ",
            cashAttention: "If you dont come to (car) wash 3-time you will blocked",

            payTitle: "Payment",
            payDescription: "Select payment method",
        },
        bookingModal: {
            loadingBookingTitle: "Creating booking...",
            loadingBookingDescription: "Please wait",
            title: "Booking created",
            orderId: "Order number",
            washName: "Wash",
            carNumber: "Plate number",
            date: "Date",
            tariff: "Tariff",
            price: "Price",
            pendingPayment: "Waiting payment...",
            successPayment: "Successfully payment!",
            bookingAccepted: "Booking accepted, we waiting you!",
            close: "Close",
            openNavigator: "Open in navigator",
            openPayment: "Pay",
            status: {
                status: "Status",
                created: "Pending payment",
                pending: "Waiting customer",
                paid: "Waiting customer",
                completed: "Completed",
                cancelled: "Cancelled",
            },
        },
        tariffs: {
            basic: 'Basic',
            standart: 'Standart',
            premium: 'Premium',

            sedan: 'sedan',
            crossover: 'crassover',

            plus: 'plus',

            service: "Car wash plan"
        },
    },
    payment: {
        cardDiscount: 'Card (with discount)',
        cash: 'Cash (no discount)',
    },
}
