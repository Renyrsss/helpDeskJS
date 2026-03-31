import React, { useEffect, useMemo, useState } from 'react';

const OLD_API_BASE = import.meta.env.VITE_OLD_API_BASE || 'http://192.168.101.25:1337';
const NEW_API_BASE = import.meta.env.VITE_NEW_API_BASE || 'http://localhost:1337';
const NEW_SERVICE_GROUP_ID = import.meta.env.VITE_NEW_SERVICE_GROUP_ID || '';

const TELEGRAM_TOKEN = '6515245927:AAExFk8USVwQ2IVcwtqszfutM-hqgbfp0Dg';
const TELEGRAM_URI = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

const CATEGORY_GROUPS = [
  {
    title: 'Техподдержка IT',
    items: [
      { id: 'PCR', label: 'Поломка компьютера', legacyEndpoint: '/api/ernar-and-timurs', chatId: -4135994432 },
      {
        id: 'webCabel',
        label: 'Техподдержка IT / Поломка локальной сети',
        legacyEndpoint: '/api/ernar-and-timurs',
        chatId: -4135994432,
      },
      {
        id: 'printer',
        label: 'Проблемы с принтером - МФУ / телевизор / телефон',
        legacyEndpoint: '/api/ernar-and-timurs',
        chatId: -4135994432,
      },
      { id: 'printerCard', label: 'Заправка картриджа', legacyEndpoint: '/api/ernar-and-timurs', chatId: -4135994432 },
      {
        id: 'PO',
        label: 'Техподдержка по Zoom, Excel, Word / Outlook - почта',
        legacyEndpoint: '/api/ernar-and-timurs',
        chatId: -4135994432,
      },
      { id: '1C', label: '1C - техподдержка', legacyEndpoint: '/api/saids', chatId: 203995378 },
      { id: 'Damumed', label: 'Damumed - логин и пароль / восстановление аккаунта', legacyEndpoint: '/api/bahadors', chatId: -4169255350 },
      { id: 'mzrk', label: 'Порталы МЗРК', legacyEndpoint: '/api/bahadors', chatId: -4169255350 },
      { id: 'lis', label: 'ЛИС техподдержка', legacyEndpoint: '/api/bahadors', chatId: -4169255350 },
      { id: 'DOC', label: 'Документолог - техподдержка', legacyEndpoint: '/api/skud-zaprosy-help-desks', chatId: -4196356902 },
      { id: 'simbase-t', label: 'SimBase - сброс пароля', legacyEndpoint: '/api/skud-zaprosy-help-desks', chatId: -4196356902 },
      { id: 'simbase-p', label: 'SimBase - создать аккаунт', legacyEndpoint: '/api/skud-zaprosy-help-desks', chatId: -4196356902 },
      { id: 'simbase-a', label: 'SimBase - техподдержка', legacyEndpoint: '/api/skud-zaprosy-help-desks', chatId: -4196356902 },
      { id: 'skud', label: 'СКУД - выдать карты / потеря карты', legacyEndpoint: '/api/skud-zaprosy-help-desks', chatId: -4196356902 },
      { id: 'skud-p', label: 'СКУД - поломка', legacyEndpoint: '/api/skud-zaprosy-help-desks', chatId: -4196356902 },
      {
        id: 'Domen',
        label: 'Заявка на создание корпоративной доменной учетной записи',
        legacyEndpoint: '/api/rustams',
        chatId: -4796506377,
        isModal: true,
      },
    ],
  },
];

const STATUS_STYLES = {
  'Сделано': 'status success',
  'в работе': 'status warn',
  'Новая заявка': 'status info',
};

const formatDate = (iso) => {
  if (!iso) return '';
  const date = new Date(iso);
  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const normalizeText = (text = '') => text.toLowerCase().trim();
const normalizeKey = (text = '') =>
  text.toLowerCase().replace(/[^a-zа-я0-9]+/giu, ' ').replace(/\s+/g, ' ').trim();

export default function App() {
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [department, setDepartment] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const [searchPhone, setSearchPhone] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const [showDomainModal, setShowDomainModal] = useState(false);
  const [domainForm, setDomainForm] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    latinFIO: '',
    department: '',
    position: '',
    mobile: '',
    workPhone: '',
    birthDate: '',
    startDate: '',
    comment: '',
  });

  const [newCatalog, setNewCatalog] = useState([]);
  const [newCatalogError, setNewCatalogError] = useState('');

  const flatCategories = useMemo(() => CATEGORY_GROUPS.flatMap((group) => group.items), []);

  const selectedCategory = useMemo(
    () => flatCategories.find((item) => item.id === selectedCategoryId),
    [flatCategories, selectedCategoryId]
  );

  useEffect(() => {
    let isActive = true;
    fetch(`${NEW_API_BASE}/api/tickets/public/categories`)
      .then((res) => res.json())
      .then((data) => {
        if (!isActive) return;
        const catalog = Array.isArray(data?.data) ? data.data : [];
        console.log('Новая система каталог загружен:', catalog.length, 'групп', catalog);
        setNewCatalog(catalog);
      })
      .catch((err) => {
        if (!isActive) return;
        console.warn('Не удалось загрузить каталог новой системы:', err.message);
        setNewCatalogError('Не удалось загрузить список категорий из новой системы.');
      });

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (!searchPhone || searchPhone.length < 6) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(() => {
      setLoadingSearch(true);
      fetchLegacyRequests(searchPhone)
        .then((items) => setSearchResults(items))
        .catch(() => setSearchResults([]))
        .finally(() => setLoadingSearch(false));
    }, 400);

    return () => clearTimeout(timer);
  }, [searchPhone]);

  const validateMainForm = () => {
    const nextErrors = {};
    if (!phone.trim()) nextErrors.phone = 'Введите номер телефона';
    if (!fullName.trim()) nextErrors.fullName = 'Введите ФИО';
    if (!department.trim()) nextErrors.department = 'Введите отделение';
    if (!comment.trim()) nextErrors.comment = 'Опишите проблему';
    if (!selectedCategoryId) nextErrors.category = 'Выберите категорию';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const buildNewStrapiPayload = () => {
    if (!selectedCategory) return null;

    const normalized = normalizeKey(selectedCategory.label);
    let categoryMatch = null;
    let serviceGroupId = null;

    newCatalog.forEach((group) => {
      const categories = group?.categories || [];
      categories.forEach((cat) => {
        const name = normalizeKey(cat?.name_ru || cat?.name_kz || '');
        if (!categoryMatch && name && (name == normalized || name.includes(normalized) || normalized.includes(name))) {
          categoryMatch = cat;
          serviceGroupId = group?.id;
        }
      });
    });

    if (!serviceGroupId) {
      const fallback = newCatalog.find((group) =>
        normalizeText(group?.name_ru || '').includes('it') || normalizeText(group?.slug || '').includes('it')
      );
      serviceGroupId = fallback?.id || null;
    }

    if (!serviceGroupId && NEW_SERVICE_GROUP_ID) {
      serviceGroupId = Number.isNaN(Number(NEW_SERVICE_GROUP_ID)) ? NEW_SERVICE_GROUP_ID : Number(NEW_SERVICE_GROUP_ID);
    }

    if (!serviceGroupId && newCatalog.length > 0) {
      serviceGroupId = newCatalog[0]?.id || null;
    }

    if (!serviceGroupId) {
      console.warn('buildNewStrapiPayload: не найден serviceGroupId для категории:', selectedCategory.label, 'normalized:', normalized, 'каталог:', newCatalog);
      return null;
    }

    console.log('buildNewStrapiPayload: совпадение найдено, serviceGroupId:', serviceGroupId, 'categoryMatch:', categoryMatch);

    const payload = {
      requesterName: fullName,
      requesterPhone: phone,
      requesterDepartment: department,
      comment: `${comment}\n\nКатегория: ${selectedCategory.label}`,
      serviceGroupId,
    };

    if (categoryMatch?.id) {
      payload.categoryId = categoryMatch.id;
    }

    return payload;
  };

  const submitToNewStrapi = async () => {
    let payload = buildNewStrapiPayload();
    if (!payload) {
      // Отправляем минимальный payload, чтобы запрос ушел всегда
      payload = {
        requesterName: fullName,
        requesterPhone: phone,
        requesterDepartment: department,
        comment: `${comment}\n\nКатегория: ${selectedCategory?.label || 'не указана'}`,
      };
      console.warn('Новая система: serviceGroupId не найден, отправляем без него.');
    }

    try {
      console.info('[NEW] отправка заявки', payload);
      const res = await fetch(`${NEW_API_BASE}/api/tickets/public/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        console.warn('Новая система ошибка:', text);
      }
    } catch (err) {
      console.warn('Новая система недоступна:', err.message);
    }
  };

  const submitToOldStrapi = async () => {
    if (!selectedCategory?.legacyEndpoint) return;
    const payload = {
      data: {
        userName: fullName,
        userPhone: phone,
        userSide: department,
        userComment: comment,
        userQuery: selectedCategory.label,
      },
    };

    const res = await fetch(`${OLD_API_BASE}${selectedCategory.legacyEndpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Ошибка отправки в старую систему');
    }
  };

  const sendTelegram = async () => {
    if (!selectedCategory?.chatId) return;
    const message =
      `<b>Заявка ${selectedCategory.label}</b>\n` +
      `<b>ФИО:</b> ${fullName}\n` +
      `<b>Отделение:</b> ${department}\n` +
      `<b>Телефон:</b> ${phone}\n` +
      `<b>Комментарий:</b> ${comment}\n` +
      `<b>Запрос:</b> ${selectedCategory.label}`;

    await fetch(TELEGRAM_URI, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: selectedCategory.chatId,
        parse_mode: 'html',
        text: message,
      }),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateMainForm()) return;

    if (selectedCategory?.isModal) {
      setShowDomainModal(true);
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    try {
      await Promise.all([submitToOldStrapi(), submitToNewStrapi(), sendTelegram()]);
      setShowSuccess(true);
      setPhone('');
      setFullName('');
      setDepartment('');
      setComment('');
      setSelectedCategoryId('');
      setTimeout(() => setShowSuccess(false), 3400);
    } catch (error) {
      setErrors({ submit: 'Не удалось отправить заявку. Проверьте соединение.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDomainSubmit = async (event) => {
    event.preventDefault();

    const domainMessage =
      `<b>Заявка на создание корпоративной доменной учетной записи</b>\n` +
      `<b>Фамилия:</b> ${domainForm.lastName}\n` +
      `<b>Имя:</b> ${domainForm.firstName}\n` +
      `<b>Отчество:</b> ${domainForm.middleName}\n` +
      `<b>ФИО латиницей:</b> ${domainForm.latinFIO}\n` +
      `<b>Отдел:</b> ${domainForm.department}\n` +
      `<b>Должность:</b> ${domainForm.position}\n` +
      `<b>Мобильный:</b> ${domainForm.mobile}\n` +
      `<b>Рабочий:</b> ${domainForm.workPhone}\n` +
      `<b>Дата рождения:</b> ${domainForm.birthDate}\n` +
      `<b>Дата выхода на работу:</b> ${domainForm.startDate}\n` +
      `<b>Комментарий:</b> ${domainForm.comment}`;

    try {
      await fetch(TELEGRAM_URI, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: -4796506377,
          parse_mode: 'html',
          text: domainMessage,
        }),
      });

      await fetch(`${OLD_API_BASE}/api/rustams`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: {
            userName: `${domainForm.firstName} ${domainForm.lastName} ${domainForm.middleName}`.trim(),
            userPhone: domainForm.mobile,
            userSide: domainForm.department,
            userComment: domainMessage.replace(/<[^>]*>/g, ''),
          },
        }),
      });

      const newPayload = {
        requesterName: `${domainForm.firstName} ${domainForm.lastName} ${domainForm.middleName}`.trim(),
        requesterPhone: domainForm.mobile,
        requesterDepartment: domainForm.department,
        comment: `Заявка на доменную учетную запись\n\n${domainMessage.replace(/<[^>]*>/g, '')}`,
      };

      const newCatalogPayload = buildNewStrapiPayload();
      if (newCatalogPayload?.serviceGroupId) {
        newPayload.serviceGroupId = newCatalogPayload.serviceGroupId;
        if (newCatalogPayload.categoryId) newPayload.categoryId = newCatalogPayload.categoryId;
      }

      if (newPayload.serviceGroupId) {
        await fetch(`${NEW_API_BASE}/api/tickets/public/submit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newPayload),
        });
      }

      setShowDomainModal(false);
      setDomainForm({
        lastName: '',
        firstName: '',
        middleName: '',
        latinFIO: '',
        department: '',
        position: '',
        mobile: '',
        workPhone: '',
        birthDate: '',
        startDate: '',
        comment: '',
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3400);
    } catch (error) {
      setErrors({ submit: 'Не удалось отправить доменную заявку.' });
    }
  };

  const handleDomainChange = (field) => (event) => {
    let value = event.target.value;
    if (field == 'latinFIO') {
      value = value.replace(/[^a-zA-Z\s]/g, '');
    }
    setDomainForm((prev) => ({ ...prev, [field]: value }));
  };

  const [accordionOpen, setAccordionOpen] = useState(true);

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__img">
            <img src="/logo.png" alt="NNMC" />
          </div>
          <div className="header__title">
            <p>
              Добро пожаловать на сайт HelpDesk нашей медицинской клиники! Вы можете оставить заявку, наши
              сотрудники обработают ее в кратчайшие сроки. Благодарим за Терпение .
            </p>
          </div>
          <div className="header__actions">
            <a className="btn__submitStyle" href="http://192.168.101.25:8081/">
              Перейти на Хелп Деск для мед оборудования
            </a>
            <a className="btn__submitStyle" href="http://192.168.101.25:8082/">
              Перейти на Хелп Деск для хозяйственной службы
            </a>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="container">
          <section className="main__first">
            <div className="main__search">
              <input
                className="main__searchInput"
                type="tel"
                placeholder="Введите ваш номер телеофна"
                value={searchPhone}
                onChange={(event) => setSearchPhone(event.target.value)}
              />
            </div>
            <div className="search__results">
              {loadingSearch && <p className="muted">Поиск...</p>}
              {searchResults.length === 0 && !loadingSearch ? (
                <p className="muted"></p>
              ) : (
                searchResults.map((item, index) => (
                  <article className="ticket" key={`${item.userPhone}-${index}`}>
                    <div>
                      <p className="ticket__name">{item.userName}</p>
                      <p className="ticket__meta">{item.userQuery}</p>
                      <p className="ticket__comment">{item.userComment}</p>
                    </div>
                    <div className="ticket__side">
                      <span className={STATUS_STYLES[item.Progress] || 'status'}>{item.Progress}</span>
                      <span className="ticket__date">{formatDate(item.createdAt)}</span>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        </div>

        <section className="columns">
          <div className="container">
            <div className="columns__row">
              <div className="columns__column">
                <form className="main__first checkedOrNot" onSubmit={handleSubmit}>
                  <p className="main__firstQuestion">выберите категорию / Санатты таңданыз</p>
                  <div className="accordion">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className={`accordion-button${accordionOpen ? '' : ' collapsed'}`}
                          type="button"
                          onClick={() => setAccordionOpen(!accordionOpen)}
                        >
                          техподдержка IT
                        </button>
                      </h2>
                      {accordionOpen && (
                        <div className="accordion-body">
                          {CATEGORY_GROUPS[0].items.map((item) => {
                            const showDivider =
                              (item.id === '1C') ||
                              (item.id === 'DOC') ||
                              (item.id === 'simbase-t');
                            return (
                              <React.Fragment key={item.id}>
                                {showDivider && <hr />}
                                <p className="inputMar">
                                  <input
                                    type="radio"
                                    name="report"
                                    value={item.label}
                                    id={item.id}
                                    className="radioInput"
                                    checked={selectedCategoryId === item.id}
                                    onChange={() => {
                                      if (item.isModal) {
                                        setSelectedCategoryId(item.id);
                                        setShowDomainModal(true);
                                      } else {
                                        setSelectedCategoryId(item.id);
                                      }
                                    }}
                                  />
                                  <label htmlFor={item.id}>{item.label}</label>
                                </p>
                              </React.Fragment>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                  {errors.category && <span className="field-error">{errors.category}</span>}
                </form>
              </div>

              <div className="columns__column">
                <div className="main__first">
                  <input
                    className="main__inputs"
                    type="number"
                    placeholder="Введите номер : 777 777 77 77"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                  {errors.phone && <span className="field-error">{errors.phone}</span>}
                </div>

                <div className="main__first">
                  <input
                    className="main__inputs"
                    type="text"
                    placeholder="Аты-Жөні / ФИО"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                  />
                  {errors.fullName && <span className="field-error">{errors.fullName}</span>}
                </div>

                <div className="main__first">
                  <input
                    className="main__inputs"
                    type="text"
                    placeholder="Бөлімше / Отделение"
                    value={department}
                    onChange={(event) => setDepartment(event.target.value)}
                  />
                  {errors.department && <span className="field-error">{errors.department}</span>}
                </div>

                <div className="main__first">
                  <p className="main__firstQuestion">
                    Шағымның (оқиғаның) мазмұны<br />
                    Описание проблемы (инцидента)
                  </p>
                  <textarea
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    placeholder=""
                  />
                  {errors.comment && <span className="field-error">{errors.comment}</span>}
                </div>

                {errors.submit && <div className="field-error field-error--block">{errors.submit}</div>}

                <div className="btn">
                  <button className="btn__submit" type="button" disabled={isSubmitting} onClick={handleSubmit}>
                    {isSubmitting ? 'Отправка...' : 'Отправить'}
                  </button>
                </div>
                <p className="hint">Заявка отправляется одновременно в старую и новую систему.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {showSuccess && (
        <div className="success">
          <div className="success__img">
            <img src="/doctor.png" alt="Спасибо" />
          </div>
        </div>
      )}

      {showDomainModal && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modal-content">
            <h2>Заполните заявку</h2>
            <form id="domenForm" onSubmit={handleDomainSubmit}>
              <input value={domainForm.lastName} onChange={handleDomainChange('lastName')} placeholder="Фамилия" required />
              <input value={domainForm.firstName} onChange={handleDomainChange('firstName')} placeholder="Имя" required />
              <input value={domainForm.middleName} onChange={handleDomainChange('middleName')} placeholder="Отчество" required />
              <input value={domainForm.latinFIO} onChange={handleDomainChange('latinFIO')} placeholder="ФИО на латинице - по удостоверению личности на английском" required />
              <input value={domainForm.department} onChange={handleDomainChange('department')} placeholder="Отдел" required />
              <input value={domainForm.position} onChange={handleDomainChange('position')} placeholder="Должность" required />
              <input type="tel" value={domainForm.mobile} onChange={handleDomainChange('mobile')} placeholder="Мобильный телефон +7 XXX XXX XX XX" required />
              <input type="tel" value={domainForm.workPhone} onChange={handleDomainChange('workPhone')} placeholder="Рабочий номер" />
              <p>Дата рождения</p>
              <input type="date" value={domainForm.birthDate} onChange={handleDomainChange('birthDate')} required />
              <p>Дата выхода на работу</p>
              <input type="date" value={domainForm.startDate} onChange={handleDomainChange('startDate')} required />
              <textarea
                value={domainForm.comment}
                onChange={handleDomainChange('comment')}
                placeholder="Комментарии к заявке"
                required
              />
              <button type="submit" className="btn__submit">Отправить</button>
              <button type="button" className="btn__submitStyle" onClick={() => setShowDomainModal(false)}>
                Закрыть
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

async function fetchLegacyRequests(phone) {
  const endpoints = [
    '/api/saids',
    '/api/bahadors',
    '/api/ernar-and-timurs',
    '/api/kuats',
    '/api/skud-zaprosy-help-desks',
  ];

  const query = `?pagination[pageSize]=1000&sort=createdAt:desc&filters[$and][0][userPhone][$containsi]=${encodeURIComponent(phone)}`;

  const responses = await Promise.all(
    endpoints.map((endpoint) =>
      fetch(`${OLD_API_BASE}${endpoint}${query}`)
        .then((res) => (res.ok ? res.json() : null))
        .catch(() => null)
    )
  );

  const items = [];
  responses.forEach((data) => {
    if (!data?.data) return;
    data.data.forEach((entry) => {
      items.push(entry.attributes || entry);
    });
  });

  return items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}
