export const enum roleTypes {
  ORGANIZATION_ADMIN = "organization_admin",
  DEPARTMENT_EMPLOYEE = "department_employee",
}

export const enum pageNames {
  main_page = "main_page",
  deals_page = "deals_page",
  organization_page = "organization_page",
}

const content = {
  pages: {
    [pageNames.main_page]: { requiredRole: [roleTypes.ORGANIZATION_ADMIN, roleTypes.DEPARTMENT_EMPLOYEE] },
    [pageNames.deals_page]: { requiredRole: [roleTypes.ORGANIZATION_ADMIN, roleTypes.DEPARTMENT_EMPLOYEE] },
    [pageNames.organization_page]: { requiredRole: [roleTypes.ORGANIZATION_ADMIN] },
  },
  gallery: {
    title: "Галерея проектов",
    settings: {
      types: [
        {
          id: "coll",
          icon: true,
          disabled: true,
          mode: "multiple",
          placeholder: "Коллекция",
        },
        {
          id: "room_type",
          icon: true,
          disabled: false,
          mode: "multiple",
          placeholder: "Тип помещения",
        },
        {
          id: "color",
          icon: true,
          disabled: true,
          mode: "multiple",
          placeholder: "Цвет",
        },
      ],
      search: {
        id: "search",
        text: "Искать",
        icon: false,
      },
    },
    show_all: "Посмотреть все проекты",
    detail_card: {
      title: "Название проекта",
      create_projec_button_title: "Создать на основании этого проекта",
    },
  },

  profile_settings: {
    header: {
      title: "Профиль",
    },
    buttons: {
      save: "Сохранить",
      change_user: "Сменить пользователя",
      logout: "Выйти",
    },
    block_titles: {
      name: "Фамилия имя",
      change_password: "Изменить пароль",
    },
    inputs: {
      name: "Иванов Иван",
      olg_password: "Старый пароль",
      new_password: "Новый пароль",
      repeat_password: "Повторите пароль",
    },
    users_list: {
      me: "Вы",
      available_users: "Доступные пользователи",
      exit: "Перейти",
      stay: "Остаться",
      text: "Вы уверены, что хотите перейти в другой аккаунт?",
    },
  },

  deals: {
    header: {
      create_deal: "Создать заявку",
      search_deals: "Поиск сделки",
      show_my_deals: "Показать только мои сделки?",
      show_all_deals: "Показать все сделки?",
    },
    deal_card_create: {
      title: "Заполните информацию о сделке",
      submit: "Сохранить",
      dealCardInputs: [
        {
          id: "client_phone",
          type: "mask",
          name: "client_phone",
          placeholder: "+7 (___) ___-__-__",
          mask: "+7 (999) 999-99-99",
          maskChar: " ",
          required: true,
          validate: true,
        },
        { id: "client_email", type: "email", name: "client_email", placeholder: "Email", required: true, validate: true },
        {
          id: "client_fullname",
          type: "",
          name: "client_fullname",
          placeholder: "Фамилия Имя Отчество клиента",
          required: true,
          validate: true,
        },
        { id: "title", type: "", name: "title", placeholder: "Название проекта", required: true, validate: false },
        { id: "surface_area", type: "", name: "surface_area", placeholder: "Общая площадь", required: false, validate: false },
        { id: "estate_name", type: "", name: "estate_name", placeholder: "ЖК", required: false, validate: false },
        { id: "renovation_stage", type: "", name: "renovation_stage", placeholder: "Этап ремонта", required: false, validate: false },
        { id: "room_type", type: "", name: "room_type", placeholder: "Тип помещения", required: false, validate: false },
      ],
    },
    detail_deal_card: {
      status_title: "Статус (этап воронки)",
      save_button: "Сохранить",
      dealCardDetailedColumns: [
        [
          { id: "name_1", name: "client_fullname", placeholder: "Имя фамилия клиента" },
          { id: "phone_1", name: "client_phone", placeholder: "Номер телефона" },
          { id: "email_1", name: "client_email", placeholder: "Почта" },
          { id: "type_1", name: "room_type", placeholder: "Тип помещения" },
        ],
        [
          { id: "square_1", name: "surface_area", placeholder: "Общая площадь" },
          { id: "zhk_1", name: "estate_name", placeholder: "ЖК" },
          { id: "stage_1", name: "renovation_stage", placeholder: "Этап ремонта" },
        ],
      ],
      buttons: {
        title: {
          add_goods: "Дополнительные товары",
          create_project: "Создать проект",
          show_gallery: "Посмотреть галерею",
          open_project: "Открыть файл проекта с ПК",
          create_apartment: "Создать из квартиротеки",
        },
      },
      tabs: {
        history: {
          label: "История",
        },
        projects: {
          label: "Проекты и сметы",
          label_create: "- проект создан",
          button_block: {
            edit: "Редактировать",
            show: "Посмотреть",
            estimate: "Открыть смету",
            panorama: "Открыть панораму",
          },
          history: {
            title: "Проект изменен",
          },
          program: {
            title: "Открыть в программе",
            path: "",
          },
          not_found: "Проектов не найдено",
        },
      },
      comment: {
        label: "Комментарий",
        placeholder: "Введите сообщение",
      },
      history_statuses: {
        label: "Перевод сделки в статус",
      },
      placeholder: {
        newProjectName: "Введите название проекта",
        newProjectRoomType: "Тип помещения",
      },
      add_leads: {
        title: "Переадресация на другой отдел",
        send: "Отправить",
        placehoder: "Введите комментарий",
        select_department: "Выберите отдел",
      },
    },
    board: {
      not_found: "Сделок не найдено",
      show_all: "Посмотреть все",
    },
  },

  organizations: {
    tabs: {
      tabShops: "Магазины",
      tabStaff: "Сотрудники",
      tabKeys: "Ключи",
    },

    shops: {
      title: "Магазины",
      add_shop_btn: "Добавить магазин",
      save: "Сохранить",
      modal_title: "Заполните информацию о магазине",
      departments_not_set: "Отделы не указаны",
      empty_departments: "Отделы отсутсвуют",
      new_department: "Новый отдел",
      search_placeholder: "Введите адрес магазина",
      inputs_create: [
        { id: "name_id", name: "name", placeholder: "Название", title: "Название организации / магазина", enabled: true, options: false },
        { id: "address_id", name: "address", placeholder: "Адрес", title: "Адрес магазина / офиса", enabled: true, options: false },
        { id: "department_id", name: "department", placeholder: "Название отдела", title: "Отдел", enabled: true, options: true },
      ],
      inputs_edit: [
        {
          id: "name_id",
          name: "name",
          placeholder: "Название",
          title: "Название организации / магазина",
          enabled: true,
          options: false,
          hidden: false,
        },
        {
          id: "address_id",
          name: "address",
          placeholder: "Адрес",
          title: "Адрес магазина / офиса",
          enabled: true,
          options: false,
          hidden: false,
        },
        {
          id: "department_id",
          name: "department",
          placeholder: "Название отдела",
          title: "Отдел",
          enabled: true,
          options: true,
          hidden: false,
        },
      ],
    },
    stuff: {
      title: "Сотрудники",
      detail_card: {
        title: "Заполните информацию о сотруднике",
        data_input: [
          { title: "Номер телефон", name: "phone", placeholder: "+7", mask: "+7 (999) 999-99-99" },
          { title: "Логин", name: "login", placeholder: "Логин", mask: "", type: "text" },
          { title: "Email", name: "email", placeholder: "", mask: "E-mail", type: "text" },
          { title: "Имя фамилия", name: "name", placeholder: "Имя фамилия", mask: "", type: "text" },
          { title: "Пароль", name: "password", placeholder: "Пароль", mask: "", type: "password" },
        ],

        shop: {
          title: "Магазин",
          placeholder: "Адрес магазина",
        },
        department: {
          title: "Отдел",
          placeholder: "Название отдела",
        },
        roles: {
          title: "Пользовательские роли",
          placeholder: "Роль",
        },
        footer: {
          save: "Сохранить",
          block: "Заблокировать доступ",
        },
      },
      search_placeholder: "Введите фамилию сотрудника",
      headers: [
        { id: "stuff_name", name: "Имя Фамилия" },
        { id: "stuff_login", name: "Логин" },
        { id: "stuff_phone", name: "Номер телефона" },
        { id: "stuff_shop", name: "Магазин" },
        { id: "stuff_department", name: "Отдел" },
        { id: "stuff_empty", name: "" },
      ],
      footer: {
        add: "Добавить сотрудника",
        excel: "Выгрузить в Excel",
      },
    },
    keys: {
      placeholder: "Введите название рабочего места",
    },
  },

  control: {
    leads: {
      from: "От кого:",
      comment: "Комментарий:",
      button_txt: "Создать сделку",
      not_leads: "Входящих лидов нет",
    },
    controlButtons: [
      {
        title: "Лиды",
        description: "Заявки, отправленные из других отделов",
        name: "leads",
        notificationCount: 0,
        requiredRole: [roleTypes.DEPARTMENT_EMPLOYEE],
      },

      {
        title: "Счета",
        description: "Информация о счетах",
        name: "invoices",
        notificationCount: 0,
        requiredRole: [roleTypes.ORGANIZATION_ADMIN],
      },

      {
        title: "Реестр клиентов",
        description: "",
        name: "register",
        notificationCount: 0,
        requiredRole: [roleTypes.ORGANIZATION_ADMIN],
      },

      {
        title: "Аналитика по товарам",
        description: "",
        name: "analytic_products",
        notificationCount: 0,
        requiredRole: [roleTypes.ORGANIZATION_ADMIN],
      },

      {
        title: "Аналитика по проектам",
        description: "Аналатика по вашим проектам",
        name: "analytic_projects",
        notificationCount: 0,
        requiredRole: [roleTypes.ORGANIZATION_ADMIN, roleTypes.DEPARTMENT_EMPLOYEE],
      },

      {
        title: "Статистика по обучению (тренер)",
        description: "Информация об обучении сотрудников с тренером",
        name: "statistics_coach",
        notificationCount: 0,
        requiredRole: [roleTypes.ORGANIZATION_ADMIN, roleTypes.DEPARTMENT_EMPLOYEE],
      },

      {
        title: "Статистика по обучению (платформа)",
        description: "Информация об обучении сотрудников на платформе",
        name: "statistics_platform",
        notificationCount: 0,
        requiredRole: [roleTypes.ORGANIZATION_ADMIN, roleTypes.DEPARTMENT_EMPLOYEE],
      },

      {
        title: "Аналитика по активным дням",
        description: "Аналитика по активным дням в разрезе по модулям",
        name: "analytic_active_days",
        notificationCount: 0,
        requiredRole: [roleTypes.ORGANIZATION_ADMIN],
      },
    ],
  },

  blanks: {
    title: "Загрузка бланков (титульный лист для отчета)*",
    buttons: {
      add: "Добавить бланк",
      order: "Заказать бланк",
      list: "Реестр бланков",
    },
    add_modal: {
      block_1: {
        index: 1,
        download: "Загрузить файл",
        text: "*Бланк должен быть загружен в графическом формате и не должен превышать размер 1 Mb. Его размер должен быть равен формату А4.",
      },
      block_2: {
        index: 2,
        text: "Задайте период публикации нового бланка (титульного листа) в отчете",
      },
      form_title: "Добавление бланка",
      from: "C",
      to: "По",
      send: "Отправить бланк",
    },
    order_modal: {
      form_title: "Заказ бланка",
      block_upload: {
        index: 1,
        download: "Загрузить логотип",
        text: "Загрузите логотип в кривых (pdf, ai, eps)",
      },
      textareas: [
        {
          index: 2,
          name_textarea: "colors",
          placeholder: "C2C7CE - Hex",
          text: "Напишите Ваши фирменные цвета (rgb, hex, css и т.д.)",
        },
        {
          index: 3,
          name_textarea: "fonts",
          placeholder: "Roboto",
          text: "Напишите пожелания к шрифтам",
        },
        {
          index: 4,
          name_textarea: "contacts",
          placeholder: "Адреса, номера телефонов",
          text: "Контактная информация для бланка",
        },
        {
          index: 5,
          name_textarea: "comments",
          placeholder: "Текст",
          text: "Текст/пожелания",
        },
        {
          index: 6,
          name_textarea: "phone",
          placeholder: "Телефон",
          text: "Телефон/почта для связи с менджером",
        },
      ],
      block_date: {
        index: 7,
        text: "Задайте период публикации нового бланка (титульного листа) в отчете",
      },
      send: "Заказать бланк",
    },
    list_modal: {
      form_title: "Реестр бланков",
      header_titles: ["Превью бланка", "Период публикации", "Продано проектов за этот период", "Статус"],
    },
    warning: {
      title: "Если вы закроете окно, все введенные данные будет стёрты.",
      subtitle: "Закрыть форму?",
      close: "Закрыть",
      cancel: "Отмена",
    },
    requiredRole: [roleTypes.ORGANIZATION_ADMIN],
  },

  header: {
    title: "Presale релиз от 26/09/2023",
    menu: [
      { id: "main_menu", title: "Главное окно", path: "/", requiredRole: [roleTypes.ORGANIZATION_ADMIN, roleTypes.DEPARTMENT_EMPLOYEE] },
      { id: "deals", title: "Сделки", path: "/deals", requiredRole: [roleTypes.ORGANIZATION_ADMIN, roleTypes.DEPARTMENT_EMPLOYEE] },
      { id: "stuff_and_shops", title: "Сотрудники и магазины", path: "/organization", requiredRole: [roleTypes.ORGANIZATION_ADMIN] },
    ],
  },

  reset_password: {
    title: "Для восстановления пароля введите свой номер телефона",
    placeholder: {
      phone: "+7 (999) 999-99-99",
      sms_code: "Код из СМС",
    },
    mask: "+7 (999) 999-99-99",
    get_code: "Запросить код",
    hint: "Вы можете запросить пароль по смс не чаще 1 раза в сутки",
    button_back_title: "Назад ко входу",
    button_back_path: "/signin",
  },

  login: {
    title: "Пожалуйста, авторизуйтесь в программе",
    tabs: [
      { title: "По email", value: "email" },
      { title: "По номеру телефона", value: "phone" },
    ],
    form: {
      phone: {
        mask: "+7 (999) 999-99-99",
        placeholder: "+7 (999) 999-99-99",
      },
      email: {
        placeholder: "E-mail",
      },
      password: {
        placeholder: "Пароль",
      },
    },
    footer: {
      button_title: "ВХОД",
      reset_password: {
        title: "Забыли пароль?",
        path: "/reset-password",
      },
    },
  },

  loader: {
    title: "Loading",
  },

  pagination: {
    break_label: "...",
  },

  alert_messages: {
    login: {
      error: "Неверный логин или пароль",
    },
    profile: {
      success_profile: "Данные пользователя успешно изменены",
      error_profile: "Что-то пошло не так...",
    },
    deals: {
      create: {
        success_deal: "Сделка успешно создана",
        error_deal: "Ошибка при создании сделки",
      },
      edit: { success_deal: "Сделка успешно отредактирована", error_deal: "Ошибка при редактировании сделки" },
    },
    shops: {
      create: {
        success_shop: "Магазин успешно создан",
        error_shop: "Ошибка при создании магазина",
      },
      edit: {
        success_shop: "Магазин успешно изменен",
        error_shop: "Ошибка при изменении магазина",
      },
    },
    leads: {
      success_lead: "Лид успешно создан",
      error_lead: "Ошибка при создании лида",
    },
    stuffs: {
      create: {
        success_stuff: "Сотрудник успешно создан",
        error_stuff: "Ошибка при создании сотрудника",
      },
      edit: {
        success_stuff: "Данные по сотруднику успешно изменены",
        error_stuff: "Ошибка при изменении данных сотрудника",
      },
    },
    projects: {
      hint: {
        hint_title: "Если вы закроете окно, проект не будет создан.",
        hint_subtitle: "Продолжить создание проекта?",
      },
      close: "Закрыть",
      continue: "Продолжить",
    },
    add_blank: {
      success_blank: "Бланк успешно создан",
      error_blank: "Ошибка при создании бланка",
    },
  },

  date_picker: {
    hint: "*Введите корректный диапазон дат",
  },

  panorama: {
    link: "Назад",
    path: "/",
  },

  statuses_settings: {
    title: "Настройка статусов",
    hint: "*Статус можно убрать из воронки продаж только если там нет проектов",
    requiredRole: [roleTypes.ORGANIZATION_ADMIN],
  },

  not_found: "Информации не найдено",
};

export default content;
